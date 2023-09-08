import React from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { MdArrowBack } from "react-icons/md";
import useOnboardModal from "@/hooks/useOnboardModal";
import { responseSurvey } from "@/services/questions";
import useDataStorage from "@/hooks/useDataStorage";

interface CardQuestionsProps {
  question: string;
  options: any[] | undefined;
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  customAnswer?: React.ReactNode;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setSurvey: React.Dispatch<React.SetStateAction<any[]>>;
  totalQuestions?: number;
}

const CardQuestions = ({
  question,
  customAnswer,
  questionNumber,
  setQuestionNumber,
  setAnswer,
  setSurvey,
  totalQuestions,
  options,
}: CardQuestionsProps) => {
  const theme = useTheme();
  const onboardModal = useOnboardModal();
  const [currentOptions, setCurrentOptions] = React.useState<any>({});
  const [isCkecked, setIsChecked] = React.useState<string | undefined>(
    undefined
  );

  const dataStorage = useDataStorage();

  const handleSurvey = (e: any) => {
    const { name, value } = e.target;
    setCurrentOptions({
      questionResponse: value,
      questionId: name,
    });
    setIsChecked((prevIsChecked) =>
      prevIsChecked === name ? undefined : name
    );
  };

  const handleNext = () => {
    setSurvey((prevSurvey) => [
      ...prevSurvey,
      {
        surveyId: "02bc4ffe-7f5a-492e-b894-c6b817afef02",
        questionResponse: currentOptions.questionResponse,
        questionId: currentOptions.questionId,
      },
    ]);
    if (questionNumber === 0) {
      setAnswer(currentOptions.questionResponse);
    }
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    console.log(dataStorage.surveyData);

    if (totalQuestions === questionNumber) {
      // handleSubmit();
    }
  };

  const handleBack = () => {
    setSurvey((prevSurvey) => prevSurvey.slice(0, -1));
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber - 1);
  };

  const handleSubmit = async () => {
    await responseSurvey(dataStorage.surveyData).then(() => {});
  };

  return (
    <div className="w-full">
      <div className="my-5">
        <span className="text-careLightBlue font-bold text-lg ml-7 lg:text-2xl">
          {question}
        </span>
        <div className="ml-5 mt-3">
          {customAnswer ? (
            customAnswer
          ) : (
            <div>
              {options?.map((option, index) => (
                <>
                  <Checkbox
                    key={index}
                    name={option.questionId}
                    value={option.questionResponse}
                    sx={{
                      color: "#0A7CC1",
                      "&.Mui-checked": {
                        color: "#051F4A",
                      },
                    }}
                    onChange={handleSurvey}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    checked={isCkecked === option.questionId}
                  />
                  <span className="text-careBlue opacity-70 text-lg">
                    {option.questionResponse}
                  </span>
                </>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8 gap-2 xl:gap-4 justify-end items-center lg:mb-1">
        <div className="flex sm:flex-row sm:justify-between sm:items-center space-x-2">
          {questionNumber !== 0 && (
            <>
              <MdArrowBack
                className="block md:hidden bg-careBlue border-careBlue rounded-lg py-2 w-14 h-12 text-white mb-2 sm:mb-0 lg:w-64 lg:h-12"
                size="1.5em"
                onClick={handleBack}
              />
              <Button
                className="hidden md:block bg-careBlue border-careBlue rounded-lg py-2 w-14 h-12 text-white mb-2 sm:mb-0 lg:w-64 lg:h-12"
                size="small"
                onClick={handleBack}
                disabled={questionNumber === 0}
              >
                ANTERIOR
              </Button>
            </>
          )}
          {totalQuestions === questionNumber ? (
            <Button
              className="bg-careLightBlue border-careLightBlue rounded-lg py-2 w-56 h-12 text-white lg:w-64 lg:h-12"
              onClick={handleNext}
            >
              FINALIZAR
            </Button>
          ) : (
            <Button
              className="bg-careLightBlue border-careLightBlue rounded-lg py-2 w-56 h-12 text-white lg:w-64 lg:h-12"
              onClick={handleNext}
            >
              PRÓXIMO
            </Button>
          )}
        </div>

        <MobileStepper
          variant="dots"
          steps={totalQuestions ? totalQuestions + 1 : 1}
          position="static"
          activeStep={questionNumber}
          sx={{
            maxWidth: 400,
            flexGrow: 1,
          }}
          backButton={undefined}
          nextButton={undefined}
        />
      </div>
    </div>
  );
};

export default CardQuestions;
