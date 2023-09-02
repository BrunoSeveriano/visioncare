import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineMail } from "react-icons/md";
import Card from "@/components/card/Card";
import { resetPassword } from "@/services/login";
import { ToastContainer, toast } from "react-toastify";
import { BsChatSquareDots } from "react-icons/bs";

const Confirmation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [forgetPassword, setForgetPassword] = useState({
    userEmail: "",
    templateName: "#ForgotPasswordToken",
    programCode: "073",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForgetPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetUserPassword = () => {
    setLoading(true);
    resetPassword(forgetPassword)
      .then(() => {
        toast.success("Email enviado com sucesso!");
        router.push("/new-password");
      })
      .catch((err) => {
        toast.error("Erro ao enviar email!");
        setLoading(false);
      });
  };

  return (
    <div className="h-screen bg-careDarkBlue">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="xl:block md:hidden">
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[23%] xl:bottom-[41%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[15%] xl:bottom-[33%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[6%] right-0 bottom-[7%] xl:bottom-[25%] bg-[#007cc4]"></div>
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
        <div className="flex flex-col justify-start text-careLightBlue text-4xl mb-5">
          <span>Esqueceu sua senha?</span>
        </div>
        <div className="my-5 z-40 flex flex-col ">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Por favor, insira o endereço de e-mail
          </span>
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            associado à sua conta abaixo:
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-7 md:mb-0">
          <Input
            name="userEmail"
            className="fill-careBlue h-12 md:h-16"
            startIcon
            imageSrc="/icon-sap.png"
            fullWidth
            placeholder="Seu e-mail"
            type="email"
            autoComplete="off"
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5"
            label="Enviar"
            onClick={resetUserPassword}
            isLoading={loading}
            disabled={loading}
          />
          <Button
            customClass="bg-careBlue border-careBlue py-2 xl:py-5"
            label="VOLTAR"
            onClick={() => router.back()}
          />
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;
