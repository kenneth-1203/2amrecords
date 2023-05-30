import Head from "next/head";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Loading />
      {/* <Toast /> */}
      <Wrapper>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
