import { AnyFieldApi } from '@tanstack/react-form';

import { Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
  isEditMode: boolean;
}

export const GroupPolicyField = ({ field, isEditMode }: Props) => {
  return (
    <div className='mt-6 space-y-4'>
      <Label htmlFor='create-group-joinPolicy'>참여 방식</Label>
      {POLICY_OPTIONS.map(({ type, name, description }) => {
        return (
          <label key={name} className='flex gap-2 px-2 select-none'>
            <span className='flex-center has-focus:border-mint-500 size-6 cursor-pointer rounded-full border-1 border-gray-200 bg-white has-disabled:cursor-auto has-disabled:bg-gray-200'>
              <input
                className='checked:bg-mint-500 size-3 cursor-pointer appearance-none rounded-full outline-none disabled:cursor-auto'
                checked={field.state.value === type}
                disabled={isEditMode}
                name='create-group-policy'
                type='radio'
                value={type}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </span>

            <div className='text-text-sm-medium'>
              <p className='text-gray-700'>{name}</p>
              <p className='text-gray-500'>{description}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
};

const POLICY_OPTIONS = [
  { type: 'FREE', name: '즉시 참여', description: '누구나 바로 모임에 참여할 수 있어요.' },
  {
    type: 'APPROVAL_REQUIRED',
    name: '승인 후 참여',
    description: '방장이 승인한 사람만 참여할 수 있어요.',
  },
];
