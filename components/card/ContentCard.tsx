import React from "react";
import Button from "../button/Button";
import Image from "next/image";

interface ContentCardProps {
  isCustomBg?: boolean;
  bgColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonBorderColor?: string;
  title: string;
  subtitle?: string;
  textemail?: string;
  textphone?: string;
  buttonText: string;
  svgIcon: string;
  hasIcon?: boolean;
  hideButton?: boolean;
  onButtonClick?: () => void;
}

const ContentCard = ({
  isCustomBg,
  bgColor,
  textColor,
  buttonColor,
  buttonBorderColor,
  title,
  subtitle,
  textemail,
  textphone,
  buttonText,
  hasIcon,
  svgIcon,
  hideButton,
  onButtonClick,
}: ContentCardProps) => {
  const sendEmail = () => {
    window.open(
      "mailto:programamyacuvue@suporteaopaciente.com.br?subject=Subject&body=Body%20goes%20here"
    );
  };

  const calling = () => {
    window.open("tel:0800 400 5001");
  };

  return (
    <div
      className={`w-full rounded-xl lg:h-52 2xl:h-60 ${
        isCustomBg
          ? "bg-[url('/')] bg-contain bg-no-repeat bg-careDarkBlue scale-x-[-1]"
          : `${bgColor}`
      } `}
    >
      <div className={`${isCustomBg && "scale-x-[-1]"} flex flex-col h-full`}>
        <div className="text-white md:w-full ml-3 2xl:ml-5 mt-5 md:mt-8 xl:mt-4 text-3xl flex flex-col">
          <span>{title}</span>
          <span className="text-sm mt-2 ml-1 opacity-95">{subtitle}</span>
          <span
            onClick={sendEmail}
            className="text-sm font-bold ml-1 opacity-95 cursor-pointer hover:text-careLightBlue"
          >
            {textemail}
          </span>
          <span
            onClick={calling}
            className="text-2xl md:text-3xl lg:text-3xl xl:text-xl xl:mt-0 2xl:mt-3 2xl:text-3xl font-bold ml-1 opacity-95 hover:text-careLightBlue cursor-pointer"
          >
            {textphone}
          </span>
        </div>
        <div
          className={`ml-3 2xl:ml-5 my-5 flex ${
            hideButton ? "justify-end" : "justify-between"
          } items-end h-full`}
        >
          {!hideButton && (
            <Button
              customClass={`px-14 py-2 ${
                buttonColor || "bg-careLightBlue"
              } border-1 ${
                buttonBorderColor || "border-careLightBlue"
              } font-bold`}
              label={buttonText}
              customColor={textColor}
              onClick={onButtonClick}
            />
          )}
          {hasIcon && (
            <Image
              src={svgIcon}
              width={58}
              height={38}
              alt="card-svg"
              className="object-contain mr-8 md:w-auto lg:w-10 xl:w-14 2xl:w-auto ml-5"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
