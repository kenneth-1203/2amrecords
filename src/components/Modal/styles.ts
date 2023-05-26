import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 100vh;
  z-index: 1000;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary[600]};
`;

export const ModalPopup = styled(motion.div)`
  min-width: 20rem;
  height: fit-content;
  margin: auto;
  background: ${(props) => props.theme.colors.secondary.main};
  border-radius: 4px;
  z-index: 1;
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;
