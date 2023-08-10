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
    text: "Início",
    active: true,
  },
  {
    route: "voucher",
    icon: RiFileList3Line,
    text: "Vouchers",
    active: false,
  },
  {
    route: "register-partiner",
    icon: HiOutlineUserCircle,
    text: "Cadastrar parceiros",
    active: false,
  },
  {
    route: "dashboard-admin",
    icon: CiGrid42,
    text: "Dashborad",
    active: false,
  },
  {
    route: "order-purchase",
    icon: AiOutlineInbox,
    text: "Pedidos de compra",
    active: false,
  },
];
