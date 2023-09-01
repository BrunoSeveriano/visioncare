import { api } from "./api";

export const calenderPartinerAdd = async (data: ICalenderAdd) => {
  const response = await api.post(`/resourceworksetting/add`, data);
  return response.data.value;
};

export const calenderPartinerUpdate = async (data: ICalenderUpdate) => {
  const response = await api.post(`/resourceworksetting/update`, data);
  return response.data.value;
};
