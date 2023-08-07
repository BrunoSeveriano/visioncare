import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { BsChatSquareDots } from "react-icons/bs";
import { MdOutlineLock } from "react-icons/md";
import Card from "@/components/card/Card";
import { toast } from "react-toastify";

const NewPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      router.push("/login");
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
    <div className="h-screen bg-careLightBlue">
      <div className="xl:block md:hidden">
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[23%] xl:bottom-[41%] bg-[#FFB81C]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[15%] xl:bottom-[33%] bg-[#A51890]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[7%]  xl:bottom-[25%] bg-[#FF6A39]"></div>
      </div>
      <div className="block md:hidden">
        <Image
          width={337}
          height={212}
          alt="background-mobile"
          src="/bg-confirmation.png"
          className="z-40 absolute top-[23px] left-8"
          quality={100}
        />
      </div>
      <div className="hidden xl:block 2xl:hidden">
        <Image
          width={630}
          height={520}
          className="absolute top-1/4 left-20"
          alt="background-tablet"
          src="/bg-confirmation.png"
          quality={100}
        />
      </div>
      <div className="hidden 2xl:block">
        <Image
          width={844}
          height={529}
          className="absolute top-1/4 left-48"
          alt="background"
          src="/bg-confirmation.png"
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
            iconStart={BsChatSquareDots}
            fullWidth
            placeholder="Código enviado no e-mail"
            type="email"
            autoComplete="off"
          />

          <Input
            className="fill-careDarkBlue h-12 md:h-16"
            startIcon
            iconStart={MdOutlineLock}
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
            iconStart={MdOutlineLock}
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
