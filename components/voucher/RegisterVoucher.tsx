import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Input from "@/components/input/Input";
import Button from "../button/Button";
import CustomSelect from "../select/Select";
import useRegisterVoucher from "@/hooks/useRegisterVoucher";
import { ToastContainer, toast } from "react-toastify";
import RegisterVoucherModal from "../modals/RegisterVoucherModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useDataStorage from "@/hooks/useDataStorage";

const RegisterVoucher = () => {
  const dataStorage = useDataStorage();

  const [voucher, setVoucher] = useState({
    Name: "",
    DiscountType: "",
    DiscountValue: 0,
    DeadlineInDays: 0,
    Note: "",
  });

  const openModal = () => {
    dataStorage.setVoucherData(voucher);
    register.onOpen();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const registerVoucher = useRegisterVoucher();
  const register = useRegisterModal();

  return (
    <div className="w-full fade-in">
      <div className=" md:grid md:grid-cols-1 rounded-lg">
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
        <div className=" bg-careGrey  rounded-md p-2 flex items-center">
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
          <span className="text-2xl text-careLightBlue">Cadastrar Voucher</span>
          <div className="sm:grid grid-cols-1 md:grid md:grid-cols-3 gap-6 mt-5">
            <div>
              <span className="text-carePurple">
                Nome do Voucher / Campanha
              </span>
              <Input
                name="Name"
                value={voucher.Name}
                onChange={handleChange}
                placeholder="Digite o nome"
              />
            </div>
            <div>
              <span className="text-carePurple">
                Informe o tipo de desconto
              </span>
              <Input
                name="DiscountType"
                value={voucher.DiscountType}
                onChange={handleChange}
                placeholder="Regra"
              />
            </div>
            <div>
              <span className="text-carePurple">
                Informe o valor do desconto
              </span>
              <Input
                name="DiscountValue"
                value={voucher.DiscountValue !== 0 ? voucher.DiscountValue : ""}
                onChange={handleChange}
                placeholder="Porcentagem do Desconto (Apenas números)"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 gap-8  mt-10">
        <div>
          <div className="sm:grid grid-caols-1 mb-8 md:mb-0 md:grid grid-cols-3 gap-6">
            <div>
              <span className="text-carePurple">
                Informe a data de validade do Voucher
              </span>
              <CustomSelect
                fullWidth
                name="DeadlineInDays"
                value={voucher.DeadlineInDays}
                onChange={handleChange}
                placeholder="Ex. 30 dias. A partir da data de criação"
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
                onChange={handleChange}
                placeholder="Digite alguma observação"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 md:flex md:justify-end mt-2 md:mt-10 mb-2 ">
        <Button
          onClick={registerVoucher.onClose}
          customClass=" border-none text-blue-500 underline p-4 py-2 mt-2 "
          label="Voltar"
        />
        <Button
          onClick={openModal}
          customClass=" bg-carePurple border-carePurple p-4 py-3 px-10"
          label="Adicionar"
        />
      </div>
      {register.isOpen && <RegisterVoucherModal />}
    </div>
  );
};

export default RegisterVoucher;
