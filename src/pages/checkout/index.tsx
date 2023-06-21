import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import _ from "lodash";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  IBagItem,
  IOrderDetails,
  IUserDetails,
  Stock,
} from "@/shared/interfaces";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
import { UserContext } from "@/lib/context";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { malaysiaStates } from "@/data/countries";
import { createDocument, deleteDocument } from "@/api/index";
import {
  Container,
  ShippingForm,
  InputWrapper,
  Summary,
  SummaryItem,
  StatusContainer,
  Wrapper,
} from "@/styles/Checkout";

const Page: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [page, setPage] = useState<"checkout" | "success" | "canceled">(
    "checkout"
  );
  const variants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isPageLoading && !_.isEmpty(user)) {
      setUserDetails(user as IUserDetails);
      setIsPageLoading(false);
    }
  }, [user, isPageLoading]);

  useEffect(() => {
    if (userDetails) {
      const { success, canceled, orderId } = router.query;
      if (success && orderId) {
        handleSuccess(user as IUserDetails, orderId as string);
      }
      if (canceled && orderId) {
        handleCanceled(user as IUserDetails, orderId as string);
      }
    }
  }, [router, userDetails]);

  if (_.isEmpty(userDetails?.items)) return null;

  const handleSuccess = async (user: IUserDetails, orderId: string) => {
    if (user?.orderHistory) {
      const existingOrder = user.orderHistory.find(
        (order) => order.id === orderId
      );
      if (!existingOrder) {
        if (isAuthenticated) {
          await createDocument("Users", {
            ...user,
            items: [],
            orderHistory: [
              ...user.orderHistory,
              {
                id: orderId,
                status: "paid",
                items: user.items,
                date: new Date(),
              },
            ],
          } as IUserDetails);
          setOrderDetails({
            id: orderId,
            customer: { fullName: user.fullName },
          });
        }
      }
    } else {
      console.log("Removing local storage items...");
      localStorage.removeItem("items");
      window.dispatchEvent(new Event("storage"));
      setOrderDetails({ id: orderId, customer: { fullName: "Customer" } });
    }
    // Update products stock state
    // handleUpdateProductStock(user);
    setPage("success");
  };

  const handleCanceled = async (user: IUserDetails, orderId: string) => {
    await deleteDocument("Orders", orderId);
    if (isAuthenticated) {
      await createDocument("Users", {
        ...user,
        items: [],
        orderHistory: [
          ...user.orderHistory,
          {
            id: orderId,
            status: "canceled",
            items: user.items,
            date: new Date(),
          },
        ],
      } as IUserDetails);
    }
    setOrderDetails({ id: orderId, customer: { fullName: "User" } });
    setPage("canceled");
  };

  // const handleUpdateProductStock = (user: IUserDetails) => {
  //   user?.items.map(async (item) => {
  //     const { stock, totalQuantity, size } = item;
  //     const quantity = user?.items.filter((i) => i.size === size).length;
  //     const newStock = stock.map((stockItem: Stock) => {
  //       return { ...stockItem, quantity: stockItem.quantity - quantity };
  //     });
  //     const newTotalQuantity = totalQuantity - quantity;
  //     await createDocument("Products", {
  //       ...item,
  //       stock: newStock,
  //       totalQuantity: newTotalQuantity,
  //     });
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    } as IUserDetails);
  };

  const handleStateChange = (state: any) => {
    setUserDetails({ ...userDetails, state } as IUserDetails);
  };

  const getDeliveryFees = () => {
    if (userDetails?.items && userDetails?.items.length >= 3) {
      return 0;
    }
    switch (userDetails?.state) {
      case "Sabah":
      case "Sarawak":
      case "Labuan":
        return 15;
      default:
        return 10;
    }
  };

  const getBagTotalAmount = () => {
    let totalAmount = 0;
    const priceArray = userDetails?.items?.map(
      (item: IBagItem) => item.discountedPrice ?? item.originalPrice
    );
    priceArray && priceArray.forEach((price: number) => (totalAmount += price));
    return Math.round(totalAmount).toFixed(2);
  };

  const getTotalAmount = () => {
    return Number(
      Number(getBagTotalAmount()) + Number(getDeliveryFees())
    ).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails?.items) {
      setIsLoading(true);
      const deliveryFees = getDeliveryFees();
      const orderId = await createDocument("Orders", {
        authenticated: isAuthenticated,
        items: userDetails.items,
        customer: {
          fullName: userDetails.fullName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          addressLine1: userDetails.addressLine1,
          addressLine2: userDetails.addressLine2 ?? "",
          country: userDetails.country ?? "Malaysia",
          state: userDetails.state,
          postcode: userDetails.postcode,
        },
      });
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userDetails,
          deliveryFees,
          orderId,
        }),
      });
      const { url } = await response.json();
      if (url) {
        router.replace(url);
      }
    }
  };

  return (
    <>
      <Head>
        <title>2AMRECORDS - Checkout</title>
      </Head>
      <Container initial={"hidden"} animate={"visible"} variants={variants}>
        {page === "checkout" && userDetails ? (
          <ShippingForm onSubmit={handleSubmit}>
            <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
              Delivery information
            </Typography>
            <InputField
              id="fullName"
              type="text"
              label="Full name"
              value={userDetails?.fullName}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
            />
            <InputField
              id="email"
              type="email"
              label="Email"
              value={userDetails?.email}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
            />
            <InputWrapper>
              <InputField
                id="phoneNumber"
                type="text"
                label="Phone number"
                value={userDetails?.phoneNumber}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
                required
                placeholder="e.g: 0123456789"
              />
              <InputField
                id="country"
                type="text"
                label="Country"
                value={"Malaysia"}
                fullWidth
                required
                disabled={true}
                placeholder="e.g: Malaysia"
              />
            </InputWrapper>
            <InputField
              id="addressLine1"
              type="text"
              label="Address (Line 1)"
              value={userDetails?.addressLine1}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
              placeholder="e.g: 69 Jalan 1, 50088 Kuala Lumpur, Malaysia"
            />
            <InputField
              id="addressLine2"
              type="text"
              label="Address (Line 2)"
              value={userDetails?.addressLine2}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              placeholder="Optional"
            />
            <InputWrapper>
              <Select
                label="State"
                fullWidth
                required
                value={userDetails?.state}
                onChange={handleStateChange}
                disabled={isLoading}
                options={malaysiaStates.sort().map((state) => {
                  return {
                    label: state,
                    value: state,
                  };
                })}
              />
              <InputField
                id="postcode"
                type="number"
                label="Postcode"
                value={userDetails?.postcode}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
                required
                placeholder="e.g: 50088"
              />
            </InputWrapper>
            <Summary>
              <SummaryItem>
                <Typography variant="p" textTransform="uppercase">
                  Delivery fees
                </Typography>
                <Typography variant="p" textTransform="uppercase">
                  {_.isEmpty(userDetails?.state)
                    ? "-"
                    : getDeliveryFees() === 0
                    ? "FREE"
                    : `RM ${getDeliveryFees().toFixed(2)}`}
                </Typography>
              </SummaryItem>
              <SummaryItem>
                <Typography variant="p" textTransform="uppercase">
                  In bag
                </Typography>
                <Typography variant="p" textTransform="uppercase">
                  RM {getBagTotalAmount()}
                </Typography>
              </SummaryItem>
              <SummaryItem>
                <Typography
                  variant="h3"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  Total amount
                </Typography>
                <Typography
                  variant="h3"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  RM {getTotalAmount()}
                </Typography>
              </SummaryItem>
              <Button variant="contained" disabled={isLoading}>
                <Typography variant="p" textTransform="uppercase">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotateZ: 360 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <FontAwesomeIcon icon={faSpinner} />
                    </motion.div>
                  ) : (
                    "Proceed to payment"
                  )}
                </Typography>
              </Button>
            </Summary>
          </ShippingForm>
        ) : page === "success" ? (
          <StatusContainer
            initial={"hidden"}
            animate={"visible"}
            variants={variants}
          >
            <AnimatedCheckArrow />
            <Typography variant="h2" fontWeight={500}>
              Dear {orderDetails?.customer?.fullName},
            </Typography>
            <Typography variant="h3" fontWeight={500}>
              Thank you for shopping with us!
            </Typography>
            <Typography variant="p">
              We are thrilled to confirm that your order has been received and
              is being processed. Kindly allow a duration of <b>2-3</b> business
              days for the delivery process to be successfully finalized.
            </Typography>
            <Typography variant="h3" fontWeight={500}>
              ORDER ID: {orderDetails?.id}
            </Typography>
            <Wrapper>
              <Link href={"/"}>
                <Button variant="outlined">
                  <Typography variant="p" textTransform="uppercase">
                    Continue
                  </Typography>
                </Button>
              </Link>
              {isAuthenticated && (
                <Link href={"/profile?section=orders"}>
                  <Button variant="contained">
                    <Typography variant="p" textTransform="uppercase">
                      View Order
                    </Typography>
                  </Button>
                </Link>
              )}
            </Wrapper>
          </StatusContainer>
        ) : page === "canceled" ? (
          <StatusContainer
            initial={"hidden"}
            animate={"visible"}
            variants={variants}
          >
            <AnimatedCross />
            <Typography variant="h2" fontWeight={500}>
              Dear {orderDetails?.customer?.fullName},
            </Typography>
            <Typography variant="h3" fontWeight={500}>
              Your payment was unsuccessful!
            </Typography>
            <Typography variant="p">
              If this is a mistake, kindly contact our support team or send us
              an email. Sorry for any inconvenience caused.
            </Typography>
            <Typography variant="h3" fontWeight={500}>
              ORDER ID: {orderDetails?.id}
            </Typography>
            <Wrapper>
              <Link href={"/"}>
                <Button variant="outlined">
                  <Typography variant="p" textTransform="uppercase">
                    Continue
                  </Typography>
                </Button>
              </Link>
              <Link href={"mailto:2amrecordsglobal@gmail.com"}>
                <Button variant="contained">
                  <Typography variant="p" textTransform="uppercase">
                    Contact Us
                  </Typography>
                </Button>
              </Link>
            </Wrapper>
          </StatusContainer>
        ) : null}
      </Container>
    </>
  );
};

const AnimatedCheckArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        fill="transparent"
        stroke="rgb(40, 224, 111)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 0.9, 1, 0.9] }}
        transition={{ duration: 1, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
      />
      <motion.path
        d="M16 24l6 6 14-14"
        stroke="rgb(40, 224, 111)"
        strokeWidth="3"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};

const AnimatedCross = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        fill="transparent"
        stroke="rgb(221,83,83)"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 0.9, 1, 0.9] }}
        transition={{ duration: 1, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
      />
      <motion.path
        d="M16 16l16 16M32 16L16 32"
        stroke="rgb(221,83,83)"
        strokeWidth="3"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};

export default Page;
