import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

export const homeMenuEcp = [
  {
    route: "home",
    icon: RiHome6Line,
    text: "Início",
    active: true,
  },
  {
    route: "",
    icon: FaUserFriends,
    text: "Validar Vouchers",
    active: false,
  },
  {
    route: "",
    icon: RxCalendar,
    text: "Agendamento",
    active: false,
  },
  {
    route: "",
    icon: GiTakeMyMoney,
    text: "Reembolso",
    active: false,
  },
];
