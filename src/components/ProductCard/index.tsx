import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/Typography";
import { IProductData } from "@/shared/interfaces";
import { isDiscountExpired, getOfferDuration } from "@/shared/utils";
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
  OfferTag,
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
              sizes="100%"
              alt=""
              priority
              draggable={false}
            />
          )}
        </CardImage>
        <CardContent>
          <ProductName>
            <Typography
              variant="h3"
              fontWeight={500}
              textOverflow="clip"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {name}
            </Typography>
          </ProductName>
          <ProductDescription>
            <Typography>{description}</Typography>
          </ProductDescription>
          <ProductPrice>
            <Typography variant="h3" fontWeight={500}>
              RM{" "}
              {!isDiscountExpired(discountedPrice, discountExpiry)
                ? discountedPrice?.toFixed(2)
                : originalPrice.toFixed(2)}
            </Typography>
            {!isDiscountExpired(discountedPrice, discountExpiry) && (
              <DiscountPrice>
                <Typography variant="h3" textDecoration={"line-through"}>
                  RM {originalPrice.toFixed(2)}
                </Typography>
              </DiscountPrice>
            )}
          </ProductPrice>
          {!isDiscountExpired(discountedPrice, discountExpiry) && (
            <OfferTag>
              <Typography
                variant="small"
                fontWeight={700}
                textTransform="uppercase"
              >
                Offer ends in {getOfferDuration(discountExpiry)}
              </Typography>
              <FontAwesomeIcon
                icon={faTag}
                fontSize={".8rem"}
                style={{ paddingLeft: ".4rem" }}
              />
            </OfferTag>
          )}
        </CardContent>
      </Link>
    </CardContainer>
  );
};

export default ProductCard;
