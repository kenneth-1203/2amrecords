import styled from "styled-components";

export const ChipContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary[500]};
  width: fit-content;
  border-radius: 4px;
`;

export const ChipLabel = styled.p`
  color: ${(props) => props.theme.colors.primary.main};
  padding: 0.2rem 0.8rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 300;
`;
