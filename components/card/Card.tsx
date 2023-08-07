import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="h-full flex flex-col justify-end md:justify-center md:items-end w-screen">
      <div className="z-50 p-8 2xl:p-10 mb-9 lg:mb-3 bg-white rounded-3xl mx-auto w-11/12 md:w-6/12 lg:w-4/12 2xl:w-[30%] 2xl:mr-28 xl:mr-24 md:mx-auto">
        <div className="flex w-full h-full flex-col fade-in">{children}</div>
      </div>
    </div>
  );
};

export default Card;
