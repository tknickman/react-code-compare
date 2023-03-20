import type { AppProps } from "next/app";
import { CodeCompare } from "react-code-compare";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CodeCompare>
      <Component {...pageProps} />
    </CodeCompare>
  );
}
