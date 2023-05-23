import Link from "next/link";
import Image from "next/image";
import {
  CardContainer,
  CardBody,
  CardImage,
  CardContent,
  Container,
} from "./styles";
import Typography from "@/components/Typography";
import Example from "@/assets/product-example.png";
import { IProductData } from "@/shared/interfaces";

const ProductCard: React.FC<IProductData> = (props) => {
  const {
    id,
    name,
    description,
    variants,
    sizes,
    price,
    category,
    stock,
    totalQuantity,
  } = props;
  return (
    <CardContainer>
      <Link href={`/products/${id}`}>
        <CardBody>
          <CardImage>
            <Image
              src={Example}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          </CardImage>
          <CardContent>
            <Container>
              <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
                {name}
              </Typography>
              <Typography paddingBottom={"1rem"}>{description}</Typography>
              <Typography paddingBottom={"1rem"}>{/* variants */}</Typography>
              <Typography paddingBottom={"1rem"}>{/* sizes */}</Typography>
              <Typography paddingBottom={"1rem"}>RM {price}</Typography>
            </Container>
          </CardContent>
        </CardBody>
      </Link>
    </CardContainer>
  );
};

export default ProductCard;