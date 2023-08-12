import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.nav`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.secondary.main};
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
  font-size: 0.8rem;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 0.8rem 0;
`;

export const SidebarWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  gap: .4rem;
`;

export const SidebarButton = styled(motion.div)`
  position: relative;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
`;

export const ItemCounter = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  background: ${props => props.theme.colors.red.main};
  color: ${props => props.theme.colors.secondary.main};
  border-radius: 4px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  font-weight: 500;
`;

export const DrawerBackdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary[600]};
  z-index: 1000;
`;

export const DrawerContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.colors.secondary.main};
  z-index: 1000;
`;

export const DrawerCloseButton = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.4rem;
`;

export const DrawerContents = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: 100%;

  ${(props) => props.theme.sizes.mobile} {
    width: 20rem;
  }
`;

export const DrawerBody = styled.div`
  flex: 1;
`;

export const DrawerAction = styled(motion.div)`
  cursor: pointer;
  padding: 1rem 1.2rem;
  transition: 0.3s;

  &:hover {
    letter-spacing: 0.4rem;
    background: ${(props) => props.theme.colors.primary[50]};
  }

  &:active {
    background: ${(props) => props.theme.colors.primary[100]};
  }
`;

export const Line = styled.span`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[300]};
  margin-top: 2rem;
`;

export const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

export const HelpContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: .4rem;
  padding-top: 1rem;
  list-style: none;
`;

export const HelpOption = styled.li`
  padding: .8rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.primary[200]};
  transition: .2s;
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 10rem;
  outline: none;
  border-radius: 4px;
  padding: .8rem;
  margin: .4rem 0;
  font-family: inherit;
  font-weight: 300;
  border: 1px solid ${props => props.theme.colors.primary[200]};
`;

export const DrawerFooter = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${props => props.theme.colors.primary[200]};
`; 

export const InstagramButton = styled.button`
  min-width: 6rem;
  cursor: pointer;
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 2.4rem;
  padding: 0.8rem;
  margin: 0.8rem;
  border-radius: 4px;
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  & > svg {
    font-size: 1.8rem;
  }

  // &:before {
  //   position: absolute;
  //   content: "";
  //   border-radius: 8px;
  //   width: calc(100% + .2rem);
  //   height: calc(100% + .2rem);
  //   filter: blur(1px);
  //   z-index: -1;
  //   background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  // }

  // &:after {
  //   position: absolute;
  //   content: "";
  //   border-radius: 6px;
  //   width: 100%;
  //   height: 100%;
  //   z-index: -1;
  //   background: ${props => props.theme.colors.secondary.main};
  // }
`;
