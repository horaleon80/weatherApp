import React from "react";

const Loader = () => {
  return (
    <div className="relative w-32 h-24 mx-auto">
      <div className="absolute bottom-0 left-8 flex space-x-4">
        <div className="w-3 h-6 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-6 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-6 bg-blue-400 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
