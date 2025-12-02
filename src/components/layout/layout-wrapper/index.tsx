interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: Props) => {
  return <div className='mx-auto h-[200vh] min-h-screen max-w-[440px] bg-blue-200'>{children}</div>;
};
