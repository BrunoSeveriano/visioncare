import { api } from "./api";

export const calenderPartinerAdd = async (data: ICalenderAdd) => {
  const response = await api.post(`/resourceworksetting/add`, data);
  return response.data.value;
};

export const calenderPartinerDelete = async (data: ICalenderDelete) => {
  const response = await api.post(`/resourceworksetting/delete`, data);
  return response.data.value;
};

export const getListMonthlyCalendaraVailabilities = async (
  accountId: string = "",
  month: string = ""
) => {
  const response = await api.get(
    `/resourceworksetting/listmonthlycalendaravailabilities`,
    {
      params: {
        accountId: accountId,
        month: month,
        programCode: "073",
      },
    }
  );
  return response.data.value;
};
