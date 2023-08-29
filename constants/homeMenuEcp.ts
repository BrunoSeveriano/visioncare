import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

export const homeMenuEcp = [
  {
    route: "home",
    icon: RiHome6Line,
    path: '/home2.png',
    text: "Início",
    active: true,
  },
  {
    route: "validate-voucher",
    icon: FaUserFriends,
    path: '/cardDashboard.png',
    text: "Validar Vouchers",
    active: false,
  },
  {
    route: "scheduling-ecp",
    icon: RxCalendar,
    path: '/scheduling.png',
    text: "Agendamento",
    active: false,
  },
  {
    route: "reimbursement",
    icon: GiTakeMyMoney,
    path: '/reimbursement.png',
    text: "Reembolso",
    active: false,
  },
];
