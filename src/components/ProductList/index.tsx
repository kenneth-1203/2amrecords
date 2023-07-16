import { useRef } from "react";
import styled from "styled-components";
import ProductCard from "@/components/ProductCard";
import { IProductData } from "@/shared/interfaces";
import { motion } from "framer-motion";

export const ProductListWrapper = styled(motion.div)<{ justify: string }>`
  min-width: 100%;
  display: inline-flex;
  justify-content: ${({ justify }) => justify};
  margin-left: .4rem;
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

  return (
    <motion.div ref={listRef} style={{ overflow: "hidden" }}>
      <ProductListWrapper
        justify={justify}
        drag={"x"}
        dragConstraints={listRef}
      >
        {list.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </ProductListWrapper>
    </motion.div>
  );
};

export default ProductList;
