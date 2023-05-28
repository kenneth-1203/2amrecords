import styled from "styled-components";

export const Section = styled.section`
  margin: 2rem;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;

  ${props => props.theme.sizes.mobile} {
    flex-direction: column;
  }
`;

export const ProfileSelection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfo = styled.div`
  display: grid;
  width: 50rem;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;

  ${props => props.theme.sizes.tabPort} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const ProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primary[200]};

  ${props => props.theme.sizes.tabPort} {
    align-items: center;
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
`;

export const ProfileOptionsWrapper = styled.div``;

export const ProfileDetailsWrapper = styled.div``;

export const ShippingInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  ${props => props.theme.sizes.tabPort} {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;
