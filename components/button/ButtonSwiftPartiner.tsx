import useDataStorage from "@/hooks/useDataStorage";
import { IconType } from "react-icons";
import { toast } from "react-toastify";
import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";
import React, { useState } from "react";
import { isConfirmed } from "@/services/partiner";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  customClass?: string;
  customColor?: string;
  isLoading?: boolean;
  disableHover?: boolean;
  params?: any;
}

const ButtonSwiftPartiner = ({ onClick, params }: ButtonProps) => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    left: 10,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#9AA2AC" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataScheduling = useDataStorage();

  const handleConfirmClick = () => {
    setIsLoading(true);
    const idVisit = {
      purchaseId: params.row.id,
    };
    isConfirmed(idVisit)
      .then((response) => {
        dataScheduling.setRefresh(!dataScheduling.refresh);
        toast.success("Confirmado com sucesso");
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {params?.row?.isConfirmed === true ? (
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} />}
          label=""
          checked={params?.row?.isConfirmed}
          onClick={() => {
            onClick && onClick();
            handleConfirmClick();
          }}
        />
      ) : (
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} />}
          label=""
          checked={params?.row?.isConfirmed}
          onClick={() => {
            onClick && onClick();
            handleConfirmClick();
          }}
        />
      )}
    </>
  );
};

export default ButtonSwiftPartiner;
