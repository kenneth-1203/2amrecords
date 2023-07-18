import styled, { css } from "styled-components";

export const ChipContainer = styled.div<{ disabled: boolean }>`
  width: fit-content;
  border-radius: 4px;
  transition: all 0.2s;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.4;
          border: 1px solid ${(props) => props.theme.colors.primary[200]};
        `
      : css`
          box-shadow: 0 2px 6px -2px ${(props) => props.theme.colors.primary[400]};

          &:hover {
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0px);
            box-shadow: 0px 0px 1px 0px
              ${(props) => props.theme.colors.primary[400]};
          }
        `}
`;

export const ChipLabel = styled.p`
  color: ${(props) => props.theme.colors.primary.main};
  padding: 0.2rem 0.8rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 300;
`;

export const OfferTag = styled.div<{ active: boolean; color: string }>`
  width: fit-content;
  padding: 0.1rem 0.4rem;
  display: flex;
  align-items: center;
  border-radius: 2px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);

    ${({ color }) =>
      color &&
      css`
        color: ${(props) => props.theme.colors[color].main};
        filter: saturate(1);
        border: 2px solid ${(props) => props.theme.colors[color][800]};
        box-shadow: 0 3px 10px -4px ${(props) => props.theme.colors.primary[100]},
          0 0px 2px 0px ${(props) => props.theme.colors[color][800]};
      `}
  }

  ${({ color, active }) =>
    color &&
    css`
      color: ${(props) => props.theme.colors[color].main};
      border: 2px solid ${(props) => props.theme.colors[color][400]};
      ${active &&
      css`
        filter: saturate(1);
        box-shadow: 0 3px 10px -4px ${(props) => props.theme.colors.primary[100]},
          0 0px 2px 0px ${(props) => props.theme.colors[color][800]};
      `}
    `}
`;
