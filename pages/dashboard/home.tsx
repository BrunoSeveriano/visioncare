import CardAdmin from "@/components/cards/CardAdmin";
import CardPacient from "@/components/cards/CardPacient";
import CardEcp from "@/components/cards/CardEcp";

import useLogin from "@/hooks/useLogin";
import React from "react";
import CardPdv from "@/components/cards/CardPdv";

const Home = () => {
  const auth = useLogin();
  const userEmail = localStorage.getItem("email") || "";
  const isAdminUser = userEmail.endsWith("@its.jnj.com");
  const isEcpUser = auth.role === "Parceiro VisionCare";
  const isPdvUser = auth.role === "Partner POS VisionCare";

  return (
    <div className="fade-in">
      {isAdminUser ? (
        <CardAdmin />
      ) : isEcpUser ? (
        <CardEcp />
      ) : isPdvUser ? (
        <CardPdv />
      ) : (
        <CardPacient />
      )}
    </div>
  );
};

export default Home;
