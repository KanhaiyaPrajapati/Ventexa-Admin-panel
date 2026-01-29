import React from "react";

export const Loader: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="relative mx-auto my-8 h-[150px] w-[150px] overflow-hidden">
        <div
          className="absolute inset-0 m-auto h-6 w-6 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
          style={{ animation: "spin 1s linear infinite" }}
        />
      </div>
    </>
  );
};
