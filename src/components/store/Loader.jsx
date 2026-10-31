
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-[0.25em] text-black">
          REHCLUB
        </h1>

        <div className="mt-6 h-1 w-36 overflow-hidden bg-gray-200">
          <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] bg-black" />
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
