import { useState } from "react";
import { NextPage } from "next/types";
import { getDocument, getDocuments, getFileURLs } from "@/api/index";
import { IProductData } from "@/shared/interfaces";
import Select from "@/components/Select";
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
} from "@/styles/pages/Product";
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

interface PropTypes {
  productDetails: IProductData;
  productImages: Array<{
    url: string;
    sort: number;
  }>;
}

const Page: NextPage<PropTypes> = ({ productDetails, productImages }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    productImages[0].url
  );
  const [selectedSize, setSelectedSize] = useState<number>(-1);

  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
  };

  const handleSelectSize = (index: number) => {
    setSelectedSize(index);
  };

  return (
    <Section>
      <Container>
        <ProductDisplay>
          <MainImage>
            <ProductImage>
              <Image
                src={selectedImage}
                fill
                sizes="(max-width: 1200px) 35rem, 55rem"
                alt=""
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                quality={75}
              />
            </ProductImage>
          </MainImage>
          <ImageList>
            {productImages &&
              productImages.map((image, i) => (
                <ProductImageSmall
                  key={i}
                  onClick={() => handleSelectImage(image.url)}
                  selected={selectedImage === image.url}
                >
                  <Image
                    src={image.url}
                    fill
                    sizes="(max-width: 1200px) 5rem, 8rem"
                    alt=""
                    placeholder="blur"
                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                    quality={75}
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
          {productDetails.discountedPrice ? (
            <ProductPrice>
              <Typography variant="h3">
                RM {productDetails.discountedPrice.toFixed(2)}
              </Typography>
              <Typography variant="h3" textDecoration={"line-through"}>
                RM {productDetails.originalPrice.toFixed(2)}
              </Typography>
            </ProductPrice>
          ) : (
            <Typography variant="h3">
              RM {productDetails.originalPrice.toFixed(2)}
            </Typography>
          )}
          <Button variant="contained" disabled={selectedSize === -1}>
            <Typography variant="p">ADD TO BAG</Typography>
          </Button>
        </ProductDetails>
      </Container>
    </Section>
  );
};

export default Page;
