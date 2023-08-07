import { create } from "zustand";

const useClientConfiguration = create(() => ({
  colors: {
    primary: "#6ee1dc",
  },
  images: {
    logo: "https://painelsite.viveo.com.br/wp-content/uploads/2022/12/logo_viveo-1536x864.png",
  },
}));

export default useClientConfiguration;
