import { AnyFieldApi } from '@tanstack/react-form';

import { Label } from '@/components/ui';

interface Props {
  field: AnyFieldApi;
}

export const GroupPolicyField = ({ field }: Props) => {
  return (
    <div className='mt-6 space-y-4'>
      <Label htmlFor='create-group-policy'>참여 방식</Label>
      {POLICY_OPTIONS.map(({ type, name, description }) => {
        return (
          <div key={name} className='flex items-start gap-2'>
            <input
              id={name}
              className='size-6'
              checked={field.state.value === type}
              name='create-group-policy'
              type='radio'
              value={type}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <Label htmlFor={name}>
              <p>{name}</p>
              <p className='text-gray-500'>{description}</p>
            </Label>
          </div>
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
