import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import CustomSelect from "../select/Select";
import CustomTable from "../table/CustomTable";

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
import useDataStorage from "@/hooks/useDataStorage";
import InputMask from "react-input-mask";
import { VoucherListTable } from "@/helpers/VoucherListTable";

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
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const useData = useDataStorage();
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
    if (filterName === "voucherTypes" && value === "All") {
      value = "";
    }
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  const handleEditVoucherRow = useCallback((voucher: any) => {
    setEditVoucherData(voucher);
    editVoucher.onOpen();
  }, []);

  const getVoucherData = useCallback(() => {
    const voucherTypeFilter =
      filters.voucherTypes === "All" ? "" : filters.voucherTypes;

    getListVoucher({ ...filters, voucherTypes: voucherTypeFilter }).then(
      (response) => {
        response.sort((a: any, b: any) => {
          const dateA = new Date(a.createdDate);
          const dateB = new Date(b.createdDate);
          return dateB.getTime() - dateA.getTime();
        });
        setListVoucher(response);
      }
    );
  }, [filters]);

  useEffect(() => {
    getVoucherData();
  }, [getVoucherData, useData.refresh, filters]);

  useEffect(() => {
    setIsLoading(true);
    getVoucherTypes()
      .then((response) => {
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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [useData.refresh]);

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

  const maskedCpf = () => {
    return (
      <InputMask
        maxLength={14}
        name="cpf"
        mask="999.999.999-99"
        alwaysShowMask
        maskPlaceholder={null}
        value={searchCpf}
        onChange={handleCpfChange}
      >
        <Input
          placeholder="Digite o CPF do cliente"
          startIcon
          imageSrc="/search-icon.png"
          onEnter={handleSearchClient}
        />
      </InputMask>
    );
  };

  const refreshTableData = () => {
    setRefreshTable(true);
  };

  return (
    <>
      {registerVoucher.isOpen && (
        <RegisterVoucher refreshTable={refreshTableData} />
      )}
      {editVoucher.isOpen && <EditVoucher refreshTable={refreshTableData} />}
      {!registerVoucher.isOpen && !editVoucher.isOpen && (
        <div className="md:w-full fade-in mb-5">
          <div className=" md:grid md:grid-cols-4 rounded-lg">
            <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
              <div className="border-careDarkBlue border-r-[2px] text-careDarkBlue">
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
                  value={filters.voucherTypes}
                  imageSrc="/voucher-icon.png"
                  startIcon
                  fullWidth
                  name="voucherTypes"
                  options={[{ id: "", value: "Todos" }, ...voucherTypesOptions]}
                  placeholder="Selecione o tipo de Voucher"
                  onChange={(e) =>
                    handleFilterChange("voucherTypes", e.target.value as string)
                  }
                />
                <CustomSelect
                  value={filters.status}
                  imageSrc="/status-voucher-icon.png"
                  startIcon
                  fullWidth
                  name="status"
                  placeholder="Selecione status do Voucher"
                  options={[
                    { id: "", value: "Todos" },
                    ...VoucherFiltersStatus,
                  ]}
                  onChange={(e) =>
                    handleFilterChange("status", e.target.value as string)
                  }
                />
                <CustomSelect
                  value={filters.deadlineInDays}
                  imageSrc="/time-voucher.png"
                  startIcon
                  fullWidth
                  name="deadlineInDays"
                  placeholder="Período do Voucher"
                  options={[
                    { id: "", value: "Todos" },
                    ...VoucherFiltersPeriod,
                  ]}
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
              <div className=" mb-8 md:mb-0 grid-cols-1 md:grid md:grid-cols-3 gap-6">
                <div className="col-span-2">{maskedCpf()}</div>
                <div>
                  <CustomSelect
                    name=""
                    options={[
                      { id: "", value: "Todos" },
                      ...VoucherFiltersStatusPacient,
                    ]}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    imageSrc="/user-user.png"
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
                  refreshTable={refreshTableData}
                  clientData={searchModalData}
                  selectedStatus={selectedStatus}
                />
              )}
            </div>
          </div>
          {showCustomTable && (
            <div className="lg:w-full w-[21rem]">
              <CustomTable
                isLoading={isLoading}
                rowId="number"
                handleEditVoucherRow={handleEditVoucherRow}
                rows={listVoucher}
                columns={VoucherListTable.columns}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Voucher;
