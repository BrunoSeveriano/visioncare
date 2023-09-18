import React from "react";
import ContentCard from "../card/ContentCard";
import router, { useRouter } from "next/router";
import ContentCardAdmin from "../card/ContentCardAdmin";

const CardAdmin = () => {
  const route = useRouter();

  return (
    <div>
      <div className="grid md:grid-cols-1 gap-y-3 lg:grid-cols-2 gap-x-4 mb-5 md:mb-5">
        <ContentCardAdmin
          onButtonClick={() => route.push("/dashboard/voucher")}
          svgIcon="/svg/v-card.svg"
          title="Vouchers"
          subtitle="Ative vouchers e cadastre campanhas.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
        <ContentCardAdmin
          onButtonClick={() => route.push("/dashboard/register-partiner")}
          svgIcon="/svg/register-partner.svg"
          title="Cadastrar parceiros"
          subtitle="Canal exclusivo para cadastros de parceiros J&J.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
        <ContentCardAdmin
          onButtonClick={() => route.push("/dashboard/dashboard-admin")}
          svgIcon="/svg/i-dashboard.svg"
          title="Dashboard"
          subtitle="Acompanhe informações e métricas relevantes​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
        <ContentCardAdmin
          onButtonClick={() => route.push("/dashboard/order-purchase")}
          svgIcon="/svg/p-requests.svg"
          title="Pedidos de compra"
          subtitle="Verifique informações dos pedidos de compra realizados.​"
          buttonText="Ver mais"
          textColor="text-white"
          bgColor="bg-careLightBlue"
          hasIcon
        />
      </div>
    </div>
  );
};

export default CardAdmin;
