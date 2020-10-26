import App from "next/app";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  HttpLink,
} from "@apollo/client";
// import { appWithTranslation } from "../i18n";
import jwtDecode from "jwt-decode";
import theme from "../theme";
import { setTokens } from "../utils";

const cache = new InMemoryCache({
  addTypename: false,
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then(async (operation) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            operation.setContext({
              headers: {
                authorization: `bearer ${token}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const refreshAccessToken = async (uri, options) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const { exp } = jwtDecode(accessToken);
    if (Date.now() >= exp * 1000) {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await fetch(process.env.NEXT_PUBLIC_REFRESH, {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTokens(data.accessToken, data.refreshToken);
      options.headers.authorization = `bearer ${data.accessToken}`;
      return fetch(uri, options);
    } else {
      return fetch(uri, options);
    }
  } else {
    return fetch(uri, options);
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER,
      credentials: "same-origin",
      fetch: refreshAccessToken,
    }),
  ]),
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider options={{ initialColorMode: "light" }}>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default MyApp;
