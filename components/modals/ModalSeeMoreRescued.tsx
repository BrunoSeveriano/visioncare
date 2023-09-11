import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "../button/Button";
import useOpenSeeMoreVouchers from "@/hooks/useOpenSeeMoreVouchers";
import CustomTable from "../table/CustomTable";
import { SeeMoreVoucherTable } from "@/helpers/SeeMoreVoucherTable";
import { getListVoucher } from "@/services/voucher";

const ModalSeeMoreRescued = () => {
  const [listVoucher, setListVoucher] = useState<any[]>([]);
  const openModalSeeMoreVouchers = useOpenSeeMoreVouchers();

  const getVoucherData = useCallback(() => {
    getListVoucher().then((response) => {
      const filteredList = response.filter((voucher: any) => {
        return voucher.status === "24c3dd75-0ba6-459b-8b4c-f6bc77ea3713";
      });
      setListVoucher(filteredList);
    });
  }, []);

  useEffect(() => {
    getVoucherData();
  }, [getVoucherData]);

  return (
    <div>
      <Modal
        isCloseIconVisible={false}
        isButtonDisabled
        isOpen={openModalSeeMoreVouchers.isOpen}
        onClose={openModalSeeMoreVouchers.onClose}
      >
        <div className="flex flex-col items-center text-careLightBlue text-2xlmb-2 pb-8  lg:text-4xl ">
          <span>Detalhes do Voucher</span>
        </div>

        <div className="md:w-full lg:w-full w-80">
          <CustomTable
            rowId="createdDate"
            rows={listVoucher}
            columns={SeeMoreVoucherTable.columns}
          />
        </div>

        <div className="flex flex-col items-center mt-5 md:mt-10 mb-2 ">
          <Button
            onClick={openModalSeeMoreVouchers.onClose}
            customClass="w-full md:w-96 bg-careDarkBlue border-careDarkBlue py-3 mb-2"
            label="Fechar"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalSeeMoreRescued;
