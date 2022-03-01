import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "../styles/globals.css";
import { Spinner } from "../components/spinner/spinner.component";
import { HeaderComponent } from "../components/header/header.component";
import { buildClient } from "../api/build-client";
import Head from "next/head";
import { environment } from "../environment";

function MyApp({ Component, pageProps, currentUser }) {
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState(false);
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    router.events.on("routeChangeStart", () => setShowSpinner(true));
    router.events.on("routeChangeComplete", () => setShowSpinner(false));
    router.events.on("routeChangeError", () => setShowSpinner(false));
  }, []);

  return (
    <>
      <Head>
        <title>CRWN Clothing</title>
      </Head>
      <Provider store={store}>
        <div className="container-fluid">
          {showSpinner && <Spinner />}
          <HeaderComponent currentUser={currentUser} />
          <Component currentUser={currentUser} {...pageProps} />
          <div id="modal-root"></div>
        </div>
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const url = environment.NEXT_PUBLIC_API;
  const { data } = await client.get(`${url}/auth/current-user`);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  pageProps.initialReduxState = {
    currentUser: {
      user: data.currentUser,
      isFetching: false,
      error: undefined,
    },
  };

  if (data.currentUser) {
    pageProps.initialReduxState["cart"] = {
      cartItems: data.currentUser.currentCartItems,
      isCartDisplayed: false,
      cartOpsError: undefined,
    };
  }
  return { currentUser: data, pageProps };
};

export default MyApp;
