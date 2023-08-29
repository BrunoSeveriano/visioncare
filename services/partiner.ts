import { api } from "./api";

export const listPartiner = async (filters?: any) => {
  const response = await api.get(`/account/list`, {
    params: {
      programCode: "073",
      pageSize: 1000000000,
      ...filters,
    },
  });
  return response.data;
};

export const addPartiner = async (data: IRegisterPartiner) => {
  const response = await api.post(`/account/add`, data);
  return response.data.value;
};

export const updatePartiner = async (data: IUpdatePartiner) => {
  const response = await api.post(`/account/update`, data);
  return response.data.value;
};

export const deletePartiner = async (
  friendlyCode: string,
  programCode: string
) => {
  const response = await api.get(
    `/account/delete?friendlyCode=${friendlyCode}&programCode=${programCode}`
  );
  return response.data;
};
