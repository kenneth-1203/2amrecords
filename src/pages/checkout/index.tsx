import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { IBagItem, IUserDetails } from "@/shared/interfaces";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
import { UserContext } from "@/lib/context";
import Select from "@/components/Select";
import { malaysiaStates } from "@/data/countries";
import {
  Container,
  ShippingForm,
  InputWrapper,
  Summary,
  SummaryItem,
} from "@/styles/Checkout";
import Button from "@/components/Button";

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [page, setPage] = useState<"checkout" | "success" | "canceled">(
    "checkout"
  );

  useEffect(() => {
    const { success, canceled } = router.query;
    if (success) {
      setPage("success");
    }
    if (canceled) {
      setPage("canceled");
    }
  }, [router.query]);

  useEffect(() => {
    if (user) {
      setUserDetails(user as IUserDetails);
      console.log(user);
    }
  }, [user]);

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
      const deliveryFees = getDeliveryFees();
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userDetails,
          deliveryFees,
        }),
      });
      const { url } = await response.json();
      router.replace(url);
    }
  };

  return (
    <Container>
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
            fullWidth
            required
          />
          <InputField
            type="email"
            label="Email"
            value={userDetails?.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputWrapper>
            <InputField
              id="phoneNumber"
              type="number"
              label="Phone number"
              value={userDetails?.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g: 0123456789"
            />
            <InputField
              id="country"
              type="text"
              label="Country"
              value={userDetails?.country}
              onChange={handleChange}
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
            <Button variant="contained">
              <Typography variant="p" textTransform="uppercase">
                Proceed to payment
              </Typography>
            </Button>
          </Summary>
        </ShippingForm>
      ) : page === "success" ? (
        <>
          {/* TODO:
            1. Create success UI
            2. Add successful payment as order to "Orders" collection 
          */}
        </>
      ) : page === "canceled" ? (
        <>
          {/* TODO:
            1. Create canceled UI
            2. Add canceled payment as order to "Orders" collection
          */}
        </>
      ) : null}
    </Container>
  );
};

export default Page;
