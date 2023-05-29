import { useState } from "react";
import { NextPage } from "next/types";
import MediaQuery from "react-responsive";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getDocument, getDocuments, getFileURLs } from "@/api/index";
import { IProductData } from "@/shared/interfaces";
import Image from "next/image";
import Typography from "@/components/Typography";
import {
  Section,
  Container,
  ProductDisplay,
  MainImage,
  ProductImage,
  ImageList,
  ProductImageSmall,
  ProductDetails,
  ProductPrice,
  DiscountPrice,
} from "./styles";
import Button from "@/components/Button";
import List from "@/components/List";

export const getStaticPaths = async () => {
  const data = await getDocuments("Products");
  const paths = data.map((product: IProductData) => {
    return {
      params: {
        id: product.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const productDetails = await getDocument("Products", id);
  const { results: productImages } = await getFileURLs(`Products/${id}`);

  return {
    props: {
      productDetails,
      productImages,
    },
  };
};

interface IProductImage {
  url: string;
  sort: number;
}

interface PropTypes {
  productDetails: IProductData;
  productImages: IProductImage[];
}

const Page: NextPage<PropTypes> = ({ productDetails, productImages }) => {
  const [selectedImage, setSelectedImage] = useState<IProductImage>(
    productImages[0]
  );
  const [selectedSize, setSelectedSize] = useState<number>(-1);

  const handleSelectImage = (img: IProductImage) => {
    setSelectedImage(img);
  };

  const handleSelectSize = (index: number) => {
    setSelectedSize(index);
  };

  return (
    <Section>
      <Container>
        <ProductDisplay>
          <MainImage>
            <TransformWrapper>
              <TransformComponent>
                <ProductImage>
                  {productImages &&
                    productImages.map((image, i) => (
                      <Image
                        style={
                          selectedImage.url === image.url
                            ? { opacity: 1, transition: ".3s" }
                            : { opacity: 0, transition: ".3s" }
                        }
                        key={i}
                        src={image.url}
                        fill
                        sizes="(max-width: 1200px) 35rem, 55rem"
                        alt=""
                        priority
                        quality={100}
                      />
                    ))}
                </ProductImage>
              </TransformComponent>
            </TransformWrapper>
          </MainImage>
          <ImageList>
            {productImages &&
              productImages.map((image, i) => (
                <ProductImageSmall
                  key={i}
                  onClick={() => handleSelectImage(image)}
                  selected={selectedImage.url === image.url}
                >
                  <Image
                    src={image.url}
                    fill
                    sizes="(max-width: 1200px) 5rem, 8rem"
                    alt=""
                    priority
                    quality={25}
                  />
                </ProductImageSmall>
              ))}
          </ImageList>
        </ProductDisplay>
        <ProductDetails>
          <Typography variant="h2" fontWeight={500}>
            {productDetails.name}
          </Typography>
          <Typography variant="h3">{productDetails.description}</Typography>
          <Typography variant="h3">{productDetails.variant}</Typography>
          <List
            onSelect={handleSelectSize}
            value={selectedSize}
            items={productDetails.sizes.map((size) => {
              const inStock = productDetails.stock.find((s) => s.size === size);
              return {
                label: size,
                value: size,
                disabled: !inStock,
              };
            })}
            fullWidth
          />
          <ProductPrice>
            <Typography variant="h3">
              RM{" "}
              {productDetails.discountedPrice
                ? productDetails.discountedPrice.toFixed(2)
                : productDetails.originalPrice.toFixed(2)}
            </Typography>
            {productDetails.discountedPrice && (
              <DiscountPrice>
                <Typography variant="h3" textDecoration={"line-through"}>
                  RM {productDetails.originalPrice.toFixed(2)}
                </Typography>
              </DiscountPrice>
            )}
          </ProductPrice>
          <MediaQuery maxWidth={600}>
            {(matches) =>
              matches ? (
                <Button
                  variant="contained"
                  disabled={selectedSize === -1}
                  fullWidth
                  style={{ justifyContent: "center" }}
                >
                  <Typography variant="p">ADD TO BAG</Typography>
                </Button>
              ) : (
                <Button variant="contained" disabled={selectedSize === -1}>
                  <Typography variant="p">ADD TO BAG</Typography>
                </Button>
              )
            }
          </MediaQuery>
        </ProductDetails>
      </Container>
    </Section>
  );
};

export default Page;
