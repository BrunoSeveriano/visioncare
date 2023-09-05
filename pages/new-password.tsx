import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsChatSquareDots } from "react-icons/bs";
import { MdOutlineLock } from "react-icons/md";
import Card from "@/components/card/Card";
import { toast } from "react-toastify";
import useLogin from "@/hooks/useLogin";
import useOnboardModalPartiner from "@/hooks/useOnboardModalPartiner";

const NewPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const auth = useLogin();

  const [userPassword, setUserPassword] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    programCode: "073",
  });

  const handlePassword = async () => {
    try {
      setLoading(true);
      if (userPassword.newPassword !== userPassword.confirmPassword) {
        throw new Error("Senhas não compatíveis");
      }
      toast.success("Troca de senha realizada");
      router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error("Troca de senha falhou");
    }
  };

  const changeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPassword((prevState) => ({ ...prevState, [name]: value }));
  };

  const [errors, setErrors] = useState({
    newPasswordError: "",
    confirmPasswordError: "",
  });

  const validatePassword = () => {
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Senhas não compatíveis",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "",
      }));
    }
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
        <div className="flex flex-col justify-start text-careLightBlue text-5xl mb-5">
          <span>Crie uma nova senha</span>
        </div>
        <div className="my-5 z-40 flex flex-col ">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Insira o código que enviamos para o seu
          </span>
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            e-mail e redefina a sua senha:
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-7 md:mb-0">
          <Input
            name="email"
            className="fill-careDarkBlue h-12 md:h-16"
            startIcon
            imageSrc="/icon-sap.png"
            fullWidth
            placeholder="Código enviado no e-mail"
            type="email"
            autoComplete="off"
          />

          <Input
            className="fill-careDarkBlue h-12 md:h-16"
            startIcon
            imageSrc="/house-lock.png"
            fullWidth
            placeholder="Nova senha"
            endIcon
            type="password"
            autoComplete="off"
            name="newPassword"
            value={userPassword.newPassword}
            onChange={changeUserData}
            onBlur={validatePassword}
          />
          {errors.newPasswordError && (
            <span className="text-red-500">{errors.newPasswordError}</span>
          )}

          <Input
            className="fill-careDarkBlue h-12 md:h-16"
            startIcon
            imageSrc="/house-lock.png"
            fullWidth
            placeholder="Confirmar senha"
            endIcon
            type="password"
            autoComplete="off"
            name="confirmPassword"
            value={userPassword.confirmPassword}
            onChange={changeUserData}
            onBlur={validatePassword}
          />
          {errors.confirmPasswordError && (
            <span className="text-red-500">{errors.confirmPasswordError}</span>
          )}
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5"
            label="ENVIAR"
            onClick={handlePassword}
            isLoading={loading}
            disabled={loading}
          />
          <Button
            customClass="bg-careBlue border-careBlue py-2 xl:py-5"
            label="VOLTAR"
            onClick={() => router.push("/")}
          />
        </div>
      </Card>
    </div>
  );
};

export default NewPassword;
