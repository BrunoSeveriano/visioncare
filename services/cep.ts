import axios from "axios";

export const getAddressByCep = async (cep: number | string) => {
  const response = await axios.get(
    `https://brasilapi.com.br/api/cep/v1/${cep}`
  );
  return response.data;
};

export const getUfList = async () => {
  const response = await axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
  );
  return response.data;
};
