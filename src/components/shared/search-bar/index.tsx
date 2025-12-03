import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onIconClick?: () => void;
}

export const SearchBar = ({ className, placeholder, onIconClick, ...props }: SearchBarProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Input
        className='focus:border-mint-500 rounded-3xl border border-transparent bg-gray-100'
        placeholder={placeholder}
        type='search'
        onIconClick={onIconClick}
        {...props}
      />
    </div>
  );
};
