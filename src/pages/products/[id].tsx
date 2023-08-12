import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next/types";
import _ from "lodash";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { UserContext } from "@/lib/context";
import {
  createDocument,
  getDocumentRef,
  getDocuments,
  getFileURLs,
} from "@/api/index";
import {
  Category,
  IBagItem,
  IProductData,
  Size,
  Stock,
} from "@/shared/interfaces";
import {
  getOfferDuration,
  getSizeValue,
  isDiscountExpired,
  isReleased,
} from "@/shared/utils";
import Image from "next/image";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import List from "@/components/List";
import Toast from "@/components/Toast";
import Chip from "@/components/Chip";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import Timer from "@/components/Timer";
import RelatedProducts from "@/components/RelatedProducts";
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Section,
  Container,
  MainImage,
  ProductImage,
  ImageList,
  ProductImageSmall,
  ProductPrice,
  DiscountPrice,
  ButtonWrapper,
  CategoriesWrapper,
  Wrapper,
  ViewSizeChart,
  SizeChartWrapper,
  SizeChartImage,
  ProductImageDisplay,
  ProductDetailsWrapper,
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

interface ToastProps {
  open: boolean;
  message: string;
  type: "success" | "warning" | "error";
}

interface PropTypes {
  productId: string;
  productImages: IProductImage[];
}

const Page: NextPage<PropTypes> = ({ productId, productImages }) => {
  const productRef = getDocumentRef(`Products/${productId}`);
  const [productDetails]: any = useDocumentData(productRef);
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastProps>({
    open: false,
    message: "",
    type: "success",
  });

  const handleToggleToast = () => {
    setToast({
      ...toast,
      open: !toast.open,
    });
  };

  const handleShowSizeChart = () => {
    setShowSizeChart(!showSizeChart);
  };

  if (!productDetails) return <Loading show />;

  return (
    <>
      <Head>
        <title>2AMRECORDS - {productDetails.name}</title>
      </Head>
      <Toast
        open={toast.open}
        onClose={handleToggleToast}
        type={toast.type}
        timeout={2}
      >
        <Typography variant="p">{toast.message}</Typography>
      </Toast>
      <Modal
        open={showSizeChart}
        onClose={handleShowSizeChart}
        title="Size chart"
      >
        <SizeChartWrapper>
          <Typography variant="p" textTransform="uppercase" fontWeight={500}>
            T-shirt Size Chart (CM)
          </Typography>
          <SizeChartImage height={164}>
            <Image
              src={"/tshirt-size-chart.jpg"}
              style={{ objectFit: "cover" }}
              sizes="100%"
              alt=""
              fill
              priority
            />
          </SizeChartImage>
          <Typography variant="p" textTransform="uppercase" fontWeight={500}>
            Sweatshirt Size Chart (CM)
          </Typography>
          <SizeChartImage height={191}>
            <Image
              src={"/sweatshirt-size-chart.jpg"}
              style={{ objectFit: "cover" }}
              sizes="100%"
              alt=""
              fill
              priority
            />
          </SizeChartImage>
          <Typography variant="p" textTransform="uppercase" fontWeight={500}>
            Hoodie Size Chart (CM)
          </Typography>
          <SizeChartImage height={186}>
            <Image
              src={"/hoodie-size-chart.jpg"}
              style={{ objectFit: "cover" }}
              sizes="100%"
              alt=""
              fill
              priority
            />
          </SizeChartImage>
        </SizeChartWrapper>
      </Modal>
      <Section>
        <Container>
          <ProductDisplay productImages={productImages} />
          <ProductDetails
            productDetails={productDetails}
            setToast={setToast}
            handleShowSizeChart={handleShowSizeChart}
          />
        </Container>
        <RelatedProducts productsList={[productDetails]} />
      </Section>
    </>
  );
};

interface ProductDisplayProps {
  productImages: IProductImage[];
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ productImages }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    if (carouselContainer) {
      carouselContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselContainer) {
        carouselContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [selectedIndex]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    const carouselContainer = carouselRef.current;
    if (carouselContainer) {
      const itemWidth = carouselContainer.offsetWidth;
      const scrollAmount = index * itemWidth;
      if (index === productImages.length - 1) {
        const itemWidth = carouselContainer.offsetWidth;
        carouselContainer.scrollTo({
          left: scrollAmount + itemWidth,
          behavior: "smooth",
        });
      } else {
        carouselContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    const carouselContainer = carouselRef.current;
    if (carouselContainer) {
      const scrollPosition = carouselContainer.scrollLeft;
      const itemWidth = carouselContainer.offsetWidth;
      const index = Math.round(scrollPosition / itemWidth);
      setSelectedIndex(index);
    }
  };

  return (
    <ProductImageDisplay>
      <MainImage ref={carouselRef}>
        {productImages &&
          productImages.map((image, i) => (
            <ProductImage key={i}>
              <Image
                src={image.url}
                fill
                sizes="(max-width: 1200px) 35rem, 55rem"
                alt=""
                priority
                quality={100}
              />
            </ProductImage>
          ))}
      </MainImage>
      <ImageList>
        {productImages &&
          productImages.map((image, i) => (
            <ProductImageSmall
              key={i}
              onClick={() => handleClick(i)}
              animate={selectedIndex === i ? { boxShadow: "0 0 0 1px" } : {}}
              transition={{ delay: 0.05, duration: 0.05 }}
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
    </ProductImageDisplay>
  );
};

interface ProductDetailsProps {
  productDetails: IProductData;
  setToast: (toast: ToastProps) => void;
  handleShowSizeChart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productDetails,
  setToast,
  handleShowSizeChart,
}) => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [selectedSize, setSelectedSize] = useState<number>(-1);

  const handleSelectSize = (index: number) => {
    setSelectedSize(index);
  };

  const handleAddToBag = async () => {
    const newItem = {
      ...productDetails,
      size: getSizeValue(selectedSize),
    };
    if (isAuthenticated) {
      const newItems = [
        // @ts-ignore
        ...user.items,
        newItem,
      ];
      // Update user items' state
      await createDocument("Users", {
        ...user,
        items: newItems,
      });
    } else {
      const guestItems = localStorage.getItem("items");
      if (guestItems) {
        const updatedItems = [...JSON.parse(guestItems), newItem];
        localStorage.setItem("items", JSON.stringify(updatedItems));
      } else {
        localStorage.setItem("items", JSON.stringify([newItem]));
      }
      window.dispatchEvent(new Event("storage"));
    }
    handleSelectSize(-1);
    setToast({
      open: true,
      type: "success",
      message: "Great choice! Added to your bag.",
    });
  };

  return (
    <ProductDetailsWrapper>
      {productDetails && (
        <>
          <Typography variant="h2" fontWeight={500}>
            {productDetails.name}
          </Typography>
          <CategoriesWrapper>
            {productDetails.category.map((c: Category, index: number) => (
              <Chip key={c.id} to={`/#${productDetails.category[index].id}`}>
                {c.name}
              </Chip>
            ))}
          </CategoriesWrapper>
          <Typography variant="h3">{productDetails.description}</Typography>
          <Typography variant="h3" fontWeight={500}>
            {productDetails.variant}
          </Typography>
          <List
            onSelect={handleSelectSize}
            value={selectedSize}
            items={productDetails.sizes.map((size: Size) => {
              const inStock = productDetails.stock.find(
                (s: Stock) => s.size === size && s.quantity > 0
              );
              return {
                label: !inStock ? `${size} - Out of stock` : size,
                value: size,
                disabled: !inStock,
              };
            })}
          />
          <div>
            {!isDiscountExpired(productDetails.discountExpiry ?? "") && (
              <Chip
                variant="secondary"
                color="orange"
                style={{ marginBottom: ".6rem" }}
                active
              >
                <Typography
                  variant="p"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  Offer ends in{" "}
                  {getOfferDuration(productDetails.discountExpiry)}
                </Typography>
                <FontAwesomeIcon
                  icon={faClock}
                  fontSize={".8rem"}
                  style={{ paddingLeft: ".4rem" }}
                />
              </Chip>
            )}
            <ProductPrice>
              <Typography variant="h3" fontWeight={500}>
                RM{" "}
                {!isDiscountExpired(productDetails.discountExpiry ?? "")
                  ? productDetails.discountedPrice?.toFixed(2)
                  : productDetails.originalPrice.toFixed(2)}
              </Typography>
              {!isDiscountExpired(productDetails.discountExpiry ?? "") && (
                <DiscountPrice>
                  <Typography
                    variant="h3"
                    textDecoration={"line-through"}
                    fontWeight={500}
                  >
                    RM {productDetails.originalPrice.toFixed(2)}
                  </Typography>
                </DiscountPrice>
              )}
            </ProductPrice>
          </div>
          <Wrapper>
            <ButtonWrapper>
              {!isReleased(productDetails.releaseDate) && (
                <Timer targetDate={productDetails.releaseDate} />
              )}
              <Button
                variant="contained"
                disabled={
                  selectedSize === -1 || !isReleased(productDetails.releaseDate)
                }
                style={{ justifyContent: "center" }}
                onClick={handleAddToBag}
                fullWidth
              >
                {!isReleased(productDetails.releaseDate) ? (
                  <Typography variant="p">COMING SOON</Typography>
                ) : (
                  <Typography variant="p">ADD TO BAG</Typography>
                )}
              </Button>
            </ButtonWrapper>
            <ViewSizeChart>
              <Button variant="text" onClick={handleShowSizeChart} fullWidth>
                <Typography variant="p">View size chart</Typography>
              </Button>
            </ViewSizeChart>
          </Wrapper>
        </>
      )}
    </ProductDetailsWrapper>
  );
};

export default Page;
