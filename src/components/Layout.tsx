import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
