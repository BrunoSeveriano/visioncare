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

const OnboardModal = () => {
  const onboardModal = useOnboardModal();
  const [isNext, setIsNext] = useState(false);
  const auth = useLogin();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const dataStorage = useDataStorage();

  const [survey, setSurvey] = useState<any[]>([]);
  useEffect(() => {
    dataStorage.setSurveyData(survey);
  }, [survey]);

  return (
    <div>
      <Modal
        isOpen={onboardModal.isOpen}
        onClose={onboardModal.onClose}
        isButtonDisabled
        customClass="w-[65rem]"
        isCloseIconVisible={false}
      >
        <div className="my-5 z-40 flex flex-col pb-2 border-b-[0.1rem] border-[#FF6A39] lg:pb-10">
          {isNext ? (
            <div className="flex flex-col justify-start text-careBlue text-2xl mb-3 ml-4 lg:text-3xl lg:ml-4">
              <span>MyACUVUE® quer saber:</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-start text-careLightBlue text-3xl mb-2 lg:text-5xl lg:ml-4">
                <span>
                  Que legal ver você por aqui, {auth.name?.split("@")[0]}
                </span>
              </div>
              <div className="flex flex-col justify-start text-careLightBlue text-3xl lg:text-5xl mb-5 lg:ml-4">
                <span>Vamos começar ?</span>
              </div>
            </>
          )}
        </div>
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
              customClass="bg-carePurple border-carePurple py-2 xl:py-5 w-80"
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
