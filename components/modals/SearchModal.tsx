import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import CustomTable from "../table/CustomTable";
import { TableMockupPacient } from "@/helpers/TableMockupPacient";
import { getListVoucherPatients } from "@/services/voucher";
import useTalkModal from "@/hooks/useTalkModal";
import useDataStorage from "@/hooks/useDataStorage";
import dayjs from "dayjs";

interface ClientData {
  name: string;
  cpf: string;
  email: string;
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
  refreshTable: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  clientData,
  selectedStatus,
  refreshTable,
}) => {
  const [clientVouchers, setClientVouchers] = useState<Voucher[]>([]);
  const [utilizedHistory, setUtilizedHistory] = useState<UtilizedHistory[]>([]);
  const showHistoryPacient = useTalkModal();
  const [isLoading, setIsLoading] = useState(false);
  const useData = useDataStorage();

  useEffect(() => {
    if (clientData && clientData.cpf) {
      setIsLoading(true);
      getListVoucherPatients({ cpf: clientData.cpf })
        .then((data) => {
          setClientVouchers(data);
          setUtilizedHistory(data.utilizedHistory);
          refreshTable();
        })
        .catch((error) => {
          console.error(error);
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

  const handleCloseHistory = () => {
    showHistoryPacient.onClose();
  };

  return (
    <div>
      {clientData ? (
        <div>
          <div className=" flex flex-row md:flex md:flex-col fade-in">
            <div className="rounded-l-xl w-40 pl-5 grid grid-cols-1 md:w-full bg-careLightGreen md:flex md:justify-around items-center md:rounded-t-xl pt-4 pb-4 text-xl text-white  ">
              <span>Cliente</span>
              <span>CPF</span>
              <span className="mr-8">E-mail</span>
              <span>Ações</span>
            </div>
            <div className="rounded-r-xl p-2 grid grid-cols-1  w-full bg-careOffWhite md:flex md:justify-around items-center pt-3 pb-3 md:rounded-b-xl text-md text-careDarkBlue ">
              <span className="border-b-2 pt-1 pb-2 md:border-none">
                {clientData.name}
              </span>
              <span className="border-b-2 pt-1 pb-2 md:border-none">
                {clientData.cpf}
              </span>
              <span className="border-b-2 pt-1 pb-2 md:border-none">
                {clientData.email}
              </span>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={
                    showHistoryPacient.isOpen
                      ? handleCloseHistory
                      : showHistoryPacient.onOpen
                  }
                  disableHover
                  label="Ver mais"
                  customClass="bg-careDarkBlue border-careDarkBlue p-9 py-1 mr-1"
                />
              </div>
            </div>
          </div>
          {showHistoryPacient.isOpen ? (
            <div className="mt-7 grid-cols-3 md:flex md:flex-row gap-5 fade-in">
              <div className="w-full  md:w-3/5">
                <div className="mb-3">
                  <span className="text-2xl text-careLightBlue">
                    Histórico de Vouchers do Cliente
                  </span>
                </div>
                <div>
                  <CustomTable
                    isLoading={isLoading}
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
                <div className="w-full">
                  {utilizedHistory &&
                    utilizedHistory.length > 0 &&
                    utilizedHistory.map((historyItem, index) => (
                      <>
                        <div
                          key={index}
                          className="border border-careGrey bg-careGrey p-5 rounded-t-xl mt-3"
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
                        <div className="flex justify-end rounded-b-xl text-careLightBlue bg-careBlue text-lg p-3 ">
                          {historyItem.discountType}
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchModal;
