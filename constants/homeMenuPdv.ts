import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

export const homeMenuPdv = [
  {
    route: "home",
    icon: RiHome6Line,
    text: "Início PDV",
    active: true,
  },
  {
    route: "",
    icon: FaUserFriends,
    text: "Validar Vouchers PDV",
    active: false,
  },
  {
    route: "",
    icon: RxCalendar,
    text: "Agendamento PDV",
    active: false,
  },
  {
    route: "",
    icon: GiTakeMyMoney,
    text: "Reembolso PDV",
    active: false,
  },
];
