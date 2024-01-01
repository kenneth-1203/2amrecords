import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/Typography";
import Chip from "@/components/Chip";
import { IProductData } from "@/shared/interfaces";
import { isDiscountExpired } from "@/shared/utils";
import { getFileURL } from "@/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import {
  CardContainer,
  CardImage,
  CardContent,
  ProductName,
  ProductDescription,
  ProductPrice,
  DiscountPrice,
} from "./styles";

const ProductCard: React.FC<IProductData> = (props) => {
  const {
    id,
    name,
    description,
    originalPrice,
    discountedPrice,
    discountExpiry,
  } = props;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useMemo(() => {
    getFileURL(`Products/${id}/1.jpg`).then((data) => {
      if (data.results) {
        setImageUrl(data.results);
      }
    });
  }, [id]);

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
    <CardContainer
      whileTap={{ scale: 0.99, boxShadow: "0 0px 4px -2px rgba(0,0,0,.4)" }}
    >
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
              priority
              sizes="100%"
              alt=""
              draggable={false}
            />
          )}
        </CardImage>
        <CardContent>
          <ProductName>
            <Typography
              variant="h3"
              fontWeight={500}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              width={"288px"}
            >
              {name}
            </Typography>
          </ProductName>
          <ProductDescription>
            <Typography>{description}</Typography>
          </ProductDescription>
          {!isDiscountExpired(discountExpiry) && (
            <div style={{ display: "flex", gap: ".4rem", marginTop: "auto" }}>
              {/* <Chip variant="secondary" color="red">
                <Typography
                  variant="small"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  NEW
                </Typography>
              </Chip> */}
              <Chip variant="secondary" color="orange">
                <Typography
                  variant="small"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  Limited time offer
                </Typography>
                <FontAwesomeIcon
                  icon={faTag}
                  fontSize={".8rem"}
                  style={{ paddingLeft: ".4rem", opacity: 0.8 }}
                />
              </Chip>
            </div>
          )}
          <ProductPrice>
            <Typography variant="h3" fontWeight={500}>
              RM{" "}
              {!isDiscountExpired(discountExpiry)
                ? discountedPrice?.toFixed(2)
                : originalPrice.toFixed(2)}
            </Typography>
            {!isDiscountExpired(discountExpiry) && (
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
