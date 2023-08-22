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
    <main className="h-screen bg-careDarkBlue">
      <div className="hidden xl:block">
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[40%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[30%] bg-[#007cc4]"></div>
        <div className="fixed z-40 w-60 h-[7%] right-0 bottom-[20%] bg-[#007cc4]"></div>
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
          width={400}
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
        <div className="flex justify-center items-center lg:mb-10">
          <Image
            className="w-[150px] h-[170px] xl:w-[200px] xl:h-[220px]"
            quality={100}
            width={200}
            height={220}
            src="/logo.png"
            alt="acuvue-login"
          />
        </div>
        <div className="mt-5 flex flex-col items-center">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Sua experiência personalizada com
          </span>
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            as lentes de contato ACUVUE
          </span>
        </div>
        <div className="flex justify-center xl:mb-10 mb-7 mt-12 lg:mt-6 z-40">
          <span className="text-careBlue text-sm opacity-70 xl:text-lg 2xl:text-xl">
            Acesse sua conta ou cadastre-se!
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 xl:gap-4 justify-end">
          <Button
            customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5"
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
