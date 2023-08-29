import React, { useCallback, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { MdOutlinePerson } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import CustomSelect from "../select/Select";
import CustomTable from "../table/CustomTable";
import SearchModal from "../modals/SearchModal";
import useRegisterVoucher from "@/hooks/useRegisterVoucher";
import useEditVoucher from "@/hooks/useEditVoucher";
import {
  getListAllPatients,
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
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { TableMockupPartiner } from "@/helpers/TableMockupPartiner";
import useRegisterPartiner from "@/hooks/useRegisterPartiner";
import { listPartiner } from "@/services/partiner";
import useEditPartiner from "@/hooks/useEditPartiner";
import useDataStoragePartiner from "@/hooks/useDataStoragePartiner";
import { TableMockupAllPacient } from "@/helpers/TableMockupAllPacient";
import ExportToExcel from "../button/ExportToExcel";
import CardsDashboardAdmin from "../cards/CardsDashboardAdmin";
import useDataStorage from "@/hooks/useDataStorage";
import InputMask from "react-input-mask";
import { VoucherListTableDashboard } from "@/helpers/VoucherListTableDashboard";
import { TableMockupPartinerDashboard } from "@/helpers/TableMockupPartinerDashboard";
import ExportToCSV from "../button/ExportToCSV";

const DashboardAdmin = () => {
  const registerVoucher = useRegisterVoucher();
  const editVoucher = useEditVoucher();
  const useData = useDataStorage();
  const [editVoucherData, setEditVoucherData] = useState<any>({});
  const [voucherTypesOptions, setVoucherTypesOptions] = useState([{}]);
  const [listVoucher, setListVoucher] = useState<any[]>([]);
  const [searchCpf, setSearchCpf] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showCustomTableVoucher, setShowCustomTableVoucher] = useState(false);
  const [showCustomTable, setShowCustomTable] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showTimeLine, setShowTimeLine] = useState(false);
  const [searchModalData, setSearchModalData] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<{
    voucherTypes: string;
    status: string;
    deadlineInDays: string;
  }>({
    voucherTypes: "",
    status: "",
    deadlineInDays: "",
  });

  const editPartiner = useEditPartiner();
  const partiner = useRegisterPartiner();
  const dataStoragePartiner = useDataStoragePartiner();
  const [partinerList, setPartinerList] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [showCustomTablePartiner, setShowCustomTablePartiner] = useState(false);
  const [patientList, setPatientList] = useState<any[]>([{}]);
  const [showCustomTablePatient, setShowCustomTablePatient] = useState(false);

  const filterValueRef = useRef<string>(filterValue);
  filterValueRef.current = filterValue;

  const filterPartiners = useCallback(
    (partinerList: any[], filterValue: string) => {
      if (!filterValue) {
        return partinerList;
      }
      const filterValueLowerCase = filterValue.toLowerCase();
      return partinerList.filter((partiner) => {
        const friendlyCodeMatch =
          partiner.friendlyCode?.toLowerCase().includes(filterValueLowerCase) ||
          false;
        const mainContactMatch =
          partiner.mainContact?.toLowerCase().includes(filterValueLowerCase) ||
          false;
        return friendlyCodeMatch || mainContactMatch;
      });
    },
    []
  );

  const getPartinerData = useCallback(() => {
    setIsLoading(true);
    const filters = {
      friendlyCode: filterValueRef.current,
      mainContact: filterValueRef.current,
    };

    listPartiner(filters)
      .then((partiners) => {
        setPartinerList(partiners);
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de parceiros:", error);
      })
      .finally(() => {
        setIsLoading(false);
        if (refreshTable) {
          setRefreshTable(false);
        }
      });
  }, [refreshTable, useData.refresh]);

  useEffect(() => {
    getPartinerData();
  }, [getPartinerData]);

  const filteredPartinerList = filterPartiners(partinerList, filterValue);

  const showAllPartiner = () => {
    setShowCustomTablePartiner(!showCustomTablePartiner);
    setShowCustomTableVoucher(false);
    setShowCustomTablePatient(false);
    setShowCustomTablePartiner(true);
  };

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

  const handleEditVoucherRow = useCallback(
    (voucher: any) => {
      setEditVoucherData(voucher);
      editVoucher.onOpen();
    },
    [editVoucher]
  );

  const getVoucherData = useCallback(() => {
    const voucherTypeFilter =
      filters.voucherTypes === "All" ? "" : filters.voucherTypes;

    getListVoucher({ ...filters, voucherTypes: voucherTypeFilter }).then(
      (response) => {
        setListVoucher(response);
      }
    );
  }, [refreshTable, filters, useData.refresh]);

  useEffect(() => {
    getVoucherData();
  }, [getVoucherData]);

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
  }, [refreshTable, useData.refresh]);

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

  const showAllVoucher = () => {
    setShowCustomTableVoucher(!showCustomTableVoucher);
    setShowCustomTableVoucher(true);
    setShowCustomTablePatient(false);
    setShowCustomTablePartiner(false);
  };

  const showTimeLineFunction = () => {
    setShowTimeLine(!showTimeLine);
  };

  const getAllPatients = useCallback(() => {
    getListAllPatients().then((response) => {
      setPatientList(response);
    });
  }, []);

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  const showAllPatient = () => {
    setShowCustomTablePatient(!showCustomTablePatient);
    setShowCustomTableVoucher(false);
    setShowCustomTablePatient(true);
    setShowCustomTablePartiner(false);
  };

  const handleCleanInputsAndCheckboxes = () => {
    setShowCustomTableVoucher(false);
    setShowCustomTablePatient(false);
    setShowCustomTablePartiner(false);
    setShowSearchModal(false);
    setShowTimeLine(false);
    setSearchCpf("");
    setSelectedStatus("");
    setFilterValue("");
    setFilters({
      voucherTypes: "",
      status: "",
      deadlineInDays: "",
    });
  };

  const refreshTableData = () => {
    setRefreshTable(true);
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
          placeholder="Buscar cliente pelo CPF"
          startIcon
          iconStart={BsSearch}
          onEnter={handleSearchClient}
        />
      </InputMask>
    );
  };

  return (
    <>
      <div className="w-3/5 md:w-full fade-in">
        <div className=" md:grid md:grid-cols-4 rounded-lg">
          <div className="bg-careGrey col-span-3 rounded-md p-2 flex items-center">
            <div className="border-careDarkBlue border-r-[2px] text-careDarkBlue">
              <AiOutlineInfoCircle className="mr-3" size="2rem" />
            </div>
            <span className="pl-5 text-careDarkBlue">
              Ao clicar em INICIAR, a informação será exportada via CSV.​
            </span>
          </div>
          <div className="mt-2 md:ml-10 mb-2">
            <ExportToCSV
              rows={patientList}
              label="Exportar Planilha"
              className="bg-careBlue border-careBlue text-white py-2"
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-1 gap-8 my-2 fill-careBlue mt-10">
          <div>
            <span className="text-2xl text-careLightBlue">
              Localizar Voucher
            </span>
            <div className="sm:grid-cols-1 md:grid md:grid-cols-4 gap-6">
              <CustomSelect
                fullWidth
                value={filters.voucherTypes}
                name="voucherTypes"
                options={[{ id: "", value: "Todos" }, ...voucherTypesOptions]}
                placeholder="Selecione o tipo de Voucher"
                onChange={(e) =>
                  handleFilterChange("voucherTypes", e.target.value as string)
                }
              />
              <CustomSelect
                fullWidth
                value={filters.status}
                name="status"
                placeholder="Selecione status do Voucher"
                options={[{ id: "", value: "Todos" }, ...VoucherFiltersStatus]}
                onChange={(e) =>
                  handleFilterChange("status", e.target.value as string)
                }
              />
              <CustomSelect
                fullWidth
                value={filters.deadlineInDays}
                name="deadlineInDays"
                placeholder="Período do Voucher"
                options={[{ id: "", value: "Todos" }, ...VoucherFiltersPeriod]}
                onChange={(e) =>
                  handleFilterChange("deadlineInDays", e.target.value as string)
                }
              />
              <div className="flex items-center">
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={showCustomTableVoucher}
                  onChange={showAllVoucher}
                  sx={{
                    color: "#0089c9",
                    "&.Mui-checked": {
                      color: "#753BBD",
                    },
                  }}
                />
                <span className="text-careBlue">Todos</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-1 my-2  fill-careBlue mt-5">
          <div>
            <span className="text-2xl text-careLightBlue">
              Localizar Cliente
            </span>
            <div className=" mb-8 md:mb-0 sm:grid-cols-1 md:grid md:grid-cols-3 gap-6">
              <div className="col-span-1">{maskedCpf()}</div>
              <div>
                <CustomSelect
                  name=""
                  options={[
                    { id: "", value: "Todos" },
                    ...VoucherFiltersStatusPacient,
                  ]}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  iconStart={MdOutlinePerson}
                  startIcon
                  fullWidth
                  placeholder="Selecione status do Voucher Cliente"
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={showCustomTablePatient}
                  onChange={showAllPatient}
                  sx={{
                    color: "#0089c9",
                    "&.Mui-checked": {
                      color: "#753BBD",
                    },
                  }}
                />
                <span className="text-careBlue">Novos Cadastrados</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col-reverse md:flex md:flex-row md:justify-between">
              <span className="text-3xl text-careLightBlue my-3 md:my-0">
                Localizar Parceiro
              </span>
            </div>

            <div className="fill-careBlue md:fill-careBlue mb-5 sm:grid-cols-1 md:grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <Input
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Buscar parceiro pelo Nome / ID"
                  iconStart={BsSearch}
                  startIcon
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<RadioButtonCheckedIcon />}
                  checked={showCustomTablePartiner}
                  onChange={showAllPartiner}
                  sx={{
                    color: "#0089c9",
                    "&.Mui-checked": {
                      color: "#753BBD",
                    },
                  }}
                />
                <span className="text-careBlue">Todos</span>
              </div>
            </div>
            <div className="flex justify-start gap-2 mt-10 mb-10">
              <div>
                <Button
                  onClick={handleCleanInputsAndCheckboxes}
                  customClass="md:w-full border-careBlue text-careBlue p-10 py-2"
                  label="Limpar"
                />
              </div>
              <div>
                <Button
                  onClick={showTimeLineFunction}
                  customClass="md:w-full bg-careGreen border-careGreen p-10 py-2"
                  label="Iniciar"
                />
              </div>
            </div>
            {showTimeLine && (
              <div className="w-full mb-10">
                <CardsDashboardAdmin />
              </div>
            )}

            {showCustomTablePartiner && (
              <div className="mb-8 md:mb-0 fade-in">
                <div>
                  <CustomTable
                    isLoading={isLoading}
                    rowId="friendlyCode"
                    rows={filteredPartinerList}
                    columns={TableMockupPartinerDashboard.columns}
                  />
                </div>
              </div>
            )}
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
          {showCustomTable && showCustomTableVoucher && (
            <div className="fade-in">
              <CustomTable
                isLoading={isLoading}
                rowId="id"
                handleEditVoucherRow={handleEditVoucherRow}
                rows={listVoucher}
                columns={VoucherListTableDashboard.columns}
              />
            </div>
          )}
          {showCustomTablePatient && (
            <div className="fade-in mt-5">
              <CustomTable
                isLoading={isLoading}
                rowId="id"
                rows={patientList}
                columns={TableMockupAllPacient.columns}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
