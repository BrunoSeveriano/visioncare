import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { GiTakeMyMoney } from "react-icons/gi";

export const homeMenuPdv = [
  {
    route: "home",
    icon: RiHome6Line,
    path: "/home2.png",
    text: "Início",
    active: true,
  },
  {
    route: "scheduling-ecp",
    icon: RxCalendar,
    path: "/scheduling.png",
    text: "Agendamento",
    active: false,
  },
  {
    route: "",
    icon: GiTakeMyMoney,
    path: "/reimbursement.png",
    text: "Reembolso",
    active: false,
  },
];
