import Button from "@/components/button/Button";
import ButtonEditVoucher from "@/components/button/ButtonEditVoucher";
import { format } from "date-fns";

export interface Rows {
  registerDate: string;
  idCampaign: string;
  service: string;
  time: string;
  status: string;
  actions: string;
}

export const voucherListTable: TableData = {
  columns: [
    {
      field: "createdDate",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle-borderLeft",
      sortable: false,
      renderCell: (params: any) => {
        const formattedDate = format(new Date(params.value), "dd/MM/yyyy");
        return (
          <div
            style={{
              paddingLeft: "5px",
            }}
          >
            {formattedDate}
          </div>
        );
      },
    },
    {
      field: "number",
      headerName: "ID Campanha",
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
      minWidth: 95,
    },
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
      field: "status",
      headerName: "Status",
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
              label="Válido"
              customClass="bg-careGreen border-careGreen w-full py-2 text-sm"
            />
          )}
          {params.value === "389dfdad-0999-4eac-9bf5-e7ef4a4fd5c2" && (
            <Button
              disableHover
              label="Expirado"
              customClass="bg-careYellow border-careYellow w-full py-2 text-sm"
            />
          )}
          {params.value === "2522f876-15c9-4570-ae76-c88f09ec014d" && (
            <Button
              disableHover
              label="Cancelado"
              customClass="bg-careDarkPurple border-careDarkPurple w-full py-2 text-sm"
            />
          )}
          {params.value === "24c3dd75-0ba6-459b-8b4c-f6bc77ea3713" && (
            <Button
              disableHover
              label="Utilizado"
              customClass="bg-carePlaceholder border-carePlaceholder w-full py-2 text-sm"
            />
          )}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle-borderRight",
      sortable: false,
      minWidth: 95,
      flex: 1,

      renderCell: (params: any) => (
        <div className="w-full">
          <ButtonEditVoucher
            voucher={params.row}
            disableHover
            label="Ver mais"
            customClass="bg-careDarkBlue border-careDarkBlue w-full py-2 text-sm"
          />
        </div>
      ),
    },
  ],

  rows: [
    {
      registerDate: "29/11/2021",
      idCampaign: "#0001",
      service: "VOUCHER PRIMEIRO CADASTRO",
      time: "30 dias",
      status: "Válido",
      actions: "Editar",
    },
    {
      registerDate: "08/11/2021",
      idCampaign: "#0002",
      service: "COMBO LEVE 4 PAGUE 3",
      time: "30 dias",
      status: "Expirado",
      actions: "Editar",
    },
    {
      registerDate: "05/11/2021",
      idCampaign: "#0003",
      service: "COMBO LEVE 4 PAGUE 3",
      time: "60 dias",
      status: "Cancelado",
      actions: "Editar",
    },
    {
      registerDate: "02/11/2021",
      idCampaign: "#0004",
      service: "VOUCHER ESPECIAL",
      time: "30 dias",
      status: "Válido",
      actions: "Editar",
    },
    {
      registerDate: "02/11/2021",
      idCampaign: "#0005",
      service: "VOUCHER GOLD até 30% OFF",
      time: "60 dias",
      status: "Cancelado",
      actions: "Editar",
    },
    {
      registerDate: "20/07/2023",
      idCampaign: "#0006",
      service: "Exemplo Lorem Ipsum",
      time: "30 dias",
      status: "Expirado",
      actions: "Editar",
    },
    {
      registerDate: "20/07/2023",
      idCampaign: "#0007",
      service: "Exemplo Lorem Ipsum",
      time: "30 dias",
      status: "Expirado",
      actions: "Editar",
    },
    {
      registerDate: "20/07/2023",
      idCampaign: "#0008",
      service: "Exemplo Lorem Ipsum",
      time: "30 dias",
      status: "Cancelado",
      actions: "Editar",
    },
    {
      registerDate: "20/07/2023",
      idCampaign: "#0009",
      service: "Exemplo Lorem Ipsum",
      time: "30 dias",
      status: "Válido",
      actions: "Editar",
    },
    {
      registerDate: "20/07/2023",
      idCampaign: "#00010",
      service: "Exemplo Lorem Ipsum",
      time: "30 dias",
      status: "Válido",
      actions: "Editar",
    },
  ],
};
