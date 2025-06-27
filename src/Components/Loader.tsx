const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 rounded-lg flex items-center justify-center bg-neutral-900/80 backdrop-blur">
      <div className="w-7 h-7 border-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
