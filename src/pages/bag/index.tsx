import { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowsUpToLine,
  faChevronRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  createDocument,
  getDocument,
  getDocumentRef,
  getFileURL,
} from "@/api/index";
import { UserContext } from "@/lib/context";
import { IBagItem, IUserDetails } from "@/shared/interfaces";
import { isDiscountExpired } from "@/shared/utils";
import List from "@/components/List";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import RelatedProducts from "@/components/RelatedProducts";
import {
  ButtonsWrapper,
  Container,
  DiscountPrice,
  BagContainer,
  BagItemsContainer,
  TitleWrapper,
  ItemListContainer,
  ItemWrapper,
  ItemImage,
  ItemDetails,
  TextWrapper,
  PriceWrapper,
  RemoveItemButton,
  NoItemsWrapper,
  CheckoutContainer,
  SummaryContainer,
  SummaryItemList,
  SummaryItem,
  SummaryWrapper,
  SummaryItemTotal,
  IconWrapper,
} from "@/styles/Bag";

const Page: React.FC = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const router = useRouter();
  // @ts-ignore
  const userRef = getDocumentRef(`Users/${user.id}`);
  const [userDocument] = useDocumentData(userRef);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [userItems, setUserItems] = useState<IBagItem[] | []>([]);

  useEffect(() => {
    if (userDocument) {
      setUserDetails(userDocument as IUserDetails);
    } else {
      // @ts-ignore
      setUserDetails(user as IUserDetails);
    }
  }, [userDocument, user]);

  useMemo(() => {
    if (userDetails?.items) {
      const newList = userDetails?.items.map(async (item: IBagItem) => {
        const updatedItem: any = await getDocument("Products", item.id);
        const { results } = await getFileURL(`Products/${item.id}/1.jpg`);
        return {
          id: item.id,
          active: updatedItem.active,
          name: updatedItem.name,
          description: updatedItem.description,
          category: updatedItem.category,
          size: item.size,
          variant: updatedItem.variant,
          discountedPrice: updatedItem.discountedPrice,
          discountExpiry: updatedItem.discountExpiry,
          originalPrice: updatedItem.originalPrice,
          imageURL: results ?? "",
        };
      });
      Promise.all(newList ?? [])
        .then((resolvedList) => {
          const activeItems = resolvedList.filter(
            (item) =>
              item.active && {
                id: item.id,
                category: item.category,
                size: item.size,
              }
          );
          createDocument("Users", {
            ...userDetails,
            items: activeItems,
          });
          setUserItems(activeItems as IBagItem[]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userDetails]);

  const handleContinueShopping = () => {
    router.replace("/");
  };

  const handleProceedToCheckout = async () => {
    router.replace("/checkout");
  };

  if (!userDetails) return <Loading show />;

  return (
    <>
      <Head>
        <title>2AMRECORDS - Shopping Bag</title>
      </Head>
      <Container>
        <BagContainer>
          <BagItemsList
            isAuthenticated={isAuthenticated}
            userDetails={userDetails}
            userItems={userItems}
            handleContinueShopping={handleContinueShopping}
          />
          {!_.isEmpty(userDetails.items) && (
            <CheckoutSummary
              userItems={userItems}
              handleContinueShopping={handleContinueShopping}
              handleProceedToCheckout={handleProceedToCheckout}
            />
          )}
        </BagContainer>
        <RelatedProducts productsList={userDetails.items} />
      </Container>
    </>
  );
};

interface BagItemsListProps {
  userDetails: IUserDetails;
  userItems: IBagItem[];
  isAuthenticated: boolean;
  handleContinueShopping: () => void;
  handleProceedToCheckout?: () => void;
}

const BagItemsList: React.FC<BagItemsListProps> = ({
  userItems,
  userDetails,
  isAuthenticated,
  handleContinueShopping,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleRemoveItem = async (itemId: string) => {
    const newItemsList = userItems;
    const index = newItemsList.findIndex(
      (item: IBagItem) => item.id === itemId
    );
    newItemsList.splice(index, 1);
    if (isAuthenticated) {
      await createDocument(`Users`, {
        ...userDetails,
        items: newItemsList,
      });
    } else {
      localStorage.setItem("items", JSON.stringify(newItemsList));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <BagItemsContainer>
      <TitleWrapper>
        <Typography variant="h3" fontWeight={500}>
          Your shopping bag ({userItems.length})
        </Typography>
      </TitleWrapper>
      <ItemListContainer>
        {!_.isEmpty(userItems) ? (
          <List
            items={userItems.map((item) => {
              return {
                label: (
                  <AnimatePresence>
                    <ItemWrapper
                      initial={"hidden"}
                      animate={"visible"}
                      variants={variants}
                    >
                      <Link href={`/products/${item.id}`}>
                        <ItemImage>
                          <Image
                            src={item.imageURL}
                            style={{ objectFit: "contain" }}
                            loading="lazy"
                            alt=""
                            fill
                            sizes="@media query (max-width: 1200px) 100px 160px"
                            quality={25}
                          />
                        </ItemImage>
                        <ItemDetails>
                          <TextWrapper lineClamp={1}>
                            <Typography
                              variant="p"
                              textTransform="uppercase"
                              fontWeight={500}
                            >
                              {item.name}
                            </Typography>
                          </TextWrapper>
                          <TextWrapper lineClamp={3}>
                            <Typography variant="p" textTransform="uppercase">
                              {item.description}
                            </Typography>
                          </TextWrapper>
                          <Typography variant="p" textTransform="uppercase">
                            {item.variant}
                          </Typography>
                          <Typography variant="p" textTransform="uppercase">
                            {item.size}
                          </Typography>
                        </ItemDetails>
                      </Link>
                      <PriceWrapper>
                        <RemoveItemButton
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveItemButton>
                      </PriceWrapper>
                    </ItemWrapper>
                  </AnimatePresence>
                ),
                value: item.id,
              };
            })}
          />
        ) : (
          <NoItemsWrapper
            initial={"hidden"}
            animate={"visible"}
            variants={variants}
          >
            <Typography variant="h3">
              There are no items in your shopping bag.
            </Typography>
            <Link href={"/"}>
              <Button
                fullWidth
                onClick={handleContinueShopping}
                endIcon={
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: [0, 2, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </motion.div>
                }
              >
                <Typography variant="p" textTransform="uppercase">
                  Continue shopping
                </Typography>
              </Button>
            </Link>
          </NoItemsWrapper>
        )}
      </ItemListContainer>
    </BagItemsContainer>
  );
};

interface CheckoutSummaryProps {
  userItems: IBagItem[];
  handleContinueShopping: () => void;
  handleProceedToCheckout?: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  userItems,
  handleContinueShopping,
  handleProceedToCheckout,
}) => {
  const getTotalAmount = () => {
    let totalAmount = 0;
    const priceArray = userItems.map((item: IBagItem) =>
      isDiscountExpired(item.discountExpiry)
        ? item.originalPrice
        : item.discountedPrice ?? item.originalPrice
    );
    priceArray.forEach((price: number) => (totalAmount += price));
    return Math.round(totalAmount).toFixed(2);
  };

  return (
    <CheckoutContainer>
      <SummaryContainer>
        <SummaryItemList>
          {userItems.map((item: IBagItem, i: number) => (
            <SummaryItem key={i}>
              <TextWrapper lineClamp={1}>
                <Typography variant="p" textTransform="uppercase">
                  {item.name}
                </Typography>
              </TextWrapper>
              <PriceWrapper>
                <Typography variant="h3">
                  RM{" "}
                  {!isDiscountExpired(item.discountExpiry)
                    ? item.discountedPrice?.toFixed(2)
                    : item.originalPrice?.toFixed(2)}
                </Typography>
                {!isDiscountExpired(item.discountExpiry) && (
                  <DiscountPrice>
                    <Typography variant="h3" textDecoration={"line-through"}>
                      RM {item.originalPrice.toFixed(2)}
                    </Typography>
                  </DiscountPrice>
                )}
              </PriceWrapper>
            </SummaryItem>
          ))}
        </SummaryItemList>
        <SummaryWrapper>
          <SummaryItemTotal>
            <Typography variant="h3" textTransform="uppercase" fontWeight={500}>
              Total amount
            </Typography>
            <Typography variant="h3" textTransform="uppercase" fontWeight={500}>
              RM {getTotalAmount()}
            </Typography>
          </SummaryItemTotal>
          {3 - userItems.length > 0 && (
            <>
              <SummaryItemTotal>
                <Typography variant="p" textTransform="uppercase" flex={1}>
                  Estimated Delivery Fees
                </Typography>
                <IconWrapper>
                  <FontAwesomeIcon icon={faArrowsUpToLine} />
                </IconWrapper>
                <Typography
                  variant="p"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  RM 10.00
                </Typography>
              </SummaryItemTotal>
              <Typography variant="small" fontWeight={500} opacity={0.4}>
                Add {3 - userItems.length} more{" "}
                {3 - userItems.length > 1 ? "items" : "item"} to your bag and
                get FREE delivery.
              </Typography>
            </>
          )}
          <ButtonsWrapper>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleContinueShopping}
            >
              <Typography variant="p" textTransform="uppercase">
                Continue shopping
              </Typography>
            </Button>
            <Button
              variant="contained"
              endIcon={<FontAwesomeIcon icon={faChevronRight} />}
              fullWidth
              onClick={handleProceedToCheckout}
            >
              <Typography
                variant="p"
                textTransform="uppercase"
                fontWeight={500}
              >
                Proceed to checkout
              </Typography>
            </Button>
          </ButtonsWrapper>
        </SummaryWrapper>
      </SummaryContainer>
    </CheckoutContainer>
  );
};

export default Page;
