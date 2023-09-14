import React from "react";
import Button from "../button/Button";
import Image from "next/image";
import { useRouter } from "next/router";

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
  cardLink?: string; // Nova propriedade para o link do card
}

const ContentCardPacient = ({
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
  cardLink,
}: ContentCardProps) => {
  const router = useRouter();

  const isHttpLink = (link: string) => {
    return link.startsWith("http://") || link.startsWith("https://");
  };

  const handleButtonClick = () => {
    if (cardLink && isHttpLink(cardLink)) {
      window.open(cardLink, "_blank");
    } else if (cardLink) {
      router.push(cardLink);
    }
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
        <div className="text-white md:w-full ml-3 2xl:ml-5 mt-5 md:mt-8 xl:mt-5 text-3xl flex flex-col">
          <span>{title}</span>
          <span className="text-sm mt-5 ml-1 opacity-95">{subtitle}</span>
          <span className="text-sm font-bold ml-1 opacity-95">{textemail}</span>
          <span className="absolute mt-40 md:mt-36 text-3xl font-bold ml-1 opacity-95">
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
                buttonColor || "bg-careDarkBlue"
              } border-1 ${
                buttonBorderColor || "border-careDarkBlue"
              } font-bold`}
              label={buttonText}
              customColor={textColor}
              onClick={handleButtonClick}
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

export default ContentCardPacient;
