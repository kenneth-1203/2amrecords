import styled from "styled-components";

export const RelatedProductsContainer = styled.div`
  margin: 4rem 0;

  ${(props) => props.theme.sizes.mobile} {
    margin: 4rem 2rem;
  }
`;

export const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.colors.primary[100]};
`;
