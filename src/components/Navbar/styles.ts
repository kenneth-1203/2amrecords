import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.nav`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${props => props.theme.colors.secondary.main};
`;

export const NavbarContainer = styled.div`
  color: ${(props) => props.theme.colors.primary.main};
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  // box-shadow: 0 2px 4px 0 ${(props) => props.theme.colors.primary[100]},
  //   0 1px 2px 0 ${(props) => props.theme.colors.primary[50]};
`;

export const NavbarTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarTitle = styled.div`
  letter-spacing: 0.2rem;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const NavbarSubtitle = styled.div`
  text-align: center;
  font-size: .8rem;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 4rem;
  justify-content: space-between;
`;

export const DrawerBackdrop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary[600]};
  z-index: 1000;
`;

export const DrawerContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  height: 100%;
  width: 20rem;
  background: ${(props) => props.theme.colors.secondary.main};
  z-index: 1000;
`;

export const DrawerContents = styled.div`
  overflow: hidden;
  width: 20rem;
  padding: 1.2rem;
`;

export const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DrawerAction = styled(motion.div)`
  cursor: pointer;
`;

export const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;