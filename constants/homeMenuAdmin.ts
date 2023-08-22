import { CiGrid42 } from "react-icons/ci";
import {
  RiFileList3Line,
  RiHome6Line,
  RiLuggageCartLine,
} from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineInbox } from "react-icons/ai";

export const homeMenuAdmin = [
  {
    route: "home",
    icon: RiHome6Line,
    path: '/home2.png',
    text: "Início",
    active: true,
  },
  {
    route: "voucher",
    path: '/cardDashboard.png',
    text: "Vouchers",
    active: false,
  },
  {
    route: "register-partiner",
    path: '/user-guide.png',
    text: "Cadastrar parceiros",
    active: false,
  },
  {
    route: "dashboard-admin",
    path: '/user-guide.png',
    text: "Dashborad",
    active: false,
  },
  {
    route: "order-purchase",
    path: '/talk-to-specialist.png',
    text: "Pedidos de compra",
    active: false,
  },
];
