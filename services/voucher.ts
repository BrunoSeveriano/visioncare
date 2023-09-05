import { api } from "./api";

export const useVoucher = async (data: IVoucherUse) => {
  const response = await api.post("/voucher/use", null, {
    params: {
      programCode: "073",
      voucherId: data.voucherId,
      productId: data.productId,
    },
  });
  return response.data;
};

export const rescueVoucher = async (data: IRescueVoucher) => {
  const response = await api.post("/voucher/rescue", null, {
    params: {
      programCode: "073",
      voucherId: data.voucherId,
    },
  });
  return response.data;
};

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

export const getListRescueVoucherPatients = async (filters?: any) => {
  const response = await api.get("/voucher/listbypatientrescue", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data.value;
};

export const getCodeNumber = async (filters?: any) => {
  const response = await api.get("/logistic/stuff/codeNumber", {
    params: {
      programCode: "073",
      ...filters,
    },
  });
  return response.data;
};

export const getDegree = async (codeNumber?: string) => {
  const response = await api.get("/logistic/stuff/degree", {
    params: {
      programCode: "073",
      codeNumber: codeNumber,
    },
  });
  return response.data;
};

export const getCylinder = async (codeNumber?: string, degree?: string) => {
  const response = await api.get("/logistic/stuff/cylinder", {
    params: {
      programCode: "073",
      codeNumber: codeNumber,
      degree: degree,
    },
  });
  return response.data;
};

export const getAxle = async (
  codeNumber?: string,
  degree?: string,
  cylinder?: string
) => {
  const response = await api.get("/logistic/stuff/axle", {
    params: {
      programCode: "073",
      codeNumber: codeNumber,
      degree: degree,
      cylinder: cylinder,
    },
  });
  return response.data;
};
