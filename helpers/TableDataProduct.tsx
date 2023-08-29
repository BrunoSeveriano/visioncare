export interface Rows {
  data: string;
  number: string;
  product: string;
  promotion: string;
  quantity: string;
}

export const TableDataProduct: TableData = {
  columns: [
    {
      field: "data",
      headerName: "Data",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "number",
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
      field: "promotion",
      headerName: "Tipo de promoção",
      minWidth: 95,
      headerAlign: "center",
      align: "center",
      headerClassName: "columnTitle",
      sortable: false,
      flex: 1,
    },
    {
      field: "quantity",
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
      data: "10/10/2021",
      number: Math.random().toString(36),
      product: "Maria da Silva",
      promotion: "Maria da Silva",
      quantity: "Maria da Silva",
    },
    {
      data: "10/10/2021",
      number: Math.random().toString(36),
      product: "Maria da Silva",
      promotion: "Maria da Silva",
      quantity: "Maria da Silva",
    },
    {
      data: "10/10/2021",
      number: Math.random().toString(36),
      product: "Maria da Silva",
      promotion: "Maria da Silva",
      quantity: "Maria da Silva",
    },
    {
      data: "10/10/2021",
      number: Math.random().toString(36),
      product: "Maria da Silva",
      promotion: "Maria da Silva",
      quantity: "Maria da Silva",
    },
    {
      data: "10/10/2021",
      number: Math.random().toString(36),
      product: "Maria da Silva",
      promotion: "Maria da Silva",
      quantity: "Maria da Silva",
    },
  ],
};
