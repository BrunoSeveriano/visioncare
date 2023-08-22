import { api } from "./api";

export const addPurchase = async (data: IPurchaseAdd) => {
  const response = await api.post(`/purchase/add`, data);
  return response.data.value;
};
