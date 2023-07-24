"use client";

import RoomsProvider from "@app/contexts/RoomsProvider";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

// NOTE: ISSO AQUI NAO TA SENDO USADO. UAII!!!

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <RoomsProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </RoomsProvider>
    </CacheProvider>
  );
}
