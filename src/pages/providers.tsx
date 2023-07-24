"use client";

import React from "react";
import AuthProvider from "@app/contexts/AuthProvider";
import RoomsProvider from "@app/contexts/RoomsProvider";
// import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <CacheProvider>
    <AuthProvider>
      <RoomsProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </RoomsProvider>
    </AuthProvider>
    // </CacheProvider>
  );
}

export default Providers;
