import { useRef } from "react";
import styled from "styled-components";
import ProductCard from "@/components/ProductCard";
import { IProductData } from "@/shared/interfaces";
import { motion } from "framer-motion";

export const ProductListWrapper = styled(motion.div)<{ justify: string }>`
  min-width: 100%;
  display: inline-flex;
  justify-content: ${({ justify }) => justify};
  padding-left: 0.4rem;
  padding-right: 0.4rem;

  ${({ justify }) =>
    justify === "center" &&
    `
    & > :first-child {
      margin-left: 2rem;
    }

    & > :last-child {
      margin-right: 2rem;
    }
  `}
`;

interface PropTypes {
  list: IProductData[];
  justify?: "start" | "center" | "end";
}

const ProductList: React.FC<PropTypes> = ({ list, justify = "center" }) => {
  const listRef = useRef(null);
  const sortedList = list.sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <motion.div ref={listRef} style={{ overflow: "hidden" }}>
      <ProductListWrapper
        justify={justify}
        drag={"x"}
        dragConstraints={listRef}
      >
        {sortedList.map((product, i) =>
          product.active ? <ProductCard key={i} {...product} /> : null
        )}
      </ProductListWrapper>
    </motion.div>
  );
};

export default ProductList;
