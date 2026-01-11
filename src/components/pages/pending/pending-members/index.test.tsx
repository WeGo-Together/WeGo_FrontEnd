import { useRouter } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { API } from '@/api';
import { GetJoinRequestsResponse, GroupUserV2Status } from '@/types/service/group';

import { GroupPendingMembers } from './index';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/toast/core', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/api', () => ({
  API: {
    groupService: {
      getJoinRequests: jest.fn(),
      approveJoinRequest: jest.fn(),
      rejectJoinRequest: jest.fn(),
    },
  },
}));

jest.mock('./pending-member-card', () => ({
  PendingMemberCard: jest.fn(({ onApprove, onReject }) => (
    <div data-testid='pending-member-card'>
      <button data-testid='approve-button' onClick={onApprove}>
        승인
      </button>
      <button data-testid='reject-button' onClick={onReject}>
        거절
      </button>
    </div>
  )),
}));

jest.mock('./pending-members-loading', () => ({
  PendingMembersSkeleton: jest.fn(() => <div data-testid='skeleton' />),
}));

jest.mock('@/components/layout/empty-state', () => ({
  EmptyState: jest.fn(() => <div data-testid='empty-state' />),
}));

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/toast/core';

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;
const mockUseQueryClient = useQueryClient as jest.MockedFunction<typeof useQueryClient>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

interface MutationConfig {
  mutationFn: (targetUserId: string) => Promise<unknown>;
  onSuccess?: () => Promise<void>;
}

describe('GroupPendingMembers', () => {
  const mockGroupId = '1';
  const mockRouter = {
    replace: jest.fn(),
  };
  const mockQueryClient = {
    invalidateQueries: jest.fn().mockResolvedValue(undefined),
  };
  const mockRun = jest.fn();

  const mockMembers: GetJoinRequestsResponse = {
    groupId: 1,
    groupTitle: '동탄에서 놀 사람 모이세요',
    thumbnail100x100Url: null,
    status: 'PENDING' as GroupUserV2Status,
    count: 1,
    items: [
      {
        userId: 1,
        groupUserId: 1,
        nickName: '1등',
        profileImage: null,
        status: 'PENDING' as GroupUserV2Status,
        joinedAt: '2026-01-23T00:00:00',
        joinRequestMessage: '안녕하세요 이소망입니다',
      },
    ],
    serverTime: '2026-01-23T00:00:00',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue(mockRouter as unknown as ReturnType<typeof useRouter>);
    mockUseQueryClient.mockReturnValue(
      mockQueryClient as unknown as ReturnType<typeof useQueryClient>,
    );
    mockUseToast.mockReturnValue({ run: mockRun } as ReturnType<typeof useToast>);

    mockUseQuery.mockReturnValue({
      data: mockMembers,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useQuery>);

    mockUseMutation.mockReturnValue({
      mutate: jest.fn(),
    } as unknown as ReturnType<typeof useMutation>);
  });

  test('컴포넌트가 정상적으로 렌더링된다', () => {
    render(<GroupPendingMembers groupId={mockGroupId} />);

    expect(screen.getByTestId('pending-member-card')).toBeInTheDocument();
  });

  test('queryFn이 올바른 API를 호출한다', () => {
    render(<GroupPendingMembers groupId={mockGroupId} />);

    const queryOptions = mockUseQuery.mock.calls[0][0] as unknown as {
      queryFn: () => Promise<GetJoinRequestsResponse>;
    };
    const queryFn = queryOptions.queryFn;
    queryFn();

    expect(API.groupService.getJoinRequests).toHaveBeenCalledWith(
      { groupId: mockGroupId },
      'PENDING',
    );
  });

  test('approveMutation이 올바른 API를 호출한다', async () => {
    const mutationConfigs: MutationConfig[] = [];

    mockUseMutation.mockImplementation((config: unknown) => {
      mutationConfigs.push(config as MutationConfig);
      return {
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useMutation>;
    });

    render(<GroupPendingMembers groupId={mockGroupId} />);

    const approveMutation = mutationConfigs.find((config) =>
      config.mutationFn.toString().includes('approveJoinRequest'),
    );

    expect(approveMutation).toBeDefined();
    if (approveMutation) {
      const mutationFn = approveMutation.mutationFn;
      await mutationFn('1');

      expect(API.groupService.approveJoinRequest).toHaveBeenCalledWith({
        groupId: mockGroupId,
        targetUserId: '1',
      });

      if (approveMutation.onSuccess) {
        await approveMutation.onSuccess();
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalled();
        expect(mockRun).toHaveBeenCalled();
      }
    }
  });

  test('rejectMutation이 올바른 API를 호출한다', async () => {
    const mutationConfigs: MutationConfig[] = [];

    mockUseMutation.mockImplementation((config: unknown) => {
      mutationConfigs.push(config as MutationConfig);
      return {
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useMutation>;
    });

    render(<GroupPendingMembers groupId={mockGroupId} />);

    const rejectMutation = mutationConfigs.find((config) =>
      config.mutationFn.toString().includes('rejectJoinRequest'),
    );

    expect(rejectMutation).toBeDefined();
    if (rejectMutation) {
      const mutationFn = rejectMutation.mutationFn;
      await mutationFn('1');

      expect(API.groupService.rejectJoinRequest).toHaveBeenCalledWith({
        groupId: mockGroupId,
        targetUserId: '1',
      });

      if (rejectMutation.onSuccess) {
        await rejectMutation.onSuccess();
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalled();
        expect(mockRun).toHaveBeenCalled();
      }
    }
  });

  test('isForbidden이 true일 때 router.replace가 호출된다', () => {
    const error403 = { status: 403 };
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: error403,
    } as unknown as ReturnType<typeof useQuery>);

    render(<GroupPendingMembers groupId={mockGroupId} />);

    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });

  test('로딩 중일 때 Skeleton을 표시한다', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as unknown as ReturnType<typeof useQuery>);

    render(<GroupPendingMembers groupId={mockGroupId} />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('에러가 발생하면 에러 메시지를 표시한다', () => {
    const error500 = { status: 500 };
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: error500,
    } as unknown as ReturnType<typeof useQuery>);

    render(<GroupPendingMembers groupId={mockGroupId} />);

    expect(screen.getByText('데이터를 불러오는데 실패했습니다.')).toBeInTheDocument();
  });

  test('데이터가 없거나 빈 배열일 때 EmptyState를 표시한다', () => {
    const emptyData: GetJoinRequestsResponse = {
      groupId: 1,
      groupTitle: '미니랑 구정에 산책하실 분',
      thumbnail100x100Url: null,
      status: 'PENDING' as GroupUserV2Status,
      count: 0,
      items: [],
      serverTime: '2026-01-23T00:00:00',
    };

    mockUseQuery.mockReturnValue({
      data: emptyData,
      isLoading: false,
      error: null,
    } as unknown as ReturnType<typeof useQuery>);

    render(<GroupPendingMembers groupId={mockGroupId} />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  test('handleApprove가 approveMutation.mutate를 호출한다', () => {
    const mockMutate = jest.fn();
    let approveMutationInstance: { mutate: jest.Mock } | null = null;

    mockUseMutation.mockImplementation((config: unknown) => {
      const mutationConfig = config as MutationConfig;
      if (mutationConfig.mutationFn.toString().includes('approveJoinRequest')) {
        approveMutationInstance = { mutate: mockMutate };
        return approveMutationInstance as unknown as ReturnType<typeof useMutation>;
      }
      return {
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useMutation>;
    });

    render(<GroupPendingMembers groupId={mockGroupId} />);

    const approveButton = screen.getByTestId('approve-button');
    approveButton.click();

    expect(mockMutate).toHaveBeenCalledWith('1');
  });

  test('handleReject가 rejectMutation.mutate를 호출한다', () => {
    const mockMutate = jest.fn();
    let rejectMutationInstance: { mutate: jest.Mock } | null = null;

    mockUseMutation.mockImplementation((config: unknown) => {
      const mutationConfig = config as MutationConfig;
      if (mutationConfig.mutationFn.toString().includes('rejectJoinRequest')) {
        rejectMutationInstance = { mutate: mockMutate };
        return rejectMutationInstance as unknown as ReturnType<typeof useMutation>;
      }
      return {
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useMutation>;
    });

    render(<GroupPendingMembers groupId={mockGroupId} />);

    const rejectButton = screen.getByTestId('reject-button');
    rejectButton.click();

    expect(mockMutate).toHaveBeenCalledWith('1');
  });
});
