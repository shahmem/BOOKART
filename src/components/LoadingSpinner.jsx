import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[75vh] overflow-hidden bg-amber-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-4 border-transparent border-t-blue-800 border-b-blue-800 grid place-content-center">
        <div className='rounded-full h-14 w-14 bg-amber-50'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;