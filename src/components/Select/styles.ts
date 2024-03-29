import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const SelectContainer = styled.div<{
  disabled: boolean;
  fullWidth: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
  position: relative;
  margin-bottom: 1px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`;

export const HiddenSelect = styled.select`
  position: absolute;
  opacity: 0;
  bottom: 0;
  height: 3rem;
  width: inherit;
  z-index: -1;
`;

export const SelectComponent = styled(motion.ul)`
  position: absolute;
  background: ${(props) => props.theme.colors.secondary.main};
  top: 100%;
  width: inherit;
  max-height: 9rem;
  border: 1px solid ${(props) => props.theme.colors.primary[200]};
  border-top: none;
  overflow-y: auto;
  z-index: 10;
`;

export const SelectLabel = styled.label`
  width: inherit;
  display: flex;
  padding: 0.4rem;
  height: 3rem;
  align-items: center;
  gap: 0.4rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.primary[600]};
  justify-content: space-between;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectIconWrapper = styled(motion.span)`
  color: ${(props) => props.theme.colors.primary[600]};
`;

export const SelectOption = styled.li`
  padding: 0.4rem;
  transition: background 0.2s;
  height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};
  }

  :hover {
    background: ${(props) => props.theme.colors.primary[50]};
  }

  :active {
    background: ${(props) => props.theme.colors.primary[100]};
  }
`;
