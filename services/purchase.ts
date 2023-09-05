import { api } from "./api";

export const addPurchase = async (data: IPurchaseAdd) => {
  const response = await api.post(`/purchase/add`, data);
  return response.data.value;
};

export const addRepayment = async (data: IRepayment) => {
  const response = await api.post(`/purchase/repayment`, data);
  return response.data.value;
};

export const listPurchase = async () => {
  const response = await api.get(`/purchase/listbonus`, {
    params: {
      programCode: "073",
    },
  });
  return response.data;
};

export const listReimbursementData = async () => {
  const response = await api.get(`/voucher/resumeusedvoucher`, {
    params: {
      programCode: "073",
    },
  });
  return response.data;
};
