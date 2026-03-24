const NotFound = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-white">
      <div className="flex flex-col justify-center min-h-screen py-8 lg:pt-16 lg:pb-0 text-black">
        <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-24 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
              where are u going man?
            </h1>
            <p className="text-lg sm:text-xl">
              watch out. internet is not a safe place.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
