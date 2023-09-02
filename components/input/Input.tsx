import {
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SpecialInputProps {
  customClass?: string;
  endIcon?: boolean;
  startIcon?: boolean;
  iconStart?: IconType | string | undefined | null;
  iconColor?: string;
  iconClass?: string;
  maxLength?: number;
  onEnter?: () => void;
  imageSrc?: string;
}

export type Props = TextFieldProps & SpecialInputProps;

const Input = ({
  maxLength = 200,
  onEnter,
  iconColor,
  iconStart: Icon,
  iconClass,
  autoComplete,
  className,
  defaultValue,
  disabled,
  size,
  error,
  helperText,
  id,
  label,
  type,
  name,
  style,
  placeholder,
  onChange,
  required,
  value,
  endIcon,
  startIcon,
  imageSrc,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div>
      <InputLabel>
        <div className="text-md font-bold mb-2 uppercase">{label}</div>
      </InputLabel>
      <TextField
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        disabled={disabled}
        error={error}
        helperText={helperText}
        id={id}
        name={name}
        required={required}
        size={size}
        type={showPassword ? "text" : type}
        value={value}
        variant="outlined"
        onChange={onChange}
        fullWidth
        onKeyDown={handleKeyPress}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-200 rounded-lg md:py-1`}
        placeholder={placeholder ? placeholder : ""}
        style={style}
        sx={{
          "& fieldset": { border: "none" },
          backgroundColor: "#f6f6f6",
          input: {
            "&::placeholder": { color: "#7d8a9f", opacity: 1 },
          },
        }}
        inputProps={{
          maxLength: maxLength,
        }}
        InputProps={{
          startAdornment: (
            <>
              {startIcon && (
                <InputAdornment position="start">
                  {Icon && (
                    <Icon size="1.5em" className={iconClass} fill={iconColor} />
                  )}
                </InputAdornment>
              )}
              {imageSrc && (
                <InputAdornment position="start">
                  <Image
                    src={imageSrc}
                    width={20}
                    height={20}
                    alt="image icon"
                    className="mr-2 md:w-6 md:h-6"
                  />
                </InputAdornment>
              )}
            </>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">
              {!showPassword ? (
                <FaEye
                  onClick={handleShowPassword}
                  className="cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleShowPassword}
                  className="cursor-pointer"
                />
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </div>
  );
};

export default Input;
