import type { AppProps, AppContext } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import buildClient from "../api/buildClient";
import { AxiosResponse } from "axios";
import Header from "../components/Header";

interface CurrentUser {
  email: string;
  id: string;
}

interface CustomAppProps extends AppProps {
  currentUser?: CurrentUser;
}
function MyApp({ Component, pageProps, currentUser }: CustomAppProps) {
  return (
    <Provider store={store}>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = (await client.get(
    "/api/users/currentuser"
  )) as AxiosResponse<CurrentUser>;

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
