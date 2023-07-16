import styled from "styled-components";

export const ChipContainer = styled.div`
  width: fit-content;
  border-radius: 4px;
  box-shadow: 0 2px 6px -2px ${props => props.theme.colors.primary[400]};
  transition: all .2s;

  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0px);
    box-shadow: 0px 0px 1px 0px ${props => props.theme.colors.primary[400]};
  }
`;

export const ChipLabel = styled.p`
  color: ${(props) => props.theme.colors.primary.main};
  padding: 0.2rem 0.8rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 300;
`;
