import { api } from "./api";

export const getCalendar = async (filters?: any) => {
  const response = await api.get(
    `/resourceworksetting/listmonthlycalendaravailabilities`,
    {
      params: {
        accountId: "",
        month: "",
        programCode: "073",

        ...filters,
      },
    }
  );
  return response.data;
};
