import React, { HTMLAttributes } from "react";
import Select, { SelectProps } from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";
import useClientConfiguration from "@/hooks/useClientConfiguration";
import { IconType } from "react-icons";

interface ISelectProps {
  placeholder?: string;
  name?: string;
  label?: string;
  customClass?: string;
  disabled?: boolean;
  required?: boolean;
  style?: HTMLAttributes<HTMLInputElement>;
  options?: any[];
  iconStart?: IconType;
  fullWidth?: boolean;
  value?: any;
  startIcon?: boolean;
  iconClass?: string;
  iconColor?: string;
}

export type Props<T> = SelectProps<T> & ISelectProps;

const CustomSelect = <T extends unknown>({
  className,
  label,
  iconStart: Icon,
  iconClass,
  iconColor,
  placeholder,
  customClass,
  disabled,
  required,
  style,
  options,
  value,
  fullWidth,
  startIcon,
  ...props
}: Props<T>) => {
  const { colors } = useClientConfiguration();

  return (
    <div>
      <InputLabel>
        <div className="text-md font-bold mb-2 uppercase">{label}</div>
      </InputLabel>
      <Select
        startAdornment={
          startIcon
            ? Icon && (
                <Icon
                  size="2em"
                  className={`${iconClass} ml-1 mr-3`}
                  fill={iconColor}
                />
              )
            : undefined
        }
        displayEmpty
        placeholder={placeholder ? placeholder : "escreva aqui..."}
        disabled={disabled}
        required={required}
        style={style}
        fullWidth={fullWidth}
        sx={{
          "& fieldset": { border: "none" },
          backgroundColor: "#f6f6f6",
          input: {
            "&::placeholder": { color: "#7d8a9f", opacity: 1 },
          },
        }}
        className={`${customClass} disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-200 rounded-lg md:py-1`}
        variant="outlined"
        value={value || ""}
        defaultValue={"" as T}
        {...props}
      >
        <MenuItem value="" disabled>
          {placeholder ? placeholder : "Selecione..."}
        </MenuItem>

        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
