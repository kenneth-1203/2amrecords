import styled, { css } from "styled-components";

export const ListContainer = styled.ul<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
  border-top: 1px solid ${(props) => props.theme.colors.primary.main};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.main};
  list-style: none;
`;

export const ListItemContainer = styled.li<{
  selected: boolean;
  disabled: boolean;
}>`
  display: flex;
  padding: 0.8rem;
  gap: 0.4rem;
  transition: background 0.2s;
  background: ${({ selected }) =>
    selected
      ? css`
          ${(props) => props.theme.colors.primary[100]};
        `
      : "inherit"};
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${(props) => props.theme.colors.primary[300]};
      pointer-events: none;
    `};

  ${({ selected }) =>
    selected &&
    `
    text-shadow: 0 1px 1px black;
  `}

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.main};
  }

  :hover {
    background: ${(props) => props.theme.colors.primary[50]};
  }

  :active {
    background: ${(props) => props.theme.colors.primary[100]};
  }
`;

export const ListItem = styled.div``;

export const ListItemIcon = styled.span``;
