"use client";

import AuthProvider from "@app/contexts/AuthProvider";
import RoomsProvider from "@app/contexts/RoomsProvider";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

// NOTE: ISSO AQUI NAO TA SENDO USADO. UAII!!!

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <AuthProvider>
        <RoomsProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </RoomsProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
