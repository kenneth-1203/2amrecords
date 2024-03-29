import styled, { css } from "styled-components";

export const ListContainer = styled.ul`
  border-top: 1px solid ${(props) => props.theme.colors.primary.main};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.main};
  list-style: none;
`;

export const ListItemContainer = styled.li<{
  selected: boolean;
  disabled: boolean;
  noSelect: boolean;
}>`
  display: flex;
  padding: 0.8rem;
  gap: 0.4rem;
  transition: background 0.2s;

  ${({ noSelect, selected , disabled}) => !noSelect ? css`
    background: ${selected
      ? css`
          ${(props) => props.theme.colors.primary[50]};
        `
      : "inherit"};
    ${disabled &&
      css`
        color: ${(props) => props.theme.colors.primary[300]};
        pointer-events: none;
      `};

    ${selected &&
      `
      text-shadow: 0 1px 1px black;
    `}
  ` : ``}

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.main};
  }

  ${({ noSelect }) => !noSelect && css`
    :hover {
      background: ${(props) => props.theme.colors.primary[25]};
    }

    :active {
      background: ${(props) => props.theme.colors.primary[50]};
    }
  `}
`;

export const ListItem = styled.div`
  width: 100%;
`;

export const ListItemIcon = styled.span``;
