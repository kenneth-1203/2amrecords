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
  border-radius: 4px;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  gap: 8px;
  transition: all 0.15s;

  & > :last-child {
    width: ${({ fullWidth }) => fullWidth && `100%`};
  }

  :disabled {
    pointer-events: none;
    opacity: 0.2;
    box-shadow: none;
  }

  ${({ variant }) =>
    variant === "outlined"
      ? css`
          background: ${(props) => props.theme.colors.secondary.main};
          box-shadow: 0px 0px 2px -1px ${props => props.theme.colors.primary[900]}, 
                      0px 0px 18px -9px ${props => props.theme.colors.primary[300]};
          color: ${(props) => props.theme.colors.primary.main} !important;

          &:hover {
            box-shadow: 0px 0px 2px -1px ${props => props.theme.colors.primary[900]}, 
                      0px 0px 1px 0px ${props => props.theme.colors.primary[900]};
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
          box-shadow: 0px 2px 10px -2px ${props => props.theme.colors.primary[300]};
          color: ${(props) => props.theme.colors.secondary.main} !important;

          &:hover {
            background: ${(props) => props.theme.colors.primary[800]};
          }

          &:active {
            background: ${(props) => props.theme.colors.primary[600]};
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
