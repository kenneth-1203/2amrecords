import { motion } from "framer-motion";
import styled from "styled-components";

export const Section = styled.section`
  margin: 2rem;

  ${(props) => props.theme.sizes.mobile} {
    margin: 0;
  }
`;

export const WelcomeContainer = styled(motion.div)`
  text-align: center;
  opacity: 0.3;
  padding: 0 0 2rem 0;

  ${(props) => props.theme.sizes.mobile} {
    padding: 1rem 0 0 0;
  }
`;

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 4rem;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    gap: 2rem;
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

  ${(props) => props.theme.sizes.tabPort} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  ${(props) => props.theme.sizes.mobile} {
    padding: 0 2rem;
  }
`;

export const ProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};

  ${(props) => props.theme.sizes.tabPort} {
    align-items: center;
  }

  ${(props) => props.theme.sizes.mobile} {
    margin: 2rem;
    border: none;
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  margin-bottom: 1rem;

  ${(props) => props.theme.sizes.mobile} {
    width: 18rem;
    height: 18rem;
  }
`;

export const ProfileOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: row;
  }
`;

export const ProfileDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ShippingInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.4rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  ${(props) => props.theme.sizes.mobile} {
    justify-content: end;
  }
`;
