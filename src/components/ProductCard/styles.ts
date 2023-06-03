import styled from "styled-components";
import { motion } from "framer-motion";

export const CardContainer = styled(motion.div)`
  display: flex;
  box-shadow: 0 4px 8px -4px ${(props) => props.theme.colors.primary[400]};
  min-width: 18rem;
  max-width: 18rem;
  margin: 0.6rem 1rem;
`;

export const CardImage = styled.div`
  height: 28rem;
  width: 100%;
  position: relative;
`;

export const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 12rem;
`;

export const ProductName = styled.div`
  margin-bottom: 1rem;
`;

export const ProductDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
`;

export const ProductPrice = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: auto;
`;

export const DiscountPrice = styled.div`
  opacity: 0.3;
`;
