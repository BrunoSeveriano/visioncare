import VoucherPartient from "@/components/voucher/VoucherPartient";
import { getListVoucherPatients } from "@/services/voucher";
import React, { useState } from "react";

const patientVoucher = () => {
  return (
    <div>
      <VoucherPartient clientData={null} selectedStatus={""} />;
    </div>
  );
};

export default patientVoucher;
