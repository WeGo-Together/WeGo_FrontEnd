import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';

import { API } from '@/api';
import { ModalProvider } from '@/components/ui';
import { server } from '@/mock/server';
import { createMockSuccessResponse } from '@/mock/service/common/common-mock';
import { mockUserItems } from '@/mock/service/user/user-mock';
import { User } from '@/types/service/user';

import { ProfileEditModal } from '.';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithProviders = async (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  let renderResult;

  await act(async () => {
    renderResult = render(
      <QueryClientProvider client={testQueryClient}>
        <ModalProvider>{component}</ModalProvider>
      </QueryClientProvider>,
    );
  });

  return renderResult;
};

describe('ProfileEditModal 테스트', () => {
  const mockUser = mockUserItems[0];

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('렌더링 테스트', () => {
    test('프로필 수정 모달이 정상적으로 렌더링 된다.', async () => {
      await renderWithProviders(<ProfileEditModal user={mockUser} />);

      expect(screen.getByRole('heading', { level: 2, name: '프로필 수정' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '수정하기' })).toBeInTheDocument();
    });

    test('초기값이 user 데이터로 설정된다.', async () => {
      await renderWithProviders(<ProfileEditModal user={mockUser} />);

      expect(screen.getByDisplayValue(mockUser.nickName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.profileMessage)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.mbti)).toBeInTheDocument();
    });
  });

  describe('필드 입력 테스트', () => {
    test('닉네임 입력이 정상적으로 동작한다.', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<ProfileEditModal user={mockUser} />);

      const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
      await user.clear(nickNameInput);
      await user.type(nickNameInput, '새로운 닉네임');

      expect(nickNameInput).toHaveValue('새로운 닉네임');
    });

    test('프로필 메시지 입력이 정상적으로 동작한다.', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<ProfileEditModal user={mockUser} />);

      const profileMessageInput = screen.getByDisplayValue(mockUser.profileMessage);
      await user.clear(profileMessageInput);
      await user.type(profileMessageInput, '새로운 소개글');

      expect(profileMessageInput).toHaveValue('새로운 소개글');
    });

    test('MBTI 메시지 입력이 정상적으로 동작한다.', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<ProfileEditModal user={mockUser} />);

      const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
      await user.clear(mbtiInput);
      await user.type(mbtiInput, 'ISTJ');

      expect(mbtiInput).toHaveValue('ISTJ');
    });
  });

  describe('유효성 검사 테스트', () => {
    describe('닉네임 유효성 검사 테스트', () => {
      test('닉네임이 2글자 미만이면 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, 'a');

        await waitFor(() => {
          expect(screen.getByText('닉네임은 2글자 이상이어야 합니다.')).toBeInTheDocument();
        });
      });

      test('닉네임이 20글자를 초과하면 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, 'a'.repeat(21));

        await waitFor(() => {
          expect(screen.getByText('닉네임은 20글자 이하여야 합니다.')).toBeInTheDocument();
        });
      });
    });

    describe('프로필 메시지 유효성 검사 테스트', () => {
      test('프로필 메시지가 20글자를 초과하면 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const messageInput = screen.getByDisplayValue(mockUser.profileMessage);
        await user.clear(messageInput);
        await user.type(messageInput, 'a'.repeat(21));

        await waitFor(() => {
          expect(screen.getByText('소개글은 20글자까지 작성 가능합니다.')).toBeInTheDocument();
        });
      });
    });

    describe('MBTI 유효성 검사 테스트', () => {
      test('유효하지 않은 MBTI 입력 시 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'ab');

        await waitFor(() => {
          expect(screen.getByText('유효한 MBTI가 아닙니다.')).toBeInTheDocument();
        });
      });

      test('대/소문자 관계없이 MBTI 입력이 가능하다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'IstJ');

        await waitFor(() => {
          expect(screen.queryByText('유효한 MBTI가 아닙니다.')).not.toBeInTheDocument();
        });
      });

      test('유효한 MBTI를 입력 중이라면 Blur 되기 전까지 에러 메시지가 나타나지 않는다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'is');

        await waitFor(() => {
          expect(screen.queryByText('유효한 MBTI가 아닙니다.')).not.toBeInTheDocument();
        });
      });

      test('MBTI가 4글자가 아닌 상태에서 blur 시 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'is');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText('유효한 MBTI가 아닙니다.')).toBeInTheDocument();
        });
      });

      test('유효한 MBTI를 입력 후 blur 시 에러 메시지가 표시되지 않는다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'istj');
        await user.tab();

        await waitFor(() => {
          expect(screen.queryByText('유효한 MBTI가 아닙니다.')).not.toBeInTheDocument();
        });
      });
    });

    describe('제출 버튼 상태 테스트', () => {
      test('유효성 검사 성공 시 제출 버튼이 활성화 된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, '새로운 닉네임');

        const messageInput = screen.getByDisplayValue(mockUser.profileMessage);
        await user.clear(messageInput);
        await user.type(messageInput, '새로운 소개글');

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'ISTJ');

        await waitFor(() => {
          const submitButton = screen.getByText('수정하기');
          expect(submitButton).not.toBeDisabled();
        });
      });
      test('유효성 검사 실패 시 제출 버튼이 비활성화 된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, 'a');

        await waitFor(() => {
          const submitButton = screen.getByText('수정하기');
          expect(submitButton).toBeDisabled();
        });
      });
    });
  });

  describe('폼 제출 테스트', () => {
    describe('닉네임 중복 검사 테스트', () => {
      test('닉네임 수정 시 닉네임 중복 검사가 실행된다.', async () => {
        const user = userEvent.setup();

        const getNicknameAvailabilitySpy = jest.spyOn(API.userService, 'getNicknameAvailability');

        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, '새로운 닉네임');

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        await waitFor(() => {
          expect(getNicknameAvailabilitySpy).toHaveBeenCalledWith({ nickName: '새로운 닉네임' });
        });

        getNicknameAvailabilitySpy.mockRestore();
      });

      test('중복된 닉네임일 경우 에러 메시지가 표시된다.', async () => {
        const user = userEvent.setup();
        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, '페르난도 토레스');

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        await waitFor(() => {
          expect(screen.getByText('이미 사용중인 닉네임 입니다.')).toBeInTheDocument();
        });
      });

      test('닉네임이 변경되지 않으면 중복 검사를 하지 않는다.', async () => {
        const user = userEvent.setup();
        const getNicknameAvailabilitySpy = jest.spyOn(API.userService, 'getNicknameAvailability');

        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const prevNickName = mockUser.nickName;
        const nickNameInput = screen.getByDisplayValue(prevNickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, prevNickName);

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        await waitFor(() => {
          expect(getNicknameAvailabilitySpy).not.toHaveBeenCalledWith({
            nickName: prevNickName,
          });
        });

        getNicknameAvailabilitySpy.mockRestore();
      });
    });

    describe('MBTI 제출 테스트', () => {
      test('MBTI가 대문자로 변환되어 전송된다.', async () => {
        const user = userEvent.setup();

        const updateMyInfoSpy = jest.spyOn(API.userService, 'updateMyInfo');

        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'enfp');

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        await waitFor(() => {
          expect(updateMyInfoSpy).toHaveBeenCalledWith({ mbti: 'ENFP' });
        });

        updateMyInfoSpy.mockRestore();
      });
    });

    describe('API 호출 테스트', () => {
      test('이미지가 변경되지 않으면 updateMyImage API가 호출되지 않는다.', async () => {
        const user = userEvent.setup();

        const updateMyImageSpy = jest.spyOn(API.userService, 'updateMyImage');

        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const nickNameInput = screen.getByDisplayValue(mockUser.nickName);
        await user.clear(nickNameInput);
        await user.type(nickNameInput, '새로운 닉네임');

        const messageInput = screen.getByDisplayValue(mockUser.profileMessage);
        await user.clear(messageInput);
        await user.type(messageInput, '새로운 소개글');

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'ISTJ');

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        await waitFor(() => {
          expect(updateMyImageSpy).not.toHaveBeenCalled();
        });

        updateMyImageSpy.mockRestore();
      });
    });

    describe('제출 버튼 상태 테스트', () => {
      test('제출 중일 때 버튼이 "수정 중..."으로 변경되며 비활성화 된다', async () => {
        server.use(
          http.patch(`*/users/profile`, async ({ request }) => {
            await delay(200);
            const body = (await request.json()) as User;
            return HttpResponse.json(
              createMockSuccessResponse({
                ...mockUserItems[0],
                ...body,
              }),
            );
          }),
        );

        const user = userEvent.setup();

        await renderWithProviders(<ProfileEditModal user={mockUser} />);

        const mbtiInput = screen.getByDisplayValue(mockUser.mbti);
        await user.clear(mbtiInput);
        await user.type(mbtiInput, 'enfp');

        const submitButton = screen.getByText('수정하기');
        await user.click(submitButton);

        expect(await screen.findByRole('button', { name: '수정 중...' })).toBeDisabled();
      });
    });
  });
});
