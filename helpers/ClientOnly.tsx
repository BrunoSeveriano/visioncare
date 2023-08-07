"use client";

interface ClientOnlyProps {
  children: React.ReactNode;
}

import Head from "next/head";
import { useState, useEffect } from "react";

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div>
      <Head>
        <title>MyAcuvue</title>
      </Head>
      {children}
    </div>
  );
};

export default ClientOnly;
