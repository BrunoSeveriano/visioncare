import { FaRegCommentDots, FaUserFriends } from "react-icons/fa";
import { RiHome6Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { TbMapSearch } from "react-icons/tb";
import { MdOutlineLocationOn, MdOutlineInfo } from "react-icons/md";

export const homeMenuPacient = [
  {
    route: "home",
    icon: RiHome6Line,
    path: "/home2.png",
    text: "Início",
    active: true,
  },
  {
    route: "patient-voucher",
    icon: FaUserFriends,
    path: "/cardDashboard.png",
    text: "Meus Vouchers",
    active: false,
  },
  {
    route: "scheduling",
    icon: RxCalendar,
    path: "/scheduling.png",
    text: "Agendamento",
    active: false,
  },
  {
    route: "talk-to-specialist",
    icon: FaRegCommentDots,
    path: "/talk-to-specialist.png",
    text: "Falar com Especialista",
    active: false,
  },
  {
    route: "user-guide",
    icon: TbMapSearch,
    path: "/user-guide.png",
    text: "Guia do Usuário",
    active: false,
  },
  {
    route:
      "https://www.acuvue.com.br/guia-de-compra/onde-comprar-lentes-de-contato",
    icon: MdOutlineLocationOn,
    path: "/find.png",
    text: "Onde Encontrar",
    active: false,
  },
  {
    route: "https://www.youtube.com/watch?v=5QXd1w3KWR0",
    icon: MdOutlineInfo,
    path: "/about.png",
    text: "Sobre o Programa",
    active: false,
  },
];
