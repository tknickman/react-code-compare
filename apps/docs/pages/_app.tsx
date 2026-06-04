import type { AppProps } from "next/app";
import { CodeCompareProvider } from "react-code-compare";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CodeCompareProvider>
      <Component {...pageProps} />
    </CodeCompareProvider>
  );
}
