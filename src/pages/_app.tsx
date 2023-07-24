import RoomsProvider from "@app/contexts/RoomsProvider";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.JSX.ElementType;
  pageProps: any;
}) => {
  return (
    <ChakraProvider>
      <RoomsProvider>
        <Component {...pageProps} />
      </RoomsProvider>
    </ChakraProvider>
  );
};

export default MyApp;
