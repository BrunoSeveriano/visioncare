import { format } from "date-fns";
export interface Rows {
  date: string;
  voucher: string;
  product: string;
  type: string;
  amount: string;
}

export const TableDataProduct: TableData = {
  columns: [
    {
      field: "date",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
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
      field: "voucher",
      headerName: "N / Voucher",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "product",
      headerName: "Produto bonificado",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo de promoção",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Quand. de cx bonificadas",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
  ],
  rows: [
    {
      date: "01/01/2021",
      voucher: "00000000",
      product: "Produto 1",
      type: "Tipo 1",
      amount: "1",
    },
  ],
};
