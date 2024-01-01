import { motion } from "framer-motion";
import styled from "styled-components";

const MAIN_IMAGE_WIDTH = "35rem";
const MAIN_IMAGE_HEIGHT = "52rem";
const SMALL_IMAGE_WIDTH = "5rem";
const SMALL_IMAGE_HEIGHT = "8rem";
const GAP_SIZE = "2rem";
const TOTAL_WIDTH = `${MAIN_IMAGE_WIDTH} + ${SMALL_IMAGE_WIDTH} + ${GAP_SIZE}`;

export const Section = styled.section`
  margin: 2rem 8rem;

  ${(props) => props.theme.sizes.tabLand} {
    margin: 2rem 4rem;
  }

  ${(props) => props.theme.sizes.tabLand} {
    margin: 2rem 6rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    margin: 0;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns:
    calc(${TOTAL_WIDTH})
    1fr;
  gap: 4rem;
  overflow: hidden;

  ${(props) => props.theme.sizes.tabLand} {
    grid-template-columns:
      calc((${TOTAL_WIDTH}) / 1.2)
      1fr;
    gap: 2rem;
  }

  ${(props) => props.theme.sizes.tabPort} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const ProductImageDisplay = styled.div`
  display: flex;
  width: calc(${TOTAL_WIDTH});
  height: ${MAIN_IMAGE_HEIGHT};
  gap: 1rem;
  margin: 0 auto;

  ${(props) => props.theme.sizes.tabLand} {
    width: calc((${TOTAL_WIDTH}) / 1.2);
    height: calc((${MAIN_IMAGE_HEIGHT}) / 1.2);
  }

  ${(props) => props.theme.sizes.tabPort} {
    height: ${MAIN_IMAGE_HEIGHT};
  }

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    width: 100%;
    height: calc(${MAIN_IMAGE_HEIGHT});
    align-items: center;
  }
`;

export const MainImage = styled(motion.div)`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.2rem;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: row;
  }

  ${(props) => props.theme.sizes.mobile} {
    height: calc(${SMALL_IMAGE_HEIGHT});
  }
`;

export const ProductImage = styled(motion.div)`
  position: relative;
  flex: 0 0 100%;
  scroll-snap-align: start;
  min-width: ${MAIN_IMAGE_WIDTH};
  height: ${MAIN_IMAGE_HEIGHT};
  & > img {
    object-fit: cover;
  }

  ${(props) => props.theme.sizes.tabLand} {
    min-width: calc(${MAIN_IMAGE_WIDTH} / 1.2);
    height: calc((${MAIN_IMAGE_HEIGHT}) / 1.2);
  }

  ${(props) => props.theme.sizes.tabPort} {
    height: ${MAIN_IMAGE_HEIGHT};
  }

  ${(props) => props.theme.sizes.mobile} {
    min-width: min(calc(${MAIN_IMAGE_WIDTH} / 1.2), 15vw);
    height: calc((${MAIN_IMAGE_HEIGHT}) / 1.2);
  }
`;

export const ProductImageSmall = styled(motion.div)`
  position: relative;
  width: ${SMALL_IMAGE_WIDTH};
  height: ${SMALL_IMAGE_HEIGHT};

  & > img {
    object-fit: cover;
  }

  ${(props) => props.theme.sizes.tabLand} {
    width: calc(${SMALL_IMAGE_WIDTH} / 1.2);
    height: calc((${SMALL_IMAGE_HEIGHT}) / 1.2);
  }
`;

export const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  ${(props) => props.theme.sizes.tabPort} {
    margin-top: 2rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    margin: 2rem;
  }
`;

export const DiscountPrice = styled.div`
  opacity: 0.3;
`;

export const ProductPrice = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const ButtonWrapper = styled.div`
  width: max-content;

  ${(props) => props.theme.sizes.mobile} {
    width: 100%;
  }
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

export const ViewSizeChart = styled.div`
  & > button > p {
    color: ${(props) => props.theme.colors.primary[300]};
    text-transform: uppercase;
    text-decoration: underline;
    transition: 0.2s;
  }

  &:active > button > p {
    color: ${(props) => props.theme.colors.primary[100]};
  }

  ${(props) => props.theme.sizes.mobile} {
    width: 100%;
  }
`;

export const SizeChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`;

export const SizeChartImage = styled.div<{ height: number }>`
  position: relative;
  width: 420px;
  height: ${({ height }) => height}px;

  ${(props) => props.theme.sizes.tabPort} {
    width: calc(420px / 1.2);
    height: calc(${({ height }) => height}px / 1.2);
  }

  ${(props) => props.theme.sizes.mobile} {
    width: calc(420px / 1.4);
    height: calc(${({ height }) => height}px / 1.4);
  }
`;

export const OfferTag = styled.div`
  background: ${(props) => props.theme.colors.green.main};
  color: ${(props) => props.theme.colors.secondary.main};
  width: fit-content;
  padding: 0 0.2rem;
  margin-top: 0.4rem;
  border-radius: 2px;
  box-shadow: 
    0 4px 8px -4px ${(props) => props.theme.colors.primary[200]},
    0 0px 3px 0px ${(props) => props.theme.colors.primary[50]};
`;
