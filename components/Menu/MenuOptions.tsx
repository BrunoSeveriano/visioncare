import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";

interface MenuOptionsProps {
  icon?: IconType | undefined | null;
  image?: any;
  path?: string | any;
  text: string;
  route: string;
  spanClassname?: string;
  iconClassname?: string;
  logout?: boolean;
  closeMenu?: () => void;
  onClick?: () => void;
  onNameChange?: (text: string) => void;
}

const MenuOptions = ({
  icon: Icon,
  text,
  route,
  spanClassname,
  iconClassname,
  logout,
  onNameChange,
  image,
  path,
  closeMenu,
}: MenuOptionsProps) => {
  const router = useRouter();
  const auth = useLogin();

  const handleClick = () => {
    if (onNameChange) {
      onNameChange(text);
    }
  };

  const isExternalLink = (link: string) => {
    return link.startsWith("http://") || link.startsWith("https://");
  };

  const handleLinkClick = () => {
    if (isExternalLink(route)) {
      window.open(route, "_blank");
    } else {
      router.push(route);
    }
  };

  return (
    <div
      onClick={() => {
        handleClick();
        logout && auth.onLogout();
        closeMenu && closeMenu();
        handleLinkClick();
      }}
      className={`cursor-pointer flex w-full gap-3 items-center px-4       
      ${spanClassname} hover:opacity-50 transition-all`}
    >
      {Icon && (
        <Icon
          onClick={() => {
            handleClick();
            logout && auth.onLogout();
            closeMenu && closeMenu();
            handleLinkClick();
          }}
          className={iconClassname}
          size="1.5em"
        />
      )}
      {image && <Image alt="icon" width={26} height={26} src={path || ""} />}
      <span
        onClick={() => {
          handleClick();
          logout && auth.onLogout();
          closeMenu && closeMenu();
          handleLinkClick();
        }}
        className="xl:text-lg lg:text-sm"
      >
        {text}
      </span>
    </div>
  );
};

export default MenuOptions;
