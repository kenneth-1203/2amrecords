import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.section)`
  margin: 2rem 2rem 18rem 2rem;
`;

export const ShippingForm = styled.form`
  width: 36rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 0.4rem;

  ${(props) => props.theme.sizes.mobile} {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const Summary = styled.div`
  display: flex;
  padding-top: 1rem;
  flex-direction: column;
  gap: 0.8rem;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusContainer = styled(motion.div)`
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  align-items: center;
  margin: 8rem auto;

  ${props => props.theme.sizes.mobile} {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
`;
