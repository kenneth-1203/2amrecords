import { motion } from "framer-motion";
import styled from "styled-components";

export const CollectionSection = styled(motion.section)`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};
    padding-bottom: 2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.4rem 4rem;
  gap: 0.8rem;

  ${(props) => props.theme.sizes.tabPort} {
    padding: 1.4rem 2rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    padding: 1rem;
  }
`;

export const LinearProgress = styled(motion.div)`
  height: 4px;
  background: ${(props) => props.theme.colors.primary.main};
  transform-origin: 0%;
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
  top: 3.6rem;
  background-color: ${(props) => props.theme.colors.secondary.main};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[200]};
  z-index: 11;
`;

export const ScrollTo = styled.span`
  position: absolute;
  margin-top: -8rem;

  ${(props) => props.theme.sizes.mobile} {
    margin-top: -4rem;
  }
`;

export const Section = styled.section`
  position: relative;
  z-index: 10;
  background: ${(props) => props.theme.colors.secondary.main};
`;

export const HeroContainer = styled(motion.div)`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  filter: saturate(0);
`;

export const ButtonsWrapper = styled(motion.div)`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;