import styled from "styled-components";
import { motion } from "framer-motion";

export const LoadingWrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: ${(props) => props.theme.colors.secondary.main};
`;

export const LoadingText = styled(motion.h1)`
  letter-spacing: 0.2rem;
  font-weight: 700;
  font-size: 1.8rem;
  background-image: linear-gradient(
    120deg,
    ${(props) => props.theme.colors.primary[900]} 0%,
    ${(props) => props.theme.colors.primary[50]} 10%,
    ${(props) => props.theme.colors.primary[400]} 90%
  );
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
`;
