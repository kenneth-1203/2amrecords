import styled, { css } from "styled-components";

export const StyledButton = styled.button<{
  variant: string;
  fullWidth: boolean;
  selected: boolean;
}>`
  width: ${({ fullWidth }) => fullWidth && `100%`};
  min-width: 6rem;
  position: relative;
  outline: none;
  border: none;
  border-width: 1px;
  border-style: solid;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  gap: 8px;
  transition: all 0.2s;

  & > :last-child {
    width: ${({ fullWidth }) => fullWidth && `100%`};
  }

  :disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  ${({ variant }) =>
    variant === "outlined"
      ? css`
          background: ${(props) => props.theme.colors.secondary.main};
          border-color: ${(props) => props.theme.colors.primary.main};
          color: ${(props) => props.theme.colors.primary.main} !important;

          &:hover {
            background: ${(props) => props.theme.colors.primary[50]};
          }

          &:active {
            color: ${(props) => props.theme.colors.primary[500]} !important;
            border-color: ${(props) => props.theme.colors.primary[500]};
          }
        `
      : variant === "contained"
      ? css`
          background: ${(props) => props.theme.colors.primary.main};
          border-color: ${(props) => props.theme.colors.primary.main};
          color: ${(props) => props.theme.colors.secondary.main} !important;

          &:hover {
            background: ${(props) => props.theme.colors.primary[800]};
          }

          &:active {
            background: ${(props) => props.theme.colors.secondary.main};
            color: ${(props) => props.theme.colors.primary.main};
          }
        `
      : css`
          color: ${(props) => props.theme.colors.primary.main} !important;
          background: transparent;
          border-color: transparent;
        `}
`;

export const IconWrapper = styled.span`
  position: absolute;
`;
