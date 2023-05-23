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
  ${(props) => props.theme.sizes.tabPort} {
    margin: 2rem 4rem;
  }
`;

export const Featured = styled.div`
  display: flex;
  width: 86rem;
  text-align: center;
  position: relative;
  min-height: 42rem;
  height: 100%;
  margin: 0 auto;

  ${(props) => props.theme.sizes.tabLand} {
    flex-direction: column;
    width: 60rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    width: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  min-width: 18rem;
  position: relative;
  flex-direction: column;
  text-align: start;
  text-transform: uppercase;

  ${(props) => props.theme.sizes.mobile} {
    text-align: center;
    min-width: 100%;
  }
`;

export const HeaderList = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin-left: 3rem;

  ${(props) => props.theme.sizes.tabLand} {
    margin: 0;
    width: 60rem;
  }
`;

export const Categories = styled.nav`
  position: sticky;
  top: 4rem;
  background-color: ${(props) => props.theme.colors.secondary.main};
  box-shadow: 0 2px 4px 0 ${(props) => props.theme.colors.primary[100]},
    0 1px 2px 0 ${(props) => props.theme.colors.primary[50]};
  z-index: 10;
  display: flex;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

export const Line = styled.span`
  height: 100%;
  position: relative;
  margin-top: 0.6rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    border-radius: 50%;
    border: 2px solid #dadada;
    width: 8px;
    height: 8px;
    background: #dadada;
  }

  &:after {
    content: "";
    position: absolute;
    top: 8px;
    left: 1px;
    min-height: 42rem;
    height: 100%;
    width: 4px;
    border-right: 2px solid #dadada;
  }

  ${(props) => props.theme.sizes.tabLand} {
    display: none;
  }
`;
