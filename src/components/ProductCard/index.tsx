import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CardContainer,
  CardImage,
  CardContent,
  ProductName,
  ProductDescription,
  ProductPrice,
  DiscountPrice,
} from "./styles";
import Typography from "@/components/Typography";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    getFileURL(`Products/${id}/1.jpg`).then((data) => {
      if (data.results) {
        setImageUrl(data.results);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
    }
  };

  return (
    <CardContainer>
      <Link
        href={`/products/${id}`}
        draggable={true}
        onDragStart={handleDrag}
        onClick={handleClick}
      >
        <CardImage>
          {imageUrl && (
            <Image
              src={imageUrl}
              style={{ objectFit: "cover" }}
              fill
              sizes="100%"
              alt=""
              priority
              draggable={false}
            />
          )}
        </CardImage>
        <CardContent>
          <ProductName>
            <Typography variant="h3" fontWeight={500}>
              {name}
            </Typography>
          </ProductName>
          <ProductDescription>
            <Typography>{description}</Typography>
          </ProductDescription>
          <ProductPrice>
            <Typography variant="h3" fontWeight={500}>
              RM{" "}
              {discountedPrice
                ? discountedPrice.toFixed(2)
                : originalPrice.toFixed(2)}
            </Typography>
            {discountedPrice && (
              <DiscountPrice>
                <Typography variant="h3" textDecoration={"line-through"}>
                  RM {originalPrice.toFixed(2)}
                </Typography>
              </DiscountPrice>
            )}
          </ProductPrice>
        </CardContent>
      </Link>
    </CardContainer>
  );
};

export default ProductCard;
