import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { DocumentData } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createDocument, getDocumentRef, getFileURL } from "@/api/index";
import { UserContext } from "@/lib/context";
import { IBagItem, IUserDetails } from "@/shared/interfaces";
import List from "@/components/List";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
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
  SummaryTotal,
} from "@/styles/Bag";

const Page: React.FC = () => {
  const { user } = useContext(UserContext);
  // @ts-ignore
  const userRef = getDocumentRef(`Users/${user.id}`);
  const [userDetails] = useDocumentData(userRef);

  if (!userDetails) return <h1>Loading...</h1>;

  return (
    <Container>
      <BagContainer>
        <BagItemsList userDetails={userDetails} />
        {!_.isEmpty(userDetails.items) && (
          <CheckoutSummary userDetails={userDetails} />
        )}
      </BagContainer>
    </Container>
  );
};

interface PropTypes {
  userDetails: IUserDetails | DocumentData;
}

const BagItemsList: React.FC<PropTypes> = ({ userDetails }) => {
  const [itemList, setItemList] = useState<IBagItem[] | []>([]);

  useEffect(() => {
    const newList = userDetails.items.map(async (item: IBagItem) => {
      const { results } = await getFileURL(`Products/${item.id}/1.jpg`);
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        size: item.size,
        variant: item.variant,
        discountedPrice: item.discountedPrice,
        originalPrice: item.originalPrice,
        imageURL: results ?? "",
      };
    });
    Promise.all(newList)
      .then((resolvedList) => {
        setItemList(resolvedList);
        console.log(resolvedList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userDetails.items]);

  const handleRemoveItem = async (itemId: string) => {
    const newItemsList = userDetails.items;
    const index = newItemsList.findIndex(
      (item: IBagItem) => item.id === itemId
    );
    newItemsList.splice(index, 1);
    await createDocument(`Users`, {
      ...userDetails,
      items: newItemsList,
    });
  };

  return (
    <BagItemsContainer>
      <TitleWrapper>
        <Typography variant="h3" fontWeight={500}>
          Your shopping bag ({itemList.length})
        </Typography>
      </TitleWrapper>
      <ItemListContainer>
        {!_.isEmpty(itemList) ? (
          <List
            items={itemList.map((item) => {
              return {
                label: (
                  <Link href={`/products/${item.id}`}>
                    <ItemWrapper>
                      <ItemImage>
                        <Image
                          src={item.imageURL}
                          style={{ objectFit: "contain" }}
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
                      <PriceWrapper>
                        <Typography variant="h3">
                          RM{" "}
                          {item.discountedPrice
                            ? item.discountedPrice.toFixed(2)
                            : item.originalPrice.toFixed(2)}
                        </Typography>
                        {item.discountedPrice && (
                          <DiscountPrice>
                            <Typography
                              variant="h3"
                              textDecoration={"line-through"}
                            >
                              RM {item.originalPrice.toFixed(2)}
                            </Typography>
                          </DiscountPrice>
                        )}
                        <RemoveItemButton
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveItemButton>
                      </PriceWrapper>
                    </ItemWrapper>
                  </Link>
                ),
                value: item.id,
              };
            })}
          />
        ) : (
          <NoItemsWrapper>
            <Typography variant="h3">
              There are no items in your shopping bag.
            </Typography>
            <Link href={"/"}>
              <Button
                variant="outlined"
                endIcon={<FontAwesomeIcon icon={faChevronRight} />}
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

const CheckoutSummary: React.FC<PropTypes> = ({ userDetails }) => {
  const getTotalAmount = () => {
    let totalAmount = 0;
    const priceArray = userDetails.items.map(
      (item: IBagItem) => item.discountedPrice ?? item.originalPrice
    );
    priceArray.forEach((price: number) => (totalAmount += price));
    return Math.round(totalAmount).toFixed(2);
  };
  return (
    <CheckoutContainer>
      <SummaryContainer>
        <SummaryItemList>
          {userDetails.items.map((item: IBagItem, i: number) => (
            <SummaryItem key={i}>
              <TextWrapper lineClamp={1}>
                <Typography variant="p" textTransform="uppercase">
                  {item.name}
                </Typography>
              </TextWrapper>
              <PriceWrapper>
                <Typography variant="h3">
                  RM{" "}
                  {item.discountedPrice
                    ? item.discountedPrice.toFixed(2)
                    : item.originalPrice.toFixed(2)}
                </Typography>
                {item.discountedPrice && (
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
          <SummaryTotal>
            <Typography variant="h3" textTransform="uppercase" fontWeight={500}>
              Total amount
            </Typography>
            <Typography variant="h3" textTransform="uppercase" fontWeight={500}>
              RM {getTotalAmount()}
            </Typography>
          </SummaryTotal>
          <ButtonsWrapper>
            <Link href={"/"}>
              <Button variant="outlined" fullWidth>
                <Typography variant="p" textTransform="uppercase">
                  Continue shopping
                </Typography>
              </Button>
            </Link>
            <Link href={"/checkout"}>
              <Button
                variant="contained"
                endIcon={<FontAwesomeIcon icon={faChevronRight} />}
                fullWidth
              >
                <Typography
                  variant="p"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  Proceed to checkout
                </Typography>
              </Button>
            </Link>
          </ButtonsWrapper>
        </SummaryWrapper>
      </SummaryContainer>
    </CheckoutContainer>
  );
};

export default Page;
