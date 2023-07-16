import { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import { getDocuments } from "@/api/index";
import { IBagItem, IProductData } from "@/shared/interfaces";
import ProductList from "@/components/ProductList";
import Typography from "@/components/Typography";
import { RelatedProductsContainer, Line } from "./styles";

interface RelatedProductsProps {
  productsList: IProductData[] | IBagItem[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productsList }) => {
  const [relatedProducts, setRelatedProducts] = useState<IProductData[]>([]);

  useMemo(async () => {
    if (productsList) {
      const categoryIds = productsList?.flatMap((product) =>
        product.category.map((c) => c.id)
      );

      const products: IProductData[] = await getDocuments("Products");
      const productIds = productsList.map((product) => product.id);

      const related = products.filter((product: IProductData | IBagItem) => {
        if (productIds.includes(product.id)) {
          return false;
        }
        return product.category.some((category) =>
          categoryIds.includes(category.id)
        );
      });

      setRelatedProducts(related);
    }
  }, [productsList]);

  if (_.isEmpty(relatedProducts)) return null;

  return (
    <RelatedProductsContainer>
      <Typography variant="h3" fontWeight={500}>
        You may also like
      </Typography>
      <Line />
      <ProductList justify="start" list={relatedProducts} />
      <Line />
    </RelatedProductsContainer>
  );
};

export default RelatedProducts;
