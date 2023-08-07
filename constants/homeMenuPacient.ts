import { FaRegCommentDots, FaUserFriends } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { TbMapSearch } from "react-icons/tb";
import { MdOutlineLocationOn, MdOutlineInfo } from "react-icons/md";

export const homeMenuPacient = [
  {
    route: "home",
    icon: RiHome6Line,
    text: "Início",
    active: true,
  },
  {
    route: "patient-voucher",
    icon: FaUserFriends,
    text: "Meus Vouchers",
    active: false,
  },
  {
    route: "/",
    icon: RxCalendar,
    text: "Agendamento",
    active: false,
  },
  {
    icon: FaRegCommentDots,
    text: "Falar com Especialista",
    active: false,
  },
  {
    route: "/",
    icon: TbMapSearch,
    text: "Guia do Usuário",
    active: false,
  },
  {
    route: "/",
    icon: MdOutlineLocationOn,
    text: "Onde Encontrar",
    active: false,
  },
  {
    route: "/",
    icon: MdOutlineInfo,
    text: "Sobre o Programa",
    active: false,
  },
];
