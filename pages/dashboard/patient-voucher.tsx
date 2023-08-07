import VoucherPartient from "@/components/voucher/VoucherPartient";
import React from "react";

const patientVoucher = () => {
  const ClientData = {
    cpf: "12345678910",
    vouchers: [
      {
        id: 1,
        discountType: "Porcentagem",
        deadlineInDays: 30,
        discountValue: 10,
        status: "Ativo",
      },
      {
        id: 2,
        discountType: "Porcentagem",
        deadlineInDays: 30,
        discountValue: 10,
        status: "Ativo",
      },
      {
        id: 3,
        discountType: "Porcentagem",
        deadlineInDays: 30,
        discountValue: 10,
        status: "Ativo",
      },
    ],
    filters: [
      {
        useDate: "2021-08-04T00:00:00",
        discountType: "Porcentagem",
        locality: "São Paulo",
      },
      {
        useDate: "2021-08-04T00:00:00",
        discountType: "Porcentagem",
        locality: "São Paulo",
      },
      {
        useDate: "2021-08-04T00:00:00",
        discountType: "Porcentagem",
        locality: "São Paulo",
      },
    ],
  };

  return <VoucherPartient clientData={ClientData} selectedStatus={""} />;
};

export default patientVoucher;
