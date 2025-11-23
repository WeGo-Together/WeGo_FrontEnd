const HomePage = async () => {
  const res = await fetch('https://invalid-url-that-does-not-exist-12345.com/api');
  const data = await res.json();

  return <div>{data.content}첫번째 PR</div>;
};

export default HomePage;
