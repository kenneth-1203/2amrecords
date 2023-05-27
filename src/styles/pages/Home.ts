import styled from "styled-components";

export const Background = styled.section`
  display: grid;
  width: 100%;
  overflow: hidden;
  grid-template-columns: 1fr 1fr 1fr;

  & > * {
    display: flex;
    width: 100%;
    filter: saturate(0);
    aspect-ratio: 9 / 11;
  }
`;

export const Section = styled.section`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
`;

export const CategorySelection = styled.div`
  text-align: center;
  padding: 2rem 4rem;
`;

export const ProductSelection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

export const Categories = styled.nav`
  position: sticky;
  top: 3rem;
  background-color: ${(props) => props.theme.colors.secondary.main};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};
  z-index: 10;
  display: flex;
  padding: 1.4rem 4rem;
  justify-content: center;
`;
