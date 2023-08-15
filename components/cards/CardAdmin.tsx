import React from "react";
import ContentCard from "../card/ContentCard";
import router, { useRouter } from "next/router";

const CardAdmin = () => {
  const route = useRouter();

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-5 md:mb-5">
        <ContentCard
          onButtonClick={() => route.push("/dashboard/voucher")}
          svgIcon="/svg/v-card.svg"
          title="Vouchers"
          subtitle="Ative vouchers e cadastre campanhas.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() => route.push("/dashboard/register-partiner")}
          svgIcon="/svg/register-partner.svg"
          title="Cadastrar parceiros"
          subtitle="Canal exclusivo para cadastros de parceiros J&J.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() => route.push("/dashboard/dashboard-admin")}
          svgIcon="/svg/i-dashboard.svg"
          title="Dashboard"
          subtitle="Canal exclusivo para cadastros de parceiros J&J.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
        <ContentCard
          onButtonClick={() => route.push("/")}
          svgIcon="/svg/p-requests.svg"
          title="Pedidos de compra"
          subtitle="Canal exclusivo para cadastros de parceiros J&J.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careDarkBlue"
          hasIcon
        />
      </div>
    </div>
  );
};

export default CardAdmin;
