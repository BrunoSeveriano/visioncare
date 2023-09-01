import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ClientOnly from "@/helpers/ClientOnly";
import OnboardModal from "@/components/modals/OnboardModal";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default function App({ Component, pageProps }: AppProps) {
  const loginData = useLogin();
  const router = useRouter();
  const avaiableRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/confirmation",
    "/new-password",
    "/",
  ];

  useEffect(() => {
    if (router.pathname === "/_error") {
      router.push("/login");
    }
    if (!loginData.isLogged && !avaiableRoutes.includes(router.pathname)) {
      router.push("/");
    }
    if (loginData.isLogged && avaiableRoutes.includes(router.pathname)) {
      router.push("/dashboard/home");
    }
  }, [loginData.isLogged, router]);

  return (
    <ClientOnly>
      <OnboardModal />
      {loginData.isLogged ? (
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      ) : (
        <Component {...pageProps} />
      )}
    </ClientOnly>
  );
}
