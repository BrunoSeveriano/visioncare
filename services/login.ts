import { api } from "./api";

export const userLogin = async (data: ILoginData) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const changePassword = async (data: IChangePasswordData) => {
  const response = await api.post("/changePassword", data);
  return response.data;
};

export const registerUser = async (data: IRegisterAccount) => {
  const response = await api.post("/diagnostic/add", data);
  return response.data;
};

export const registerAdm = async (data: IRegisterAdm) => {
  const response = await api.post("/user/create", data);
  return response.data;
};

export const resetPassword = async (data: IResetPasswordData) => {
  const response = await api.post("/forgotPassword", data);
  return response.data;
};

export const confirmationRegisterSmsToken = async (
  data: IConfirmationRegisterSmsToken
) => {
  const response = await api.post("/validateregistertoken", data);
  return response.data;
};

export const getClientData = async () => {
  const response = await api.get<IDateClient>("/diagnostic/getdiagnostics", {
    params: {
      programCode: "073",
    },
  });
  return response.data;
};

export const editClientData = async (data: IEditClientData) => {
  const response = await api.post("/diagnostic/updatediagnostic", data);
  return response.data;
};

export const getAdmData = async () => {
  const response = await api.get<IDateAdm>("/user/getuserbyidaslistmodel", {
    params: {
      programCode: "073",
    },
  });
  return response.data;
};
