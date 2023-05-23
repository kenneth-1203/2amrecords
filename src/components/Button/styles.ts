import styled, { css } from "styled-components";

export const StyledButton = styled.button<{ variant: string }>`
  outline: none;
  border: none;
  border-width: 1px;
  border-style: solid;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 2.4rem;
  gap: 8px;
  transition: all 0.2s;

  ${({ variant }) =>
    variant === "outlined"
      ? css`
          background: ${(props) => props.theme.colors.secondary.main};
          border-color: ${(props) => props.theme.colors.primary.main};
          color: ${(props) => props.theme.colors.primary.main};

          &:active {
            color: ${(props) => props.theme.colors.primary[500]};
            border-color: ${(props) => props.theme.colors.primary[500]};
          }

          &:disabled {
            color: ${(props) => props.theme.colors.primary[200]};
            border-color: ${(props) => props.theme.colors.primary[200]};
            cursor: default;
          }
        `
      : variant === "contained"
      ? css`
          background: ${(props) => props.theme.colors.primary.main};
          border-color: ${(props) => props.theme.colors.primary.main};
          color: ${(props) => props.theme.colors.secondary.main};

          &:hover {
            background: ${(props) => props.theme.colors.primary[800]};
          }

          &:active {
            background: ${(props) => props.theme.colors.secondary.main};
            color: ${(props) => props.theme.colors.primary.main};
          }

          &:disabled {
            color: ${(props) => props.theme.colors.primary[200]};
            border-color: ${(props) => props.theme.colors.primary[200]};
            cursor: default;
          }
        `
      : css`
          background: ${(props) => props.theme.colors.secondary.main};
          border-color: transparent;

          &:active {
            color: ${(props) => props.theme.colors.primary[600]};
          }

          &:disabled {
            color: ${(props) => props.theme.colors.primary[200]};
            cursor: default;
          }
        `}
`;

export const IconWrapper = styled.span`
  display: flex;
`;
