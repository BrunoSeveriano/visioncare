import React from "react";
import ContentCard from "../card/ContentCard";
import Image from "next/image";
import Button from "../button/Button";
import { useRouter } from "next/router";
import OpenGuide from "./OpenGuide";

const UsersGuide = () => {
  const route = useRouter();

  const [openGuide, setOpenGuide] = React.useState(false);

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  return (
    <div className="fade-in">
      <div className="mb-3">
        <ContentCard
          svgIcon="/partner.png"
          title="Guia do usuário​"
          subtitle="Tudo que você precisa saber sobre suas lentes"
          buttonText="Ver mais"
          textColor="text-careLightBlue"
          bgColor="bg-careLightBlue"
          hasIcon
          hideButton
        />
      </div>
      {openGuide ? (
        <OpenGuide />
      ) : (
        <>
          <div className="flex flex-col md:flex md:flex-row gap-3 md:border-b-2 md:pb-16 pb-10 md:border-careLightBlue">
            <div className="flex flex-col">
              <video
                className="rounded-xl mb-3"
                width="340"
                height="340"
                controls
              >
                <source src="/teste-video-dois.mp4" type="video/mp4" />
              </video>
              <span className="text-2xl text-careLightBlue">
                Colocando e retirando
              </span>
              <span className="text-2xl text-careLightBlue">
                suas lentes de contato
              </span>
              <span className="text-sm text-careDarkBlue">
                assista para aprender
              </span>
            </div>
            <div className="flex flex-col">
              <video
                className="rounded-xl mb-3"
                width="340"
                height="340"
                controls
              >
                <source src="/teste-video-dois.mp4" type="video/mp4" />
              </video>
              <span className="text-2xl text-careLightBlue">
                Troca e descarte correto
              </span>
              <span className="text-2xl text-careLightBlue">
                das lentes de contato
              </span>
              <span className="text-sm text-careDarkBlue">
                assista o video e entenda como
              </span>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2  md:w-32">
                  <video
                    className="rounded-xl mb-3"
                    width="100%"
                    height="300"
                    controls
                  >
                    <source src="/video-teste.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col gap-2   md:w-32">
                  <video
                    className="rounded-xl mb-3"
                    width="100%"
                    height="300"
                    controls
                  >
                    <source src="/video-teste.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col gap-2 md:w-32">
                  <video
                    className="rounded-xl mb-3"
                    width="100%"
                    height="300"
                    controls
                  >
                    <source src="/video-teste.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <span className="text-2xl text-careLightBlue">
                Quem conhece, não abre
              </span>
              <span className="text-2xl text-careLightBlue">
                mão de suas lentes!
              </span>
              <span className="text-sm text-careDarkBlue">
                Rafa, Vini e Paty contas suas
              </span>
              <span className="text-sm text-careDarkBlue">
                experiências de adaptação
              </span>
            </div>
          </div>
          <div className="md:flex md:flex-row gap-3 flex flex-col md:mt-10 mb-10">
            <div className="bg-careGrey p-10 rounded-xl flex flex-col items-start">
              <div className="flex flex-col pb-5 border-b border-careLightBlue">
                <span className="text-2xl pr-28 text-careDarkBlue">
                  Tudo oque você precisa
                </span>
                <span className="text-2xl text-careDarkBlue">
                  saber sobre suas lentes
                </span>
              </div>
              <div className="flex gap-3 mt-5">
                <Image
                  src="/wash-hands.png"
                  className="md:w-20 md:h-20"
                  alt="wash hands"
                  width={60}
                  height={50}
                  quality={100}
                />
                <Image
                  src="/inside-out.png"
                  className="md:w-20 md:h-20"
                  alt="inside out"
                  width={60}
                  height={50}
                  quality={100}
                />
                <Image
                  src="/eye-opening-lens.png"
                  className="md:w-20 md:h-20"
                  alt="inside out"
                  width={60}
                  height={50}
                  quality={100}
                />
                <Image
                  src="/eye-opening-lens2.png"
                  className="md:w-20 md:h-20"
                  alt="inside out"
                  width={60}
                  height={50}
                  quality={100}
                />
              </div>
              <div className="mt-5">
                <span className="text-careBlue">
                  1.
                  <span className="text-careLightBlue">
                    Como inserir,retirar,higienizar e
                  </span>
                </span>
              </div>
              <span className="md:ml-4 ml-3 text-careLightBlue">
                armazenar suas lentes de contato
              </span>
              <div className="mt-3">
                <span className="text-careBlue">
                  2.{" "}
                  <span className="text-careLightBlue">
                    Como cuidar do estojo para lentes
                  </span>
                </span>
              </div>
              <div className="mt-3">
                <span className="text-careBlue">
                  3.{" "}
                  <span className="text-careLightBlue">
                    O que fazer e o que não fazer
                  </span>
                </span>
              </div>
              <Button
                onClick={handleOpenGuide}
                customClass="mt-7 bg-careLightBlue border-careLightBlue py-2 w-full"
                label="CLIQUE AQUI E ABRA O GUIA"
              />
            </div>

            <div className="ml-3">
              <div className="flex flex-col pb-5 border-b border-careGrey">
                <span className=" text-2xl pr-28 text-careLightBlue">
                  Ainda está com dúvidas?
                </span>
              </div>
              <div>
                <Button
                  onClick={() => route.push("/dashboard/talk-to-specialist")}
                  customClass="mt-5 bg-careDarkBlue border-careDarkBlue py-2 w-full"
                  label="FALAR COM ESPECIALISTA"
                />
                <Button
                  onClick={() => route.push("https://www.acuvue.com.br/")}
                  customClass="mt-2 bg-careDarkBlue border-careDarkBlue py-2 w-full"
                  label="ACESSE NOSSO SITE"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersGuide;
