import CardAdmin from "@/components/cards/CardAdmin";
import CardPacient from "@/components/cards/CardPacient";

const home = () => {
  const userEmail = localStorage.getItem("email") || "";
  const isAdminUser = userEmail.endsWith("@its.jnj.com");

  return (
    <div className="fade-in">
      {isAdminUser ? <CardAdmin /> : <CardPacient />}
    </div>
  );
};

export default home;
