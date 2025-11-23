import Image from 'next/image';

const HomePage = () => {
  return (
    <div>
      <Image width={500} alt='test' height={500} src='/non-existent-image.png' />
      첫번째 PR
    </div>
  );
};

export default HomePage;
