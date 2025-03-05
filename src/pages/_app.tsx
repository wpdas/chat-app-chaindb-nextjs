import Providers from "./providers";

// Importação condicional apenas no lado do servidor
// if (typeof window === "undefined") {
//   // Importa o módulo de inicialização apenas no lado do servidor
//   require("@app/database/init");
// }

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.JSX.ElementType;
  pageProps: any;
}) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
