import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { FaRegAddressCard } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineDateRange, MdOutlinePerson } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import CustomSelect from "../select/Select";
import CustomTable from "../table/CustomTable";
import { voucherListTable } from "@/helpers/TableMockup";
import SearchModal from "../modals/SearchModal";
import RegisterVoucher from "./RegisterVoucher";
import EditVoucher from "./EditVoucher";
import useRegisterVoucher from "@/hooks/useRegisterVoucher";
import useEditVoucher from "@/hooks/useEditVoucher";
import {
  getListVoucher,
  getListVoucherPatients,
  getVoucherTypes,
} from "@/services/voucher";
import { useEffect, useState } from "react";
import {
  VoucherFiltersPeriod,
  VoucherFiltersStatus,
} from "@/helpers/FiltersData";
import { VoucherFiltersStatusPacient } from "@/helpers/FiltersDataPacient";

const Voucher = () => {
  const registerVoucher = useRegisterVoucher();
  const editVoucher = useEditVoucher();
  const [editVoucherData, setEditVoucherData] = useState<any>({});
  const [voucherTypesOptions, setVoucherTypesOptions] = useState([{}]);
  const [listVoucher, setListVoucher] = useState<any[]>([]);
  const [searchCpf, setSearchCpf] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showCustomTable, setShowCustomTable] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchModalData, setSearchModalData] = useState(null);
  const [filters, setFilters] = useState<{
    voucherTypes: string;
    status: string;
    deadlineInDays: string;
  }>({
    voucherTypes: "",
    status: "",
    deadlineInDays: "",
  });

  const handleSearchClient = async () => {
    try {
      if (searchCpf.trim() === "" || searchCpf.length < 11) {
        setShowCustomTable(true);
        setShowSearchModal(false);
        return;
      }
      const clientData = await getListVoucherPatients({ cpf: searchCpf });
      setSearchModalData(clientData);
      setShowSearchModal(true);
      setShowCustomTable(false);
    } catch (error) {
      setSearchModalData(null);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  const handleEditVoucherRow = useCallback(
    (voucher: any) => {
      setEditVoucherData(voucher);
      editVoucher.onOpen();
    },
    [editVoucher]
  );

  const getVoucherData = useCallback(() => {
    getListVoucher(filters).then((response) => {
      setListVoucher(response);
    });
  }, [filters]);

  useEffect(() => {
    getVoucherData();
  }, [getVoucherData]);

  useEffect(() => {
    getVoucherTypes().then((response) => {
      if (response && Array.isArray(response.value)) {
        response.value.map((item: any) => {
          setVoucherTypesOptions((prevState) => [
            ...prevState,
            { id: item, value: item },
          ]);
        });
      } else {
        console.error("A resposta da API não contém o formato esperado.");
      }
    });
  }, []);

  const formatCpf = (value: any) => {
    const cleanedValue = value.replace(/\D/g, "");
    const match = cleanedValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }

    return cleanedValue;
  };

  const handleCpfChange = (e: any) => {
    const formattedCpf = formatCpf(e.target.value);
    setSearchCpf(formattedCpf);
  };

  return (
    <>
      {registerVoucher.isOpen && <RegisterVoucher />}
      {editVoucher.isOpen && <EditVoucher />}
      {!registerVoucher.isOpen && !editVoucher.isOpen && (
        <div className="w-3/5 md:w-full fade-in">
          <div className=" md:grid md:grid-cols-4 rounded-lg">
            <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
              <div className="border-careDarkPurple border-r-[2px] text-careDarkPurple">
                <AiOutlineInfoCircle className="mr-3" size="2rem" />
              </div>
              <span className="pl-5 text-careDarkBlue">
                Visualize vouchers cadastrados, verifique status de campanha e
                acompanhe casos específicos.
              </span>
            </div>
            <div className="mt-2 md:ml-10 mb-2">
              <Button
                onClick={registerVoucher.onOpen}
                customClass="md:w-full bg-careBlue border-careBlue p-4 py-2"
                label="Cadastrar voucher"
              />
            </div>
          </div>
          <div className="md:grid md:grid-cols-1 gap-8 my-2 fill-careDarkBlue mt-10">
            <div>
              <span className="text-2xl text-careLightBlue">
                Localizar Vouchers cadastrados
              </span>
              <div className="sm:grid-cols-1 md:grid md:grid-cols-3 gap-6">
                <CustomSelect
                  iconStart={FaRegAddressCard}
                  startIcon
                  fullWidth
                  name="voucherTypes"
                  options={voucherTypesOptions}
                  placeholder="Selecione o tipo de Voucher"
                  onChange={(e) =>
                    handleFilterChange("voucherTypes", e.target.value as string)
                  }
                />
                <CustomSelect
                  iconStart={BiTransfer}
                  startIcon
                  fullWidth
                  name="status"
                  placeholder="Selecione status do Voucher"
                  options={VoucherFiltersStatus}
                  onChange={(e) =>
                    handleFilterChange("status", e.target.value as string)
                  }
                />
                <CustomSelect
                  iconStart={MdOutlineDateRange}
                  startIcon
                  fullWidth
                  name="deadlineInDays"
                  placeholder="Período do Voucher"
                  options={VoucherFiltersPeriod}
                  onChange={(e) =>
                    handleFilterChange(
                      "deadlineInDays",
                      e.target.value as string
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-1 gap-8 my-2 fill-careDarkBlue mt-10">
            <div>
              <span className="text-2xl text-careLightBlue">
                Localizar Voucher por Cliente
              </span>
              <div className=" mb-8 md:mb-0 sm:grid-cols-1 md:grid md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <Input
                    maxLength={11}
                    value={searchCpf}
                    onChange={handleCpfChange}
                    iconStart={BsSearch}
                    startIcon
                    onEnter={handleSearchClient}
                  />
                </div>
                <div>
                  <CustomSelect
                    name=""
                    options={VoucherFiltersStatusPacient}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    iconStart={MdOutlinePerson}
                    startIcon
                    fullWidth
                    placeholder="Selecione status do Voucher Cliente"
                  />
                </div>
              </div>
            </div>
            <div className="mb-8 md:mb-0">
              {showSearchModal && (
                <SearchModal
                  clientData={searchModalData}
                  selectedStatus={selectedStatus}
                />
              )}
            </div>
            {showCustomTable && (
              <div>
                <CustomTable
                  rowId="id"
                  handleEditVoucherRow={handleEditVoucherRow}
                  rows={listVoucher}
                  columns={voucherListTable.columns}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Voucher;
