import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: fixed;
  top: 40px;
  z-index: 1000;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const ToastContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.secondary.main};
  box-shadow: 0 2px 8px -4px ${(props) => props.theme.colors.primary[500]},
    0 1px 2px ${(props) => props.theme.colors.primary[100]};
`;

export const ToastProgress = styled(motion.span)<{ type: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  background: ${({ type }) =>
    type === "success"
      ? css`
          ${(props) => props.theme.colors.green.main}
        `
      : type === "warning"
      ? css`
          ${(props) => props.theme.colors.yellow.main}
        `
      : type === "error"
      ? css`
          ${(props) => props.theme.colors.red.main}
        `
      : css`
          ${(props) => props.theme.colors.primary.main}
        `};
  width: 100%;
`;
