import Button from "@/components/button/Button";

export interface Rows {
  discountType: string;
  deadlineInDays: number;
  discountValue: number;
  status: string;
}

export const TableMockupPacient: TableData = {
  columns: [
    {
      field: "discountType",
      headerName: "Serviço",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "deadlineInDays",
      headerName: "Prazo",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: { value: any }) => `${params.value} dias`,
    },
    {
      field: "discountValue",
      headerName: "Valor",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: { value: any }) => `${params.value}%`,
    },
    {
      field: "status",
      headerName: "Ações",
      headerAlign: "center",
      minWidth: 95,
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      renderCell: (params: any) => (
        <div className={`w-full`}>
          {params.value === "20f3c61b-128c-4f11-9e5b-0fc47677f489" && (
            <Button
              disableHover
              label="Resgatar"
              customClass="bg-careGreen border-careGreen w-full py-2 text-sm"
            />
          )}
          {params.value === "389dfdad-0999-4eac-9bf5-e7ef4a4fd5c2" && (
            <Button
              disableHover
              label="Expirado"
              customClass="bg-careOrange border-careOrange w-full py-2 text-sm"
            />
          )}
          {params.value === "6b820a03-0da0-4e09-8948-452e4eadac1c" && (
            <Button
              disableHover
              label="Resgatado"
              customClass="bg-careYellow border-careYellow w-full py-2 text-sm"
            />
          )}
          {params.value === "24c3dd75-0ba6-459b-8b4c-f6bc77ea3713" && (
            <Button
              disableHover
              label="Utilizado"
              customClass="bg-carePurple border-carePurple w-full py-2 text-sm"
            />
          )}
        </div>
      ),
    },
  ],

  rows: [
    {
      status: "20f3c61b-128c-4f11-9e5b-0fc47677f489",
      deadlineInDays: "30 dias",
      discountValue: "R$ 100,00",
      discountType: "COMBO LEVE 4 PAGUE 3",
    },
  ],
};
