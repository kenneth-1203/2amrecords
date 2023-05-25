import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import {
  CardContainer,
  CardBody,
  CardImage,
  CardContent,
  Container,
  ProductPrice
} from "./styles";
import Typography from "@/components/Typography";
import Example from "@/assets/product-example.png";
import { IProductData } from "@/shared/interfaces";
import { getFileURL } from "@/api/index";

const ProductCard: React.FC<IProductData> = (props) => {
  const {
    id,
    name,
    description,
    variant,
    sizes,
    stock,
    originalPrice,
    discountedPrice,
    category,
    totalQuantity,
  } = props;
  const { data, isLoading, error } = useSWR("file", () =>
    getFileURL(`Products/${id}/1.jpg`)
  );

  return (
    <CardContainer>
      <Link href={`/products/${id}`}>
        <CardBody>
          <CardImage>
            {isLoading || error ? null : (
              <Image
                src={data?.results || ""}
                style={{ objectFit: "cover" }}
                fill
                sizes="100%"
                alt=""
                priority
              />
            )}
          </CardImage>
          <CardContent>
            <Container>
              <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
                {name}
              </Typography>
              <Typography paddingBottom={"1rem"}>{description}</Typography>
              <Typography paddingBottom={"1rem"}>{/* variants */}</Typography>
              <Typography paddingBottom={"1rem"}>{/* sizes */}</Typography>
              {discountedPrice ? (
                <ProductPrice>
                  <Typography variant="h3">
                    RM {discountedPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="h3" textDecoration={"line-through"}>
                    RM {originalPrice.toFixed(2)}
                  </Typography>
                </ProductPrice>
              ) : (
                <Typography variant="h3">
                  RM {originalPrice.toFixed(2)}
                </Typography>
              )}
            </Container>
          </CardContent>
        </CardBody>
      </Link>
    </CardContainer>
  );
};

export default ProductCard;
