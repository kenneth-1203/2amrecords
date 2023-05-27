import styled from "styled-components";

const MAIN_IMAGE_WIDTH = "35rem";
const MAIN_IMAGE_HEIGHT = "50rem";
const SMALL_IMAGE_WIDTH = "5rem";
const SMALL_IMAGE_HEIGHT = "8rem";
const GAP_SIZE = "2rem";
const TOTAL_WIDTH = `${MAIN_IMAGE_WIDTH} + ${SMALL_IMAGE_WIDTH} + ${GAP_SIZE}`;
const TOTAL_HEIGHT = `${MAIN_IMAGE_HEIGHT} + ${SMALL_IMAGE_HEIGHT} + ${GAP_SIZE}`;

export const Section = styled.section`
  margin: 2rem 8rem;
  padding-bottom: 4rem;

  ${(props) => props.theme.sizes.tabLand} {
    margin: 2rem 4rem;
  }

  ${(props) => props.theme.sizes.tabLand} {
    margin: 2rem 6rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    margin: 2rem;
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
  }
`;

export const ProductDisplay = styled.div`
  display: flex;
  width: calc(${TOTAL_WIDTH});
  height: ${MAIN_IMAGE_HEIGHT};
  gap: 1rem;
  margin: 0 auto;

  ${(props) => props.theme.sizes.tabLand} {
    width: calc((${TOTAL_WIDTH}) / 1.2);
    height: calc((${MAIN_IMAGE_HEIGHT}) / 1.2);
  }

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    width: calc(${MAIN_IMAGE_WIDTH} / 1.25);
    height: calc((${TOTAL_HEIGHT}) / 1.25);
  }
`;

export const MainImage = styled.div`
`;

export const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.2rem;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: row;
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: ${MAIN_IMAGE_WIDTH};
  height: ${MAIN_IMAGE_HEIGHT};
  & > img {
    object-fit: cover;
  }

  ${(props) => props.theme.sizes.tabLand} {
    width: calc(${MAIN_IMAGE_WIDTH} / 1.2);
    height: calc((${MAIN_IMAGE_HEIGHT}) / 1.2);
  }

  ${(props) => props.theme.sizes.tabPort} {
    height: calc(${MAIN_IMAGE_HEIGHT} / 1.25);
  }
`;

export const ProductImageSmall = styled.div<{ selected: boolean }>`
  position: relative;
  width: ${SMALL_IMAGE_WIDTH};
  height: ${SMALL_IMAGE_HEIGHT};
  ${({ selected }) => selected && `box-shadow: 0 0 0 2px`};

  & > img {
    object-fit: cover;
  }

  ${(props) => props.theme.sizes.tabLand} {
    width: calc(${SMALL_IMAGE_WIDTH} / 1.2);
    height: calc((${SMALL_IMAGE_HEIGHT}) / 1.2);
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DiscountPrice = styled.div`
  opacity: 0.3;
`;

export const ProductPrice = styled.div`
  display: flex;
  gap: 0.4rem;
`;