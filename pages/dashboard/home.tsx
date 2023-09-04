import CardAdmin from "@/components/cards/CardAdmin";
import CardPacient from "@/components/cards/CardPacient";
import CardEcp from "@/components/cards/CardEcp";

import useLogin from "@/hooks/useLogin";
import React from "react";
import CardPdv from "@/components/cards/CardPdv";

const Home = () => {
  const auth = useLogin();
  const isEcpUser = auth.role === "Partner ECP VisionCare";
  const isPdvUser = auth.role === "Partner POS VisionCare";
  const isPatientUser = auth.role === "Patient VisionCare";
  const isAdminUser = auth.role === "Admin JeJ - VisionCare";

  return (
    <div className="fade-in">
      {isAdminUser ? (
        <CardAdmin />
      ) : isEcpUser ? (
        <CardEcp />
      ) : isPdvUser ? (
        <CardPdv />
      ) : isPatientUser ? (
        <CardPacient />
      ) : null}
    </div>
  );
};

export default Home;
