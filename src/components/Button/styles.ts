import styled, { css } from "styled-components";

export const StyledButton = styled.button<{
  variant: string;
  fullWidth: boolean;
  selected: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
  position: relative;
  outline: none;
  border: none;
  border-width: 1px;
  border-style: solid;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 2.4rem;
  gap: 8px;
  transition: all 0.2s;

  & > :last-child {
    width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
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

          &:active {
            color: ${(props) => props.theme.colors.primary[500]};
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
          background: ${({ selected }) =>
            selected
              ? css`
                  ${(props) => props.theme.colors.primary[50]}
                `
              : css`
                  ${(props) => props.theme.colors.secondary.main}
                `};
          border-color: transparent;

          &:active {
            color: ${(props) => props.theme.colors.primary[600]};
          }

          &:hover {
            background: ${(props) => props.theme.colors.primary[50]};
          }
        `}
`;

export const IconWrapper = styled.span`
  position: absolute;
`;
