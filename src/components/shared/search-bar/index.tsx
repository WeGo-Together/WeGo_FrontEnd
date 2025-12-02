import { Input } from '@/components/ui';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export const SearchBar = ({ className, placeholder, ...props }: SearchBarProps) => {
  return (
    <div className={`flex w-full flex-col gap-2 ${className ?? ''}`}>
      <Input
        id='password'
        className='focus:border-mint-500 rounded-3xl border border-transparent bg-gray-100 focus:outline-none'
        placeholder={placeholder}
        type='search'
        onIconClick={() => {
          console.log('Search icon clicked');
        }}
        {...props}
      />
    </div>
  );
};
