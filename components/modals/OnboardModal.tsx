import Modal from "./Modal";
import useOnboardModal from "@/hooks/useOnboardModal";
import Button from "../button/Button";
import React, { useEffect, useState } from "react";
import CardQuestions from "../card/CardQuestions";
import useLogin from "@/hooks/useLogin";
import {
  yesQuestionData,
  noQuestionData,
  firstQuestionData,
} from "@/helpers/QuestionData";
import useDataStorage from "@/hooks/useDataStorage";
import Image from "next/image";
import { useRouter } from "next/router";

const OnboardModal = () => {
  const onboardModal = useOnboardModal();
  const [isNext, setIsNext] = useState(false);
  const auth = useLogin();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finalMessage, setFinalMessage] = useState(false);
  const dataStorage = useDataStorage();
  const router = useRouter();

  const [survey, setSurvey] = useState<any[]>([]);
  useEffect(() => {
    dataStorage.setSurveyData(survey);
  }, [survey]);

  useEffect(() => {
    console.log(questionNumber);
  }, [questionNumber]);

  const handleFinalMessage = () => {
    setFinalMessage(true);
  };

  if (!auth.isLogged) return null;
  return (
    <div>
      <Modal
        isOpen={onboardModal.isOpen}
        onClose={onboardModal.onClose}
        isButtonDisabled
        customClass="w-[65rem]"
        isCloseIconVisible={false}
      >
        {finalMessage && (
          <>
            <div
              className={
                "my-5 z-40 flex flex-col pb-2 border-b-[0.1rem] border-[#051F4A] lg:pb-5"
              }
            >
              <div className="flex flex-col justify-center items-center text-careLightBlue text-3xl mb-2 lg:text-5xl ">
                <span>Não sabe por onde começar</span>
              </div>
              <div className="flex flex-col justify-center items-center text-careLightBlue text-3xl lg:text-5xl mb-5 ">
                <span>ou tem alguma dúvida?</span>
              </div>
            </div>
          </>
        )}

        {questionNumber === 4 && !finalMessage && (
          <>
            <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end items-center mb-5 lg:mb-1">
              <div>
                <Image
                  src="/ModalPatient.png"
                  alt="Logo"
                  width={800}
                  height={450}
                />
              </div>
              <div className="md:mt-20 lg:mt-20 mt-10">
                <Button
                  customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5 w-80"
                  label="AVANÇAR"
                  onClick={handleFinalMessage}
                />
              </div>
            </div>
          </>
        )}

        {questionNumber === 3 && answer === "Não" && !finalMessage && (
          <>
            <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end items-center mb-5 lg:mb-1">
              <div>
                <Image
                  src="/ModalPatient.png"
                  alt="Logo"
                  width={800}
                  height={450}
                />
              </div>
              <div className="md:mt-20 lg:mt-20 mt-10">
                <Button
                  customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5 w-80"
                  label="AVANÇAR"
                  onClick={handleFinalMessage}
                />
              </div>
            </div>
          </>
        )}

        <div
          className={`my-5 z-40 flex flex-col pb-2 ${
            questionNumber !== 4 && questionNumber !== 3
              ? "border-b-[0.1rem] border-[#051F4A]"
              : null
          } lg:pb-5`}
        >
          {!isNext && (
            <>
              <div className="flex flex-col justify-start text-careLightBlue text-3xl mb-2 lg:text-4xl lg:ml-4">
                <span>
                  Que legal ver você por aqui,{" "}
                  {auth.userDataPatient[0].namePatient}
                </span>
              </div>
              <div className="flex flex-col justify-start text-careLightBlue text-3xl lg:text-4xl mb-5 lg:ml-4">
                <span>Vamos começar ?</span>
              </div>
            </>
          )}

          {isNext &&
            questionNumber < 4 &&
            !(questionNumber === 3 && answer === "Não") && (
              <div className="flex flex-col justify-start text-careBlue text-2xl mb-3 ml-4 lg:text-3xl lg:ml-4">
                <span>MyACUVUE® quer saber:</span>
              </div>
            )}
        </div>

        {!isNext ? (
          <div className="ml-4 flex flex-col gap-4">
            <div className="text-careBlue  text-base md:text-xl lg:text-xl">
              <span>
                Queremos que você tenha uma experiência única e personalizada
                com nossas lentes de contato, então gostaríamos de te conhecer
                melhor.
              </span>
            </div>
            <div className="text-careDarkBlue text-base md:text-xl lg:text-xl">
              <span>
                ​Preencha as informações a seguir e resgate seu voucher para
                começar!
              </span>
            </div>
          </div>
        ) : null}

        {finalMessage && (
          <>
            <div className="ml-4 flex flex-col justify-center items-center">
              <div className="text-careBlue  text-base md:text-2xl lg:text-2xl">
                <span>Fale com um especialista pelo chat ou agende um</span>
              </div>
              <div className="text-careBlue text-base md:text-2xl lg:text-2xl">
                <span>atendimento na data e horário de sua preferência!</span>
              </div>
            </div>
            <div className="md:flex md:flex-row justify-center items-center lg:flex lg:flex-row gap-5 lg:mt-20 md:mt-20 mt-10 ">
              <div className="ml-5 mb-3">
                <Button
                  customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5 w-72"
                  label="AGENDAR ATENDIMENTO"
                  onClick={() => {
                    onboardModal.onClose();
                    router.push("/schedule-appointment");
                  }}
                />
              </div>
              <div className="ml-5 mb-3">
                <Button
                  customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5 w-72"
                  label="FALAR PELO CHAT"
                  onClick={() => {
                    onboardModal.onClose();
                    router.push("/talk-to-specialist");
                  }}
                />
              </div>
              <div className="ml-5 mb-3">
                <Button
                  customClass="bg-careLightBlue border-careLightBlue py-2 xl:py-5 w-72"
                  label="ACESSAR"
                  onClick={() => {
                    onboardModal.onClose();
                  }}
                />
              </div>
            </div>
          </>
        )}

        <div className="my-5 z-40 flex flex-col ">
          {isNext && (
            <>
              {questionNumber === 0 && (
                <>
                  {firstQuestionData.map((question, index) => (
                    <div key={question.questionNumber}>
                      <CardQuestions
                        options={question.questionOptions}
                        setSurvey={setSurvey}
                        question={question.questionDescription}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        setAnswer={setAnswer}
                      />
                    </div>
                  ))}
                </>
              )}
              {answer === "Sim" && questionNumber > 0 && (
                <>
                  {yesQuestionData.map((question, index) => (
                    <div key={question.questionNumber}>
                      {question.questionNumber === questionNumber && (
                        <CardQuestions
                          totalQuestions={3}
                          options={question.questionOptions}
                          setSurvey={setSurvey}
                          question={question.questionDescription}
                          questionNumber={questionNumber}
                          setQuestionNumber={setQuestionNumber}
                          setAnswer={setAnswer}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
              {answer === "Não" && questionNumber > 0 && (
                <>
                  {noQuestionData.map((question, index) => (
                    <div key={question.questionNumber}>
                      {question.questionNumber === questionNumber && (
                        <CardQuestions
                          totalQuestions={2}
                          options={question.questionOptions}
                          setSurvey={setSurvey}
                          question={question.questionDescription}
                          questionNumber={questionNumber}
                          setQuestionNumber={setQuestionNumber}
                          setAnswer={setAnswer}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end items-center mb-5 lg:mb-1">
          {!isNext && (
            <Button
              customClass="bg-careBlue border-careBlue py-2 xl:py-5 w-80"
              label="AVANÇAR"
              onClick={() => setIsNext(true)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default OnboardModal;
