import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import toast, { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { onMessageListener } from "../lib/firebase";
import Header from "../components/Header";
import localforage from "localforage";
import EventToast from "../components/EventToast";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    const setToken = () => {
      const token = localforage.getItem("fcm_token");
      if (token) {
        console.log(token);
        onMessageListener()
          .then(payload => {
            toast.custom(t => <EventToast t={t} />);

            console.log(payload);
          })
          .catch(err => console.error(err));
      }
    };

    setToken();
  }, []);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider session={session}>
        <Header />
        <NextNProgress color="#d1d5db" options={{ showSpinner: false }} />
        <Toaster
          toastOptions={{
            style: { backgroundColor: "#333333", color: "#ffffff" },
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </SWRConfig>
  );
}

export default Application;
