import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Notification from "../components/notification/notiofication";
import NotificationContext from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContext>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <Notification title="test" message="test" status="test" />
      </Layout>
    </NotificationContext>
  );
}

export default MyApp;
