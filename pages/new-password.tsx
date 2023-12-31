import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/card/Card";
import { toast } from "react-toastify";
import useLogin from "@/hooks/useLogin";
import { newPassword, resetPassword } from "@/services/login";

const NewPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const auth = useLogin();

  const [userPassword, setUserPassword] = useState(() => {
    if (auth.role === "Partner ECP VisionCare") {
      return {
        email: auth.name,
        password: "",
        Token: "",
        ProgramCode: "073",
        Name: "#REGISTERACCOUNTTOKEN",
      };
    }
    if (auth.role === "Partner POS VisionCare") {
      return {
        email: auth.name,
        password: "",
        Token: "",
        ProgramCode: "073",
        Name: "#REGISTERACCOUNTTOKEN",
      };
    }
    return {
      email: auth.loginNewPassword,
      password: "",
      Token: "",
      ProgramCode: "073",
      Name: "#ForgotPasswordToken",
    };
  });

  const handlePassword = async () => {
    newPassword(userPassword as any)
      .then((res) => {
        toast.success("Senha alterada com sucesso!");
        auth.onLogout();
        router.push("/");
      })
      .catch((err) => {
        toast.error("Erro ao alterar senha!");
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPassword((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="h-screen bg-careDarkBlue">
      <div className="xl:block md:hidden">
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[23%] xl:bottom-[41%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[15%] xl:bottom-[33%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[7%]  xl:bottom-[25%] bg-[#007cc4]"></div>
      </div>
      <Image
        src="/LogoMyAcuvue.png"
        className="z-40 block absolute top-5 left-10"
        alt="acuvue letter"
        width={220}
        height={50}
      />
      <div className="block md:hidden">
        <Image
          width={1000}
          height={1000}
          alt="background-mobile"
          src="/bg-login-mobile.png"
          className="absolute"
          quality={100}
        />
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Image
          fill
          alt="background"
          src="/acuvue-new-background.png"
          className="object-left-bottom object-cover"
          quality={100}
        />
      </div>
      <div className="hidden 2xl:block">
        <Image
          fill
          alt="background"
          src="/acuvue-new-background.png"
          className="object-left-bottom object-cover"
          quality={100}
        />
      </div>
      <Card>
        <div className="flex flex-col justify-start text-careLightBlue text-4xl 2xl:text-5xl xl:text-3xl mb-5">
          <span>Crie uma nova senha</span>
        </div>
        <div className="xl:my-1 2xl:my-5 z-40 flex flex-col ">
          <span className="text-careBlue text-base opacity-70 xl:text-sm 2xl:text-xl">
            Insira o código que enviamos para o seu
          </span>
          <span className="text-careBlue text-base opacity-70 xl:text-sm 2xl:text-xl">
            e-mail e redefina a sua senha:
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-2 md:mb-0">
          <Input
            name="Token"
            onChange={handleChange}
            className="fill-careDarkBlue h-12 md:h-16 xl:h-14 2xl:h-16"
            startIcon
            imageSrc="/icon-sap.png"
            fullWidth
            placeholder="Código enviado no e-mail"
            type="email"
            autoComplete="off"
          />

          <Input
            className="fill-careDarkBlue h-12 md:h-16 xl:h-14 2xl:h-16"
            startIcon
            imageSrc="/house-lock.png"
            fullWidth
            placeholder="Nova senha"
            endIcon
            type="password"
            autoComplete="off"
            name="password"
            onChange={handleChange}
          />

          <Input
            className="fill-careDarkBlue h-12 md:h-16 xl:h-14 2xl:h-16"
            startIcon
            imageSrc="/house-lock.png"
            fullWidth
            placeholder="Confirmar senha"
            endIcon
            type="password"
            autoComplete="off"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-3 2xl:py-5"
            label="ENVIAR"
            onClick={handlePassword}
            isLoading={loading}
            disabled={
              loading ||
              userPassword.password === "" ||
              userPassword.Token === ""
            }
          />
          <Button
            customClass="bg-careBlue border-careBlue py-2 xl:py-3 2xl:py-5"
            label="VOLTAR"
            onClick={() => router.push("/")}
          />
        </div>
      </Card>
    </div>
  );
};

export default NewPassword;
