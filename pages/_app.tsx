import type { AppProps } from "next/app";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";

import "@/styles/global.css";
import { createElement } from "react";
import { AppProvider } from "context/AppProvider";

setup(createElement, prefix);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default App;
