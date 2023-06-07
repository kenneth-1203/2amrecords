import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.section`
  margin: 1rem 4rem 8rem 4rem;

  ${(props) => props.theme.sizes.tabLand} {
    margin: 1rem 2rem 8rem 2rem;
  }

  ${(props) => props.theme.sizes.tabPort} {
    margin: 1rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    margin: 0;
  }
`;

export const BagContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-height: 86vh;

  ${(props) => props.theme.sizes.tabLand} {
    gap: 1rem;
  }

  ${(props) => props.theme.sizes.tabPort} {
    flex-direction: column;
    max-height: 100%;
  }

  ${(props) => props.theme.sizes.mobile} {
    gap: 0;
  }
`;

export const BagItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 60%;

  ${(props) => props.theme.sizes.tabPort} {
    width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  padding-bottom: 2rem;
  box-shadow: 0 4px 20px -20px;

  ${(props) => props.theme.sizes.mobile} {
    margin: 1rem 1rem 0 1rem;
  }
`;

export const ItemListContainer = styled.div`
  overflow-y: auto;

  & > ul {
    border-color: ${(props) => props.theme.colors.primary[100]};

    & > :not(:last-child) {
      border-color: ${(props) => props.theme.colors.primary[100]};
    }
  }

  ${(props) => props.theme.sizes.tabPort} {
    height: 38rem;
  }

  ${(props) => props.theme.sizes.mobile} {
    height: 28rem;
  }
`;

export const ItemWrapper = styled(motion.div)`
  display: flex;
  gap: 1rem;

  & > a {
    width: 100%;
    display: flex;
    gap: 1rem;
  }
`;

export const ItemImage = styled.div`
  position: relative;
  min-width: 100px;
  height: 160px;

  ${(props) => props.theme.sizes.mobile} {
    min-width: 80px;
    height: 120px;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;

  ${(props) => props.theme.sizes.mobile} {
    gap: 0.8rem;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.4rem;

  & > * {
    white-space: nowrap;
  }
`;

export const DiscountPrice = styled.div`
  opacity: 0.3;
`;

export const TextWrapper = styled.div<{ lineClamp: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp ?? 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.22rem;

  ${(props) => props.theme.sizes.mobile} {
    -webkit-line-clamp: ${({ lineClamp }) => (lineClamp > 2 ? 2 : lineClamp)};
  }
`;

export const RemoveItemButton = styled.div`
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1.4rem;
  margin-top: auto;

  & > svg {
    color: ${(props) => props.theme.colors.primary[200]};
    transition: 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.primary[400]};
    }
  }
`;

export const NoItemsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding: 2rem 0;
  color: ${(props) => props.theme.colors.primary[300]};
  border-top: 1px solid ${(props) => props.theme.colors.primary[100]};

  & > svg {
    font-size: 12rem;
    opacity: 0.2;
  }

  & > a > button {
    padding-right: 2rem;
    width: 100%;
  }

  & > a {
    ${(props) => props.theme.sizes.mobile} {
      width: 100%;
    }
  }

  ${(props) => props.theme.sizes.mobile} {
    padding: 2rem 1rem;
  }
`;

export const CheckoutContainer = styled.div`
  display: flex;
  margin-top: 3.2rem;
  width: 36rem;

  ${(props) => props.theme.sizes.tabPort} {
    display: inline-block;
    width: 100%;
    margin: 0;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid ${(props) => props.theme.colors.primary[100]};
  padding: 1rem;

  ${(props) => props.theme.sizes.tabPort} {
    box-shadow: 0 -4px 20px -20px;
  }

  ${(props) => props.theme.sizes.mobile} {
    border: 0;
  }
`;

export const SummaryItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;

  ${(props) => props.theme.sizes.tabPort} {
    max-height: 20rem;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary[100]};
  padding: 0.4rem 0;

  // &:last-child {
  //   border-bottom: 1px solid ${(props) => props.theme.colors.primary[100]};
  // }
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8rem;
  justify-content: end;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  ${(props) => props.theme.sizes.mobile} {
    flex-direction: column;
    gap: 0.8rem;
  }
`;