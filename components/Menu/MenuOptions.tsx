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
}: MenuOptionsProps) => {
  const router = useRouter();
  const auth = useLogin();

  const handleClick = () => {
    if (onNameChange) {
      onNameChange(text);
    }
  };

  return (
    <div
      className={`cursor-pointer flex w-full gap-3 items-center px-4       
      ${spanClassname} hover:opacity-50 transition-all`}
    >
      {Icon && <Icon className={iconClassname} size="1.5em" />}
      {image && <Image alt="icon" width={26} height={26} src={path || ""} />}
      <span
        onClick={() => {
          handleClick();
          logout && auth.onLogout();
          router.push(route);
        }}
        className="xl:text-lg lg:text-sm"
      >
        {text}
      </span>
    </div>
  );
};

export default MenuOptions;
