import { api } from "./api";

export const addVoucher = async (data: IaddVoucherData) => {
  const response = await api.post("/voucher/add", data);
  return response.data;
};

export const updateVoucher = async (data: IupdateVoucherData) => {
  const response = await api.post("/voucher/update", data);
  return response.data;
};

export const deleteVoucher = async (id: string, programCode: string) => {
  const response = await api.post(
    `/voucher/delete?voucherId=${id}&programCode=${programCode}`
  );
  return response.data;
};

export const getListVoucher = async (filters?: any) => {
  const response = await api.get(`/voucher/list`, {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data.value;
};

export const getVoucherTypes = async (filters?: any) => {
  const response = await api.get("/voucher/getVoucherTypes", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data;
};

export const getListVoucherPatients = async (filters?: any) => {
  const response = await api.get("/voucher/listbypatient", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data.value;
};

export const getListAllPatients = async (filters?: any) => {
  const response = await api.get("/voucher/listallpatient", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data.value;
};

export const getResumeVoucher = async (filters?: any) => {
  const response = await api.get("/voucher/resulme", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data.value;
};
