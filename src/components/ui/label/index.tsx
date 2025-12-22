import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = ({ children, className, required, ...props }: LabelProps) => {
  return (
    // label의 required는 부르는 곳에서 제어
    <label {...props} className={cn('text-text-sm-medium flex items-center px-2', className)}>
      <span className='text-gray-700'>{children}</span>
      {required && (
        <span aria-hidden='true' className='text-error-500'>
          *
        </span>
      )}
    </label>
  );
};
