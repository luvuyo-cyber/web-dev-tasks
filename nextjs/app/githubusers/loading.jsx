// This component will be displayed automatically by Next.js
// while Server Components in this route segment are loading data.

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button className="btn loading">Loading</button>
    </div>
  );
};

export default LoadingPage;
