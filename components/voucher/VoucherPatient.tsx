import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { getListVoucherPatients } from "@/services/voucher";
import ContentCard from "../card/ContentCard";
import { TableUserPacient } from "@/helpers/TableUserPacient";

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
          textColor="text-careLightBlue"
          bgColor="bg-careLightBlue"
          hasIcon
          onButtonClick={handleShowHistory}
        />
      </div>

      {clientData && (
        <div>
          <div className="w-[21rem] md:w-full mt-7 grid-cols-1 fade-in">
            {showHistory ? (
              <div>
                <CustomTable
                  rowId="id"
                  rows={getFilteredVouchers(
                    clientData.vouchers,
                    selectedStatus
                  )}
                  columns={TableUserPacient.columns}
                />
              </div>
            ) : (
              <div className="mt-5 md:w-full  md:right-0 bg-white">
                <div className="py-[30px] px-5 border-b-2 border-gray-200 flex flex-col">
                  <span className="text-2xl text-careLightBlue">
                    Histórico de utilização
                  </span>
                </div>
                <div className="mb-5 py-5 px-5 border-b-2 border-gray-200 flex flex-col">
                  <span className="text-lg- text-careBlue">DATA / LOCAL</span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="md:ml-4 mb-5">
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherPatient;
