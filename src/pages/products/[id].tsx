import { useState, useContext } from "react";
import { NextPage } from "next/types";
import _ from "lodash";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { UserContext } from "@/lib/context";
import {
  createDocument,
  getDocumentRef,
  getDocuments,
  getFileURLs,
} from "@/api/index";
import { IProductData, Size, Stock } from "@/shared/interfaces";
import Image from "next/image";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import List from "@/components/List";
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
  ButtonWrapper,
} from "@/styles/Products";

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
  const productId = context.params.id;
  const { results: productImages } = await getFileURLs(`Products/${productId}`);

  return {
    props: {
      productId,
      productImages,
    },
  };
};

interface IProductImage {
  url: string;
  sort: number;
}

interface PropTypes {
  productId: string;
  productImages: IProductImage[];
}

const Page: NextPage<PropTypes> = ({ productId, productImages }) => {
  const { user } = useContext(UserContext);
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
  const productRef = getDocumentRef(`Products/${productId}`);
  const [productDetails]: any = useDocumentData(productRef);

  const getSizeValue = (size: number) => {
    if (size === 0) return "S";
    if (size === 1) return "M";
    if (size === 2) return "L";
    if (size === 3) return "XL";
  };

  const handleAddToBag = async () => {
    if (!_.isEmpty(user)) {
      const newItems = [
        // @ts-ignore
        ...user.items,
        {
          ...productDetails,
          size: getSizeValue(selectedSize),
        },
      ];
      // Update user items' state
      await createDocument("Users", {
        ...user,
        items: newItems,
      });
      // Update products stock state
      const stock = productDetails.stock;
      const totalQuantity = productDetails.totalQuantity;
      const newStock = stock.map((item: Stock) => {
        if (item.size === getSizeValue(selectedSize)) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      const newTotalQuantity = totalQuantity - 1;
      await createDocument("Products", {
        ...productDetails,
        stock: newStock,
        totalQuantity: newTotalQuantity,
      });
      handleSelectSize(-1);
    } else {
      alert("Please sign in to continue shopping!");
    }
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
          {productDetails && (
            <>
              <Typography variant="h2" fontWeight={500}>
                {productDetails.name}
              </Typography>
              <Typography variant="h3">{productDetails.description}</Typography>
              <Typography variant="h3">{productDetails.variant}</Typography>
              <List
                onSelect={handleSelectSize}
                value={selectedSize}
                items={productDetails.sizes.map((size: Size) => {
                  const inStock = productDetails.stock.find(
                    (s: Stock) => s.size === size && s.quantity > 0
                  );
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
              <ButtonWrapper>
                <Button
                  variant="contained"
                  disabled={selectedSize === -1}
                  style={{ justifyContent: "center" }}
                  onClick={handleAddToBag}
                  fullWidth
                >
                  <Typography variant="p">ADD TO BAG</Typography>
                </Button>
              </ButtonWrapper>
            </>
          )}
        </ProductDetails>
      </Container>
    </Section>
  );
};

export default Page;
