import { api } from "./api";

export const getQuestions = async (name: string, programCode: string) => {
  const response = await api.get(
    `/survey/getquestionssurvey?name=${name}&programcode=${programCode}`
  );
  return response.data;
};

export const responseSurvey = async (data: any) => {
  const response = await api.post(
    `/survey/addresponsesurvey?programcode=073`,
    data
  );
  return response.data;
};
