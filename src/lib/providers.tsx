"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <SessionProvider >{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
