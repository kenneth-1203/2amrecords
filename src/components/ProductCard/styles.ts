import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const CardContainer = styled(motion.div)<{ disabled: boolean }>`
  display: flex;
  position: relative;
  background: ${(props) => props.theme.colors.secondary.main};
  box-shadow: 0 2px 16px -8px ${(props) => props.theme.colors.primary[200]},
    0 0px 3px 0px ${(props) => props.theme.colors.primary[50]};
  width: 22rem;
  margin: 0.8rem 0;

  :not(:last-child) {
    margin-right: 2rem;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
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
  height: 14rem;
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
  gap: 0.6rem;
  margin-top: auto;
`;

export const DiscountPrice = styled.div`
  opacity: 0.3;
`;

export const SoldOutMessage = styled.p`
  font-weight: 500;
  background: ${(props) => props.theme.colors.red[200]};
  padding: 2px 4px;
  color: ${(props) => props.theme.colors.red.main};
  border-radius: 4px;
`;

export const TrendChip = styled.div<{ index: number; code: string }>`
  position: absolute;
  top: 10px;
  right: ${({ index }) => index * 10 + 10}px;
  z-index: 100;
  border-radius: 4px;
  padding: 2px 4px;
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  align-items: center;

  ${(props) =>
    props.code && props.code === "hot-selling"
      ? `
      background: ${props.theme.colors.red[200]};
      color: ${props.theme.colors.red.main};
    `
      : props.code === "new"
      ? `
      background: ${props.theme.colors.blue[200]};
      color: ${props.theme.colors.blue.main};
    `
      : ``}
`;
