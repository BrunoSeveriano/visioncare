import Button from "@/components/button/Button";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/input/Input";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import Card from "@/components/card/Card";
import { userLogin } from "@/services/login";
import { ToastContainer, toast } from "react-toastify";
import useLogin from "@/hooks/useLogin";
import api from "@/services/api";

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

  const handleLogin = async () => {
    setLoading(true);
    userLogin(userData)
      .then((res) => {
        auth.setName(res.name);
        auth.setToken(res.token);
        auth.setRole(res.role);
        api.defaults.headers.Authorization = `Bearer ${res.token}`;
        toast.success("Login realizado com sucesso");
        localStorage.setItem("email", userData.email);
        auth.onLogin();
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

  return (
    <div className="h-screen bg-careLightBlue">
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        style={{ width: "42%" }}
      />

      <div className="hidden xl:block">
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[40%] bg-[#FFB81C]"></div>
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[30%] bg-[#A51890]"></div>
        <div className="fixed z-20 w-60 h-[7%] right-0 bottom-[20%] bg-[#FF6A39]"></div>
      </div>
      <Image
        src="/acuvue-letter.png"
        className="block md:hidden absolute top-10 left-12"
        alt="acuvue letter"
        width={120}
        height={50}
      />
      <div className="block md:hidden">
        <Image
          width={1000}
          height={1000}
          alt="background-mobile"
          src="/bg-acess-mobile.png"
          className="z-40 absolute top-[100px]"
          quality={100}
        />
      </div>
      <div className="hidden xl:block">
        <Image
          fill
          alt="background"
          src="/bg-acess-orange.png"
          style={{ objectFit: "cover", objectPosition: "100% 0%" }}
          quality={100}
        />
      </div>
      <Card>
        <div className="flex justify-center items-center">
          <Image
            quality={100}
            width={489}
            height={306}
            src="/acueve-login-two.png"
            alt="acuvue-login"
          />
        </div>
        <div className="my-5 z-30 ">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Entre com seu e-mail e senha abaixo:
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-2 justify-end md:my-7 md:mb-0">
          <Input
            className="fill-careOrange h-12 md:h-16"
            startIcon
            iconStart={MdOutlineEmail}
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
            className="fill-careOrange h-12 md:h-16"
            startIcon
            endIcon
            iconStart={MdOutlineLock}
            fullWidth
            placeholder="Senha"
            type="password"
            autoComplete="off"
            onChange={changeUserData}
            name="password"
            disabled={loading}
          />
          <span
            onClick={() => router.push("/forgot-password")}
            className="flex justify-end text-sm md:text-base cursor-pointer hover:opacity-60 text-careLightBlue underline"
          >
            Esqueci minha senha
          </span>
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-carePurple border-carePurple py-2 xl:py-5"
            label="ACESSAR"
            onClick={handleLogin}
            isLoading={loading}
            disabled={loading || !(emailValid && passwordValid)}
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

export default Login;
