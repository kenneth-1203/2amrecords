import styled from "styled-components";
import { motion } from "framer-motion";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary[900]};
  padding: 2rem 4rem;
  color: ${(props) => props.theme.colors.secondary[500]};
`;

export const FooterSection = styled(motion.div)`
  width: 28px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  gap: 0.4rem;
`;

export const FooterAbout = styled.div`
  width: 32rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  ${(props) => props.theme.sizes.mobile} {
    width: 100%;
  }
`;

export const SocialHandle = styled(motion.span)`
  background: linear-gradient(to right, #505DD1 0%, #F76D35 50%, #DB2E78 100%);
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  text-overflow: clip;
`;
