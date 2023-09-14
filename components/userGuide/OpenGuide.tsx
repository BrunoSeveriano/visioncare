import React from "react";
import Image from "next/image";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Button from "../button/Button";
import useOpen from "@/hooks/useOpen";

const OpenGuide = () => {
  const openGuides = useOpen();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-3 md:mt-10 mb-5">
        <div className="bg-careGrey p-10 rounded-xl flex flex-col items-start">
          <div className="flex flex-col pb-5 border-b border-careLightBlue">
            <span className="text-2xl  text-careDarkBlue">
              Como <strong>inserir</strong> suas lentes de contato
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-3">
              <Image
                src="/wash-hands.png"
                className="md:w-20 md:h-20"
                alt="wash hands"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Lave e seque suas mãos com uma toalha sem fiapos. Depois, comece
                pelo seu olho direito.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/inside-out.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Certifiquesse que sua lente de contato nao está do lado avesso.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/eye-opening-lens.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Puxe sua pálpebra inferior para baixo e, com a outra mão, segure
                a sua pálpebra superior
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/eye-opening-lens2.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Posicione sua lente de contato no centro do olho, ou na parte
                branca logo abaixo da iris.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/eye-opening-lens3.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Solte lentamente as pálpebras e feche os olhos para que a lente
                se acomode.
              </span>
            </div>
          </div>
        </div>
        <div className="bg-careGrey p-10 rounded-xl flex flex-col items-start">
          <div className="flex flex-col pb-5 border-b border-careLightBlue">
            <span className="text-2xl  text-careDarkBlue">
              Como <strong>retirar</strong> suas lentes de contato
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-3">
              <Image
                src="/wash-hands.png"
                className="md:w-20 md:h-20"
                alt="wash hands"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Lave e seque suas mãos com uma toalha sem fiapos. Depois, comece
                pelo seu olho direito.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/removal-look-up.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Olhe para cima e puxe sua pálpebra inferior para baixo.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/remove-lens-lower.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Puxe sua pálpebra inferior para baixo e, com a outra mão, segure
                a sua pálpebra superior
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/removal-lens-squeeze.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Posicione sua lente de contato no centro do olho, ou na parte
                branca logo abaixo da iris.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/lens-cleaning.png"
                className="md:w-20 md:h-20"
                alt="inside out"
                width={60}
                height={50}
                quality={100}
              />
              <span className="text-xs md:text-base text-careBlue">
                Solte lentamente as pálpebras e feche os olhos para que a lente
                se acomode.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-careGrey p-10 rounded-xl flex flex-col items-start mb-5">
        <div className="flex flex-col pb-5 border-b border-careLightBlue">
          <span className="text-2xl text-careDarkBlue">
            Como higienizar e armazenar <strong>lentes</strong> de conatato{" "}
            <strong>reutilizáveis</strong>
          </span>
        </div>
        <div className="flex flex-col md:flex md:flex-row ">
          <div className="flex gap-7 mt-5 ">
            <div className="flex items-center gap-3">
              <Image
                src="/wash-hands.png"
                className="md:w-36  md:h-36"
                alt="wash hands"
                width={100}
                height={100}
                quality={100}
              />
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/clean-contacts.png"
                className="md:w-36  md:h-36"
                alt="inside out"
                width={100}
                height={100}
                quality={100}
              />
            </div>
          </div>
          <div className="md:flex md:flex-col gap-2 mt-6 md:ml-10">
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4 h-10 flex items-center">
                <span>1</span>
              </div>
              <span className="text-xs md:text-base text-careBlue mb-2">
                Coloque três ou mais gotas de solução para limpeza em um lado da
                lente de contato.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4  h-10 flex items-center">
                <span>2</span>
              </div>
              <span className="text-xs md:text-base text-careBlue  mb-2">
                Esfregue delicadamente do centro para as extremidades. Vire w
                repita o processo.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4  h-10 flex items-center">
                <span>3</span>
              </div>
              <span className="text-xs md:text-base text-careBlue mb-2">
                Limpe cada lado por pelo menos conco segundos.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4  h-10 flex items-center">
                <span>4</span>
              </div>
              <span className="text-xs md:text-base text-careBlue md:w-[30rem]">
                Coloque as lentes limpas dentro do seu projeto e feche
                firmemente. Deixe-as desinfetando por no mínimo 6 horas antes de
                usar novamente.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-careGrey p-10 rounded-xl flex flex-col items-start mb-5">
        <div className="flex flex-col pb-5 border-b border-careLightBlue">
          <span className="text-2xl text-careDarkBlue">
            Como cuidar do <strong>estojo</strong> lentes
          </span>
        </div>
        <div className="flex flex-col md:flex md:flex-row ">
          <div className="flex gap-7 mt-5 ">
            <div className="flex items-center gap-3">
              <Image
                src="/lens-case.png"
                className="md:w-36  md:h-36"
                alt="wash hands"
                width={100}
                height={100}
                quality={100}
              />
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/take-out-begin-same-eye.png"
                className="md:w-36  md:h-36"
                alt="inside out"
                width={100}
                height={100}
                quality={100}
              />
            </div>
          </div>
          <div className="md:flex md:flex-col gap-2 mt-6 md:ml-10">
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4 h-10 flex items-center">
                <span>1</span>
              </div>
              <span className="text-xs md:text-base text-careBlue mb-2">
                Coloque três ou mais gotas de solução para limpeza em um lado da
                lente de contato.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4  h-10 flex items-center">
                <span>2</span>
              </div>
              <span className="text-xs md:text-base text-careBlue  mb-2">
                Esfregue delicadamente do centro para as extremidades. Vire w
                repita o processo.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-careLightBlue rounded-full text-white p-4  h-10 flex items-center">
                <span>3</span>
              </div>
              <span className="text-xs md:text-base text-careBlue mb-2">
                Limpe cada lado por pelo menos conco segundos.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-careLightBlue p-10 rounded-xl flex flex-col items-start mb-5">
        <div className="flex flex-col pb-5 border-b border-white">
          <span className="text-2xl text-white">
            O que <strong>fazer</strong> e o que <strong>não fazer</strong>
          </span>
        </div>
        <div className="flex flex-col md:flex md:flex-row ">
          <div className="md:flex md:flex-col gap-2 mt-6 md:ml-10">
            <div className="flex items-center gap-5">
              <div className="bg-white rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineCheck className="text-green-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white mb-2">
                Coloque suas lentes de contato antes de aplicar qualquer a
                maquiagem no rosto.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineCheck className="text-green-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white  mb-2">
                Sempre lave bem as mães e seque com uma toalha sem fiapos antes
                de manusear suas lentes.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineCheck className="text-green-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white  mb-2">
                Utilize solução especial de limpeza para lentes de contrato para
                higienizar suas lentes e o estojo.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineClose className="text-red-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white  mb-2">
                Não use suas lentes de contato por mais tempo do que o indicado
                pelo seu oftalmologista.
              </span>
            </div>
          </div>
          <div className="md:flex md:flex-col gap-2 md:mt-4 md:ml-10">
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineClose className="text-red-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white  mb-2">
                Não durma enquanto estiver usando as lentes de contado a não ser
                que seja recomendado pelo seu oftamologista.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineClose className="text-red-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white   mb-2">
                Nunca use água da torneira para lavar suas lentes ou limpar seu
                estojo.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-white  rounded-full p-4 h-10 w-10 flex items-center">
                <span style={{ transform: "scale(2.8)" }}>
                  <AiOutlineCheck className="text-green-800" />
                </span>
              </div>
              <span className="text-xs md:text-base text-white  mb-2">
                Consulte seu oftamologista caso note vermelhidão, sensibilidade
                à luz, alteração na visão, sinta dor desconforto.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <Button
          onClick={openGuides.onClose}
          customClass="bg-careLightBlue w-40 h-14 mb-5"
          label="Voltar"
        />
      </div>
    </div>
  );
};

export default OpenGuide;
