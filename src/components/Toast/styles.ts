import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const ToastContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.primary[300]};
  background: ${(props) => props.theme.colors.secondary.main};
  box-shadow: 0 2px 8px -4px ${(props) => props.theme.colors.primary[100]},
    0 1px 2px ${(props) => props.theme.colors.primary[50]};
`;
