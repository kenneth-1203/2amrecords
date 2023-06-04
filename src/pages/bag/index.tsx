import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createDocument, getDocumentRef, getFileURL } from "@/api/index";
import { UserContext } from "@/lib/context";
import { IBagItem, IShippingInfo, IUserDetails } from "@/shared/interfaces";
import List from "@/components/List";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
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
  ShippingContainer,
  InputWrapper,
} from "@/styles/Bag";

const Page: React.FC = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  // @ts-ignore
  const userRef = getDocumentRef(`Users/${user.id}`);
  const [userDocument] = useDocumentData(userRef);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

  useEffect(() => {
    if (userDocument) {
      setUserDetails(userDocument as IUserDetails);
    } else {
      // @ts-ignore
      setUserDetails(user as IUserDetails);
    }
  }, [userDocument, user]);

  if (!userDetails) return <h1>Loading...</h1>;

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
          />
          {!_.isEmpty(userDetails.items) && (
            <CheckoutSummary
              isAuthenticated={isAuthenticated}
              userDetails={userDetails}
            />
          )}
        </BagContainer>
      </Container>
    </>
  );
};

interface PropTypes {
  userDetails: IUserDetails;
  isAuthenticated: boolean;
}

const BagItemsList: React.FC<PropTypes> = ({
  userDetails,
  isAuthenticated,
}) => {
  const [itemList, setItemList] = useState<IBagItem[] | []>([]);

  useEffect(() => {
    if (userDetails.items) {
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userDetails.items]);

  const handleRemoveItem = async (itemId: string) => {
    const newItemsList = userDetails.items;
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
          Your shopping bag ({itemList.length})
        </Typography>
      </TitleWrapper>
      <ItemListContainer>
        {!_.isEmpty(itemList) ? (
          <List
            items={itemList.map((item) => {
              return {
                label: (
                  <ItemWrapper>
                    <Link href={`/products/${item.id}`}>
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
                    </Link>
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
  const router = useRouter();
  const [shippingData, setShippingData] = useState<IShippingInfo>({
    fullName: userDetails?.fullName,
    email: userDetails?.email,
    phoneNumber: userDetails?.phoneNumber,
    country: userDetails?.country ?? "Malaysia",
    addressLine1: userDetails?.addressLine1,
    addressLine2: userDetails?.addressLine2,
    state: userDetails?.state,
    postcode: userDetails?.postcode,
  });

  const getTotalAmount = () => {
    let totalAmount = 0;
    const priceArray = userDetails.items.map(
      (item: IBagItem) => item.discountedPrice ?? item.originalPrice
    );
    priceArray.forEach((price: number) => (totalAmount += price));
    return Math.round(totalAmount).toFixed(2);
  };

  const handleContinueShopping = () => {
    router.replace("/");
  };

  const handleProceedToCheckout = async () => {
    
  };

  return (
    <CheckoutContainer>
      <SummaryContainer>
        <ShippingDetails
          shippingData={shippingData}
          setShippingData={setShippingData}
        />
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
                  + RM{" "}
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

interface ShippingDetailsProps {
  shippingData: IShippingInfo;
  setShippingData: (data: IShippingInfo) => void;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  shippingData,
  setShippingData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.id]: e.target.value });
  };

  return (
    <ShippingContainer>
      <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
        Delivery information
      </Typography>
      <InputField
        id="fullName"
        type="text"
        label="Full name"
        value={shippingData.fullName}
        onChange={handleChange}
        fullWidth
      />
      <InputField
        type="email"
        label="Email"
        value={shippingData.email}
        onChange={handleChange}
        fullWidth
      />
      <InputWrapper>
        <InputField
          id="phoneNumber"
          type="number"
          label="Phone number"
          value={shippingData.phoneNumber}
          onChange={handleChange}
          fullWidth
          placeholder="e.g: 0123456789"
        />
        <InputField
          id="country"
          type="text"
          label="Country"
          value={shippingData.country}
          onChange={handleChange}
          fullWidth
          disabled={true}
          placeholder="e.g: Malaysia"
        />
      </InputWrapper>
      <InputField
        id="addressLine1"
        type="text"
        label="Address (Line 1)"
        value={shippingData.addressLine1}
        onChange={handleChange}
        fullWidth
        placeholder="e.g: 69 Jalan 1, 50088 Kuala Lumpur, Malaysia"
      />
      <InputField
        id="addressLine2"
        type="text"
        label="Address (Line 2)"
        value={shippingData.addressLine2}
        onChange={handleChange}
        fullWidth
        placeholder="Optional"
      />
      <InputWrapper>
        <InputField
          id="state"
          type="text"
          label="State"
          value={shippingData.state}
          onChange={handleChange}
          fullWidth
          placeholder="e.g: Kuala Lumpur"
        />
        <InputField
          id="postcode"
          type="number"
          label="Postcode"
          value={shippingData.postcode}
          onChange={handleChange}
          fullWidth
          placeholder="e.g: 50088"
        />
      </InputWrapper>
    </ShippingContainer>
  );
};

export default Page;
