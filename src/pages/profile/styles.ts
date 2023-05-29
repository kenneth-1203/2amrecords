import { motion } from "framer-motion";
import styled from "styled-components";

export const Section = styled.section`
  margin: 2rem;
`;

export const WelcomeContainer = styled(motion.div)`
  text-align: center;
  padding-bottom: 2rem;
  opacity: 0.3;
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
`;

export const ProfilePictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};

  ${(props) => props.theme.sizes.tabPort} {
    align-items: center;
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  margin-bottom: 1rem;
`;

export const ProfileOptionsWrapper = styled.div``;

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
