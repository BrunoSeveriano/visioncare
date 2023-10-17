import Button from "@/components/button/Button";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/input/Input";
import Card from "@/components/card/Card";
import { getAdmData, getClientData, userLogin } from "@/services/login";
import { toast } from "react-toastify";
import useLogin from "@/hooks/useLogin";
import api from "@/services/api";
import { listPartiner } from "@/services/partiner";
import { useEffect } from "react";

const Login = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useLogin();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    healthProgramCode: "073",
  });

  useEffect(() => {
    if (auth.isLogged) {
      router.push("/dashboard/home");
    }
  }, [auth.isLogged, router]);

  const getPartinerData = async (cnpj: string) => {
    listPartiner(cnpj)
      .then((res) => {
        auth.setUserData(res[0]);
      })
      .catch((err) => {});
  };

  const handleGetAdmData = async () => {
    getAdmData()
      .then((res) => {
        auth.setDataAdmin(res);
      })
      .catch((err) => {});
  };

  const handleGetUserData = () => {
    getClientData()
      .then((res) => {
        auth.setDataPatient(res.data);
      })
      .catch((err) => {});
  };

  const handleLogin = async () => {
    setLoading(true);

    userLogin(userData)
      .then((res) => {
        auth.setName(res.name);
        auth.setToken(res.token);
        auth.setRole(res.role);
        auth.setFirstLogin(res.firstLogin);
        api.defaults.headers.Authorization = `Bearer ${res.token}`;
        toast.success("Login realizado com sucesso");
        auth.onLogin();
        getPartinerData(res.cnpj);
        handleGetAdmData();
        handleGetUserData();
        return router.push("/dashboard/home");
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          "O e-mail ou senha inserido não foi encontrado. Verifique se as informações estão corretas ou cadastre-se agora para ter acesso às recomendações personalizadas de lentes de contato ACUVUE."
        );
      });
  };

  const changeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
    checkFormValidity();
  };

  const checkFormValidity = () => {
    const { email, password } = userData;
    const isValidEmail = !!email && email.includes("@") && email.includes(".");
    setEmailValid(!!email);
    setPasswordValid(!!password && isValidEmail);
  };

  if (auth.isLogged) return null;

  return (
    <div className="h-screen bg-careDarkBlue">
      <div className="hidden xl:block">
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[40%] bg-[#007cc4]"></div>
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[30%] bg-[#007cc4]"></div>
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[20%] bg-[#007cc4]"></div>
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
      <div className="hidden xl:block">
        <Image
          fill
          alt="background"
          src="/acuvue-new-background.png"
          className="object-left-bottom object-cover"
          quality={100}
        />
      </div>
      <Card>
        <div className="flex justify-center items-center">
          <Image
            quality={100}
            width={400}
            height={300}
            src="/LoginProgramaMyACUVUE.png"
            alt="acuvue-login"
            className="w-[300px] xl:w-[300px] 2xl:w-[500px]"
          />
        </div>
        <div className="my-5 z-30 ">
          <span className="flex justify-center text-careBlue text-sm opacity-70 xl:text-base 2xl:text-xl">
            Acesse com seu e-mail e senha abaixo:
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-4 md:mb-0">
          <Input
            className="fill-careBlue h-12 md:h-16 xl:h-14 2xl:h-16"
            startIcon
            imageSrc="/communication-mail.png"
            fullWidth
            placeholder="E-mail"
            type="email"
            autoComplete="off"
            onChange={changeUserData}
            name="email"
            maxLength={100}
            disabled={loading}
          />
          <Input
            className="fill-careBlue h-12 md:h-16 xl:h-14 2xl:h-16"
            startIcon
            endIcon
            imageSrc="/house-lock.png"
            fullWidth
            placeholder="Senha"
            type="password"
            autoComplete="off"
            onChange={changeUserData}
            name="password"
            disabled={loading}
          />
        </div>
        <div className="flex mt-3 justify-end text-sm md:text-base cursor-pointer hover:opacity-60 text-careLightBlue underline">
          <span onClick={() => router.push("/forgot-password")}>
            Esqueci minha senha
          </span>
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-3 2xl:py-5"
            label="ACESSAR"
            onClick={handleLogin}
            isLoading={loading}
            disabled={loading || !(emailValid && passwordValid)}
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

export default Login;
