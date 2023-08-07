import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { TableMockupPacient } from "@/helpers/TableMockupPacient";
import { getListVoucherPatients } from "@/services/voucher";
import ContentCard from "../card/ContentCard";

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

const VoucherPartient: React.FC<SearchModalProps> = ({
  clientData,
  selectedStatus,
}) => {
  const [clientVouchers, setClientVouchers] = useState<Voucher[]>([]);
  const [utilizedHistory, setUtilizedHistory] = useState<UtilizedHistory[]>([]);

  useEffect(() => {
    if (clientData && clientData.cpf) {
      console.log("Buscando dados do cliente...");
      getListVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          setClientVouchers(data);
          setUtilizedHistory(data.utilizedHistory);
          console.log("Vouchers de clientes:", data);
        })
        .catch((error) => {
          console.error("Erro ao buscar vouchers de clientes:", error);
        });
    }
  }, [clientData]);

  function formatDate(date: string) {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2].split("T")[0];
    return `${day}/${month}/${year}`;
  }

  function getFilteredVouchers(vouchers: Voucher[], status: string) {
    if (!status) {
      return vouchers;
    }

    return vouchers.filter((voucher) => voucher.status === status);
  }

  return (
    <div>
      <div className="grid-cols-1 mb-3">
        <ContentCard
          svgIcon="/svg/v-card.svg"
          title="Meus Vouchers​"
          subtitle="qui você pode visualizar todos os vouchers atribuídos ao seu CPF. Fique por dentro das campanhas em andamento, acompanhe os vouchers que estão próximos a expirar e veja também quais cupons já foram utilizados. Tudo isso em um só lugar!​"
          buttonText="Ver mais"
          textColor="text-careDarkBlue"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
      </div>
      {clientData && (
        <div>
          <div className="mt-7 grid-cols-3 md:flex md:flex-row gap-5 fade-in">
            <div className="w-full  md:w-3/5">
              <div>
                <CustomTable
                  rowId="id"
                  rows={getFilteredVouchers(
                    clientData.vouchers,
                    selectedStatus
                  )}
                  columns={TableMockupPacient.columns}
                />
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:w-2/5">
              <div className="mb-3">
                <span className="text-2xl text-careLightBlue ">
                  Histórico de utilização
                </span>
              </div>
              <div className="w-full ">
                {utilizedHistory &&
                  utilizedHistory.length > 0 &&
                  utilizedHistory.map((historyItem, index) => (
                    <>
                      <div
                        key={index}
                        className="border border-careGrey bg-careGrey p-5 rounded-t-xl"
                      >
                        <div className="text-careLightBlue">
                          {formatDate(historyItem.useDate)}
                        </div>
                        <div className="text-careBlue mt-1">
                          <span className="font-bold text-lg">
                            {historyItem.discountType} -
                          </span>
                          <span> {historyItem.locality}</span>
                        </div>
                      </div>
                      <div className="flex justify-end rounded-b-xl text-careLightBlue bg-careBlue text-lg p-3 ">
                        {historyItem.discountType}
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherPartient;
