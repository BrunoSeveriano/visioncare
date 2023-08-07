import React from "react";

interface WelcomeCardProps {
  children: React.ReactNode;
}
const WelcomeCard = ({ children }: WelcomeCardProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="z-50 p-4 md:p-6 2xl:p-8 mb-5 lg:mb-3 bg-white rounded-2xl w-11/12 md:w-10/12 lg:w-9/12 2xl:w-8/12 xl:mr-8 md:mr-6">
        <div className="flex flex-col fade-in">{children}</div>
      </div>
    </div>
  );
};

export default WelcomeCard;
