interface HintProps extends React.InputHTMLAttributes<HTMLInputElement> {
  message?: string;
}

export const Hint = ({ className, message }: HintProps) => {
  return (
    <p className={`text-error-500 text-text-sm-medium w-full px-2 ${className ?? ''}`}>{message}</p>
  );
};
