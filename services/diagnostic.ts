import { api } from "./api";

export const schedulevisittoclinic = async (data: any) => {
  const response = await api.post("/diagnostic/schedulevisittoclinic", {
    ...data,
    programCode: "073",
    description: "Agendamento de adaptação de lentes de contato",
  });
  return response.data;
};
