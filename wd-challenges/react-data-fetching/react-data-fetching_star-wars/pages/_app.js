import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: async (resource, init) => {
            const res = await fetch(resource, init);

            // If the status code is not in the range 200-299,
            // we still try to parse and throw it.
            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data.",
              );
              // Attach extra info to the error object.
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }

            return res.json();
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
