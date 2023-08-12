import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 6rem 2rem 2rem 2rem;
  color: ${(props) => props.theme.colors.primary[300]};
  background: ${props => props.theme.colors.secondary.main};
  z-index: 100;
`;

export const FooterSection = styled.div`
  width: 28px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  gap: 0.4rem;
`;

export const FooterAbout = styled.div`
  max-width: 52rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  ${(props) => props.theme.sizes.mobile} {
    width: 100%;
  }
`;