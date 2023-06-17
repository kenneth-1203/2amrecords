import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Section = styled.section`
  margin: 2rem 8rem;

  ${(props) => props.theme.sizes.tabPort} {
    margin: 0;
  }
`;

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${(props) => props.theme.sizes.tabPort} {
    gap: 2rem;
  }
`;

export const ProfileSelection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileInfo = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;

  ${(props) => props.theme.sizes.tabPort} {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
  }
`;

export const ProfileOptionsWrapper = styled.div`
  display: flex;

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

export const ProfileOrdersInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${(props) => props.theme.sizes.tabPort} {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

export const OrderItem = styled.div`
  padding: 1rem;
  border: 1px solid black;
`;

export const OrderItemBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 0;
`;

export const OrderItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary[100]};
  }
`;

export const OrderSummary = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
`;
