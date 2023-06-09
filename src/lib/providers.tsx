"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session;
}

function Providers({ children, session }: ProvidersProps) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
