interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

export const ErrorMessage = ({ className = '', message, onRetry }: ErrorMessageProps) => (
  <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
    <p className='text-center text-gray-600'>{message}</p>
    <button
      className='bg-mint-500 hover:bg-mint-600 rounded-lg px-6 py-2 text-white transition-colors'
      onClick={onRetry}
    >
      다시 시도
    </button>
  </div>
);
