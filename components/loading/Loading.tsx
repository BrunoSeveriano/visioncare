import React from "react";
interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={`w-full flex justify-center items-center mt-5 ${className}`}
    >
      {" "}
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>{" "}
    </div>
  );
};
export default Loading;
