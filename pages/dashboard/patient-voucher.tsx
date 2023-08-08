import VoucherPatient from "@/components/voucher/VoucherPatient";
import { getListVoucherPatients } from "@/services/voucher";
import React, { useEffect, useState } from "react";
import { getClientData } from "@/services/login";

interface IDateClient {
  data: {
    namePatient: string;
    patientBirthDate: string;
    cpf: string;
    patientMobilephone: string;
    patientEmail: string;
    patientUserPassword: string;
  }[];
}

const PatientVoucher = () => {
  const [searchModalData, setSearchModalData] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const clientData: IDateClient = await getClientData();
        if (clientData.data && clientData.data.length > 0) {
          const loggedInPatient = clientData.data.find(
            (diagnostic) => diagnostic.cpf === clientData.data[0].cpf
          );

          if (loggedInPatient) {
            const vouchersData = await getListVoucherPatients({
              cpf: loggedInPatient.cpf,
            });
            setSearchModalData(vouchersData);
          }
        }
      } catch (error) {
        setSearchModalData(null);
      }
    };
    fetchVouchers();
  }, []);

  return (
    <div>
      <VoucherPatient clientData={searchModalData} selectedStatus={""} />
    </div>
  );
};

export default PatientVoucher;
