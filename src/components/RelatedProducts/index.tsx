import { useState, useEffect } from "react";
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

  const [products, setProducts] = useState<IProductData[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedProducts: IProductData[] = await getDocuments("Products");
      setProducts(fetchedProducts);
    })();
  }, []);

  useEffect(() => {
    if (productsList && products.length) {
      const categoryIds = productsList?.flatMap((product) =>
        product.category.map((c) => c.id)
      );

      const productIds = productsList.map((product) => product.id);

      const sortedProducts = [...products].sort((a, b) => {
        const aIsInCategory = a.category.some((category) =>
          categoryIds.includes(category.id)
        );
        const bIsInCategory = b.category.some((category) =>
          categoryIds.includes(category.id)
        );

        if (aIsInCategory && !bIsInCategory) {
          return -1;
        }
        if (!aIsInCategory && bIsInCategory) {
          return 1;
        }
        return 0;
      });

      const related = sortedProducts.filter(
        (product: IProductData | IBagItem) => {
          return !productIds.includes(product.id) && product.active;
        }
      );

      setRelatedProducts(related);
    }
  }, [productsList, products]);

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
