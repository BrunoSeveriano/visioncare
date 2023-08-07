import React, { useEffect, useState, useCallback, useRef } from "react";
import Input from "../input/Input";
import CustomTable from "../table/CustomTable";
import { BsSearch } from "react-icons/bs";
import { TableMockupPartiner } from "@/helpers/TableMockupPartiner";
import Button from "../button/Button";
import CreatePartiner from "./CreatePartiner";
import useRegisterPartiner from "@/hooks/useRegisterPartiner";
import { listPartiner } from "@/services/partiner";
import useEditPartiner from "@/hooks/useEditPartiner";
import EditPartiner from "./EditPartiner";
import useDataStoragePartiner from "@/hooks/useDataStoragePartiner";

const RegisterPartiner = () => {
  const editPartiner = useEditPartiner();
  const partiner = useRegisterPartiner();
  const dataStoragePartiner = useDataStoragePartiner();
  const [partinerList, setPartinerList] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState("");

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

  const getPartinerData = useCallback(async () => {
    try {
      const filters = {
        friendlyCode: filterValueRef.current,
        mainContact: filterValueRef.current,
      };
      const partiners = await listPartiner(filters);
      setPartinerList(partiners);
    } catch (error) {
      console.error("Erro ao buscar a lista de parceiros:", error);
    }
  }, []);

  useEffect(() => {
    getPartinerData();
  }, [getPartinerData]);

  const filteredPartinerList = filterPartiners(partinerList, filterValue);

  return (
    <>
      {editPartiner.isOpen && <EditPartiner />}
      {partiner.isOpen && <CreatePartiner />}
      {!partiner.isOpen && !editPartiner.isOpen && (
        <div className="w-3/5 md:w-full fade-in">
          <div className="flex flex-col-reverse md:flex md:flex-row md:justify-between">
            <span className="text-3xl text-careLightBlue my-3 md:my-0">
              Localizar
            </span>
            <Button
              onClick={partiner.onOpen}
              label="Cadastrar Parceiro"
              customClass=" w-80 md:w-1/5 bg-careBlue border-careBlue text-white h-14 md:h-10 rounded-md text-sm "
            />
          </div>

          <div className="fill-careBlue mb-5 sm:grid-cols-1 md:grid md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Input
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Buscar parceiro pelo Nome / ID"
                iconStart={BsSearch}
                startIcon
              />
            </div>
          </div>
          <div className="mb-8 md:mb-0">
            <div>
              <CustomTable
                rowId="friendlyCode"
                rows={filteredPartinerList}
                columns={TableMockupPartiner.columns}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPartiner;
