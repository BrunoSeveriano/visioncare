import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { getListVoucherPatients } from "@/services/voucher";
import ContentCard from "../card/ContentCard";
import { TableUserPacient } from "@/helpers/TableUserPacient";
import useDataStorage from "@/hooks/useDataStorage";

interface ClientData {
  cpf: string;
  vouchers: Voucher[];
  filters: UtilizedHistory[];
}

interface Voucher {
  discountType: string;
  deadlineInDays: number;
  discountValue: number;
  status: string;
}

interface UtilizedHistory {
  useDate: string;
  discountType: string;
  locality: string;
}

interface SearchModalProps {
  clientData: ClientData | null;
  selectedStatus: string;
}

const VoucherPatient: React.FC<SearchModalProps> = ({
  clientData,
  selectedStatus,
}) => {
  const [clientVouchers, setClientVouchers] = useState<Voucher[]>([]);
  const [utilizedHistory, setUtilizedHistory] = useState<UtilizedHistory[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const voucherHistory = useDataStorage();

  useEffect(() => {
    if (clientData && clientData.cpf) {
      getListVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          voucherHistory.setVoucherUserHistory(data);
          setClientVouchers(data);
          setUtilizedHistory(data.utilizedHistory);
        })
        .catch((error) => {
          console.error("Erro ao buscar vouchers de clientes:", error);
        });
    }
  }, [clientData]);

  function getFilteredVouchers(vouchers: Voucher[], status: string) {
    if (!status) {
      return vouchers;
    }

    return vouchers.filter((voucher) => voucher.status === status);
  }

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <>
      <div className="grid-cols-1 mb-3">
        <ContentCard
          svgIcon="/svg/v-card.svg"
          title="Meus Vouchers​"
          subtitle="Aqui você pode visualizar todos os vouchers atribuídos ao seu CPF. Fique por dentro das campanhas em andamento, acompanhe os vouchers que estão próximos a expirar e veja também quais cupons já foram utilizados. Tudo isso em um só lugar!​"
          buttonText={showHistory ? "Ver Histórico" : "Ver Vouchers"}
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
          onButtonClick={handleShowHistory}
          hideButton
        />
      </div>

      {clientData && (
        <div>
          <div className="w-[21rem] md:w-full mt-7 grid-cols-1 fade-in">
            <div>
              <CustomTable
                rowId="id"
                rows={getFilteredVouchers(clientData.vouchers, selectedStatus)}
                columns={TableUserPacient.columns}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherPatient;
