import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { firestore } from "@/lib/firebase";
import { UserContext } from "@/lib/context";
import { prefix } from "@/api/index";
import { theme, GlobalStyle } from "@/shared/theme";
import { IUserDetails } from "@/shared/interfaces";
import Layout from "@/components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<IUserDetails | {}>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = doc(firestore, prefix + "Users", user.uid);
      unsubscribe = onSnapshot(ref, (snapshot) => {
        const data: any = snapshot.data();
        setUserDetails(data);
        setLoading(false);
      });
    } else if (typeof window !== "undefined") {
      handleUpdateItems();
      const listenStorageChange = () => {
        handleUpdateItems();
      };
      setLoading(false);
      window.addEventListener("storage", listenStorageChange);
      return () => window.removeEventListener("storage", listenStorageChange);
    }
  }, [user, loading]);

  const handleUpdateItems = () => {
    const guestItems = localStorage.getItem("items");
    if (guestItems) {
      const guest = { items: JSON.parse(guestItems) };
      setUserDetails(guest);
    }
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{
            user: userDetails,
            isAuthenticated: !!user,
            loading,
            setLoading,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}
