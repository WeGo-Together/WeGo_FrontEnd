interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, className, required, ...props }) => {
  return (
    <label className={`text-text-sm-medium flex items-center px-2 ${className ?? ''}`} {...props}>
      <span className='text-gray-700'>{children}</span>
      {required && <span className='text-mint-500'>*</span>}
    </label>
  );
};
