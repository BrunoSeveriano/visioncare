import Button from "@/components/button/Button";
import Card from "@/components/card/Card";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handCreateAccount = () => {
    setLoading(true);
    router.push("/signup");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="h-screen bg-careLightBlue">
      <div className="hidden xl:block">
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[40%] bg-[#FFB81C]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[30%] bg-[#A51890]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[20%] bg-[#FF6A39]"></div>
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
          width={400}
          height={1000}
          alt="background-mobile"
          src="/bg-login-orange-mobile.png"
          className="z-40 absolute top-[100px]"
          quality={100}
        />
      </div>
      <div className="hidden xl:block">
        <Image
          fill
          alt="background"
          src="/bg-login-desktop.png"
          className="object-top object-cover"
          quality={100}
        />
      </div>
      <Card>
        <div className="flex justify-center items-center lg:mb-10">
          <Image
            quality={100}
            width={500}
            height={500}
            src="/acuvue-login.png"
            alt="acuvue-login"
          />
        </div>
        <div className="xl:mb-10 mb-7 mt-14 lg:mt-6 z-40">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Acesse sua conta ou cadastre-se!
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-carePurple border-carePurple py-2 xl:py-5"
            label="Login"
            onClick={handleLogin}
          />
          <Button
            customClass="bg-careBlue border-careBlue py-2 xl:py-5"
            label="Criar nova conta"
            onClick={handCreateAccount}
            isLoading={loading}
            disabled={loading}
          />
        </div>
      </Card>
    </main>
  );
}
