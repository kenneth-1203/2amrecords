import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "@/components/ProductCard";
import { IProductData } from "@/shared/interfaces";
import { motion } from "framer-motion";

interface PropTypes {
  list: IProductData[];
  slidesPerView?: number;
}

const ProductList: React.FC<PropTypes> = ({ list, slidesPerView = 3 }) => {
  const listRef = useRef(null);

  return (
    <motion.div ref={listRef}>
      <ProductListWrapper drag={"x"} dragConstraints={listRef}>
        {list.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </ProductListWrapper>
    </motion.div>
  );
};

export default ProductList;

export const ProductListWrapper = styled(motion.div)`
  min-width: 100%;
  display: inline-flex;
  justify-content: center;
`;
