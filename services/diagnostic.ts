import { api } from "./api";

export const schedulevisittoclinic = async (data: any) => {
  const response = await api.post("/diagnostic/schedulevisittoclinic", {
    ...data,
    programCode: "073",
    description: "Agendamento de adaptação de lentes de contato",
  });
  return response.data;
};

export const listVisitiClinic = async (filters?: any) => {
  const response = await api.get(`/diagnostic/listvisitstoclinic`, {
    params: {
      programCode: "073",
      pageSize: 1000000000,
      ...filters,
    },
  });
  return response.data;
};

export const listConfirmedVisitiClinic = async (filters?: any) => {
  const response = await api.get(`/diagnostic/listvisitattendance`, {
    params: {
      programCode: "073",
      pageSize: 1000000000,
      ...filters,
    },
  });
  return response.data;
};

export const confirmVisitClinic = async (data: any) => {
  const response = await api.post("/diagnostic/confirmvisittoclinic", null, {
    params: {
      programCode: "073",
      visitid: data.visitid,
    },
  });
  return response.data;
};

export const cancelVisitClinic = async (data: any) => {
  const response = await api.post("/diagnostic/cancelvisittoclinic", null, {
    params: {
      programCode: "073",
      visitid: data.visitid,
    },
  });
  return response.data;
};

export const confirmVisitAttendance = async (data: any) => {
  const response = await api.post("/diagnostic/confirmvisitattendance", {
    programCode: "073",
    originEntityId: data.originEntityId,
  });
  return response.data;
};

export const cancelVisitAttendance = async (data: any) => {
  const response = await api.post("/diagnostic/cancelvisitattendance", {
    programCode: "073",
    originEntityId: data.originEntityId,
  });
  return response.data;
};

export const patientNotAttended = async (data: any) => {
  const response = await api.post("/diagnostic/patientnotattended", {
    programCode: "073",
    originEntityId: data.originEntityId,
  });
  return response.data;
};
