import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Input from "@/components/input/Input";
import Button from "../button/Button";
import useEditVoucher from "@/hooks/useEditVoucher";
import { deleteVoucher, updateVoucher } from "@/services/voucher";
import { ToastContainer, toast } from "react-toastify";
import useCancelVoucher from "@/hooks/useCancelVoucher";
import CancelVoucherModal from "../modals/CancelVoucherModal";
import useDataStorage from "@/hooks/useDataStorage";
import CustomSelect from "../select/Select";

const EditVoucher = () => {
  const [isEditing, setIsEditing] = useState(true);
  const dataStorage = useDataStorage();

  const [voucher, setVoucher] = useState({
    Id: dataStorage.id,
    Name: dataStorage.Name,
    DiscountType: dataStorage.DiscountType,
    DiscountValue: dataStorage.DiscountValue,
    DeadlineInDays: dataStorage.DeadlineInDays,
    Note: dataStorage.Note,
    ProgramCode: "073",
  });

  const handleUpdateVoucher = async () => {
    updateVoucher(voucher)
      .then((res) => {
        toast.success("Voucher editado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao editar voucher.");
      });
  };

  const handlelChange = (event: any) => {
    const { name, value } = event.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const editVoucher = useEditVoucher();
  const cancelVoucher = useCancelVoucher();

  return (
    <div className="w-full h-full fade-in">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <div className="md:grid md:grid-cols-1 rounded-lg">
        <div className="bg-careGrey  rounded-md p-2 flex items-center">
          <div className="border-careDarkPurple border-r-[2px] text-careDarkPurple">
            <AiOutlineInfoCircle className="mr-3" size="2rem" />
          </div>
          <span className="pl-5 text-careDarkBlue">
            Visualize vouchers cadastrados, verifique status de campanha e
            acompanhe casos específicos.
          </span>
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 gap-8  mt-10">
        <div>
          <span className="text-2xl text-careLightBlue">Editar Voucher</span>
          <div className="sm:grid sm:grid-cols-1  md:grid md:grid-cols-3 gap-6 mt-5">
            <div>
              <span className="text-carePurple">
                Nome do Voucher / Campanha
              </span>
              <Input
                name="Name"
                value={voucher.Name}
                onChange={handlelChange}
                disabled={isEditing}
              />
            </div>
            <div>
              <span className="text-carePurple">
                Informe o tipo de desconto
              </span>
              <Input
                name="DiscountType"
                value={voucher.DiscountType}
                onChange={handlelChange}
                disabled={isEditing}
              />
            </div>
            <div>
              <span className="text-carePurple">
                Informe o valor do desconto
              </span>
              <Input
                name="DiscountValue"
                value={voucher.DiscountValue}
                onChange={handlelChange}
                disabled={isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-1 gap-8  mt-10">
        <div>
          <div className="sm:grid grid-cols-1  mb-8 md:mb-0 md:grid md:grid-cols-3 gap-6">
            <div>
              <span className="text-carePurple">
                Informe a data de validade do Voucher
              </span>
              <CustomSelect
                fullWidth
                name="DeadlineInDays"
                value={voucher.DeadlineInDays}
                onChange={handlelChange}
                disabled={isEditing}
                options={[
                  {
                    id: "30",
                    value: "30 dias",
                  },
                  {
                    id: "60",
                    value: "60 dias",
                  },
                ]}
              />
            </div>
            <div className="col-span-2">
              <span className="text-carePurple">Observações</span>
              <Input
                name="Note"
                value={voucher.Note}
                onChange={handlelChange}
                disabled={isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="sm:grid grid-cols-1 md:flex justify-end  md:mt-20 ">
          <div className=" mb-3 md:mt-2 md:mr-3">
            <Button
              onClick={editVoucher.onClose}
              customClass="w-full border-none underline text-blue-600  p-4 py-2 "
              label="Voltar"
            />
          </div>

          <div className=" mb-3 md:mt-1 md:mr-3">
            <Button
              onClick={cancelVoucher.onOpen}
              customClass="w-full border-careDarkBlue text-[#03014C] p-4 py-3 px-10"
              label="Cancelar Voucher"
            />
          </div>

          <div className=" mb-3 md:mt-1 md:mr-3">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              customClass=" w-full bg-careOrange border-careOrange p-4 py-3 px-10"
              label="Editar"
            />
          </div>

          <div className=" mb-3 md:mt-1">
            <Button
              onClick={handleUpdateVoucher}
              customClass=" w-full bg-carePurple border-carePurple p-4 py-3 px-10"
              label="Salvar"
              disabled={isEditing}
            />
          </div>
        </div>
      </div>
      {cancelVoucher.isOpen && <CancelVoucherModal />}
    </div>
  );
};

export default EditVoucher;
