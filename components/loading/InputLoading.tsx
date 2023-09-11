import React from "react";
import ContentLoader from "react-content-loader";

interface InputLoginProps {
  size?: string;
}

const InputLoading = ({ size }: InputLoginProps) => {
  return (
    <div className="flex flex-col mt-5  ">
      <ContentLoader
        speed={2}
        width="auto"
        height={60}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className="mt-4"
      >
        <rect x="0" y="0" rx="12" ry="0" width={size || "500"} height="400" />
      </ContentLoader>
    </div>
  );
};

export default InputLoading;
