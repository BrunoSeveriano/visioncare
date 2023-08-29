import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import { getListVoucherPatients, rescueVoucher } from "@/services/voucher";
import ContentCard from "../card/ContentCard";
import { TableUserPacient } from "@/helpers/TableUserPacient";
import useDataStorage from "@/hooks/useDataStorage";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import dayjs from "dayjs";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const useData = useDataStorage();

  useEffect(() => {
    if (clientData && clientData.cpf) {
      setIsLoading(true);
      getListVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          voucherHistory.setVoucherUserHistory(data);
          setClientVouchers(data);
          setUtilizedHistory(data.utilizedHistory);
        })
        .catch((error) => {
          error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [clientData, useData.refresh]);

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
      <div className="grid-cols-1 mb-3 md:mr-0 mr-1">
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
          <div className="w-[22rem] md:w-full mt-7 grid-cols-1 fade-in">
            <div>
              <CustomTable
                isLoading={isLoading}
                rowId="id"
                rows={getFilteredVouchers(clientData.vouchers, selectedStatus)}
                columns={TableUserPacient.columns}
              />
            </div>
          </div>
        </div>
      )}
      <div className="block md:hidden mt-5 md:w-1/3  md:right-0 bg-white">
        <div className="py-[30px] px-5 border-b-2 border-gray-200 flex flex-col">
          <span className="text-2xl text-careLightBlue">
            Histórico de utilização
          </span>
        </div>
        <div className="mb-5 py-5 px-5 border-b-2 border-gray-200 flex flex-col">
          <span className="text-lg- text-careBlue">DATA / LOCAL</span>
        </div>
        <div className="w-[22rem]">
          <div className="md:ml-4 mb-5">
            {voucherHistory.VoucherUserHistory.utilizedHistory &&
              voucherHistory.VoucherUserHistory.utilizedHistory.length > 0 &&
              voucherHistory.VoucherUserHistory.utilizedHistory.map(
                (historyItem: any, index: any) => (
                  <>
                    <div
                      key={index}
                      className="border border-careGrey bg-careGrey p-5 rounded-t-xl"
                    >
                      <div className="text-careLightBlue">
                        {dayjs(historyItem.useDate).format("DD/MM/YYYY")}
                      </div>
                      <div className="text-careBlue mt-1">
                        <span className="font-bold text-lg">
                          {historyItem.discountType} -
                        </span>
                        <span> {historyItem.locality}</span>
                      </div>
                    </div>
                    <div className="flex justify-end rounded-b-xl mb-3 text-careLightBlue bg-careBlue text-lg p-3 ">
                      {historyItem.discountType}
                    </div>
                  </>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoucherPatient;
