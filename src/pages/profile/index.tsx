import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
import { motion } from "framer-motion";
import { UserContext } from "@/lib/context";
import { createDocument } from "@/api/index";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
import Select from "@/components/Select";
import { malaysiaStates } from "@/data/countries";
import { IUserDetails } from "@/shared/interfaces";
import {
  Container,
  Section,
  ProfileSelection,
  ProfileOptionsWrapper,
  ProfileInfo,
  ProfileDetailsWrapper,
  ShippingInformationWrapper,
  Wrapper,
  ButtonsWrapper,
  ProfileOrdersInfo,
  OrdersList,
  OrderItem,
  OrderItemHeader,
  OrderStatus,
  OrderItemBody,
  OrderItemContent,
  OrderSummary,
} from "@/styles/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type ProfileSections = "profile" | "orders" | "settings";

const Page: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(UserContext);
  const { section } = router.query;
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [currentSection, setCurrentSection] =
    useState<ProfileSections>("profile");

  useEffect(() => {
    if (section) {
      setCurrentSection(section as ProfileSections);
    }
  }, [section]);

  useEffect(() => {
    if (isAuthenticated) {
      setUserDetails(user as IUserDetails);
    }
  }, [isAuthenticated, router, user]);

  return (
    <>
      <Head>
        <title>2AMRECORDS - Profile</title>
      </Head>
      <Section>
        {userDetails && (
          <>
            <Container
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProfileSelection>
                <ProfileOptionsWrapper>
                  <Button
                    onClick={() => setCurrentSection("profile")}
                    selected={currentSection === "profile"}
                    fullWidth
                    style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                  >
                    <Typography variant="p" textTransform="uppercase">
                      Profile
                    </Typography>
                  </Button>
                  <Button
                    onClick={() => setCurrentSection("orders")}
                    selected={currentSection === "orders"}
                    fullWidth
                    style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                  >
                    <Typography variant="p" textTransform="uppercase">
                      Orders
                    </Typography>
                  </Button>
                  <Button
                    onClick={() => setCurrentSection("settings")}
                    selected={currentSection === "settings"}
                    fullWidth
                    style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                  >
                    <Typography variant="p" textTransform="uppercase">
                      Settings
                    </Typography>
                  </Button>
                </ProfileOptionsWrapper>
              </ProfileSelection>
              {currentSection === "profile" && (
                <ProfileDetails userDetails={userDetails} />
              )}
              {currentSection === "orders" && (
                <ProfileOrders userDetails={userDetails} />
              )}
              {currentSection === "settings" && <ProfileSettings />}
            </Container>
          </>
        )}
      </Section>
    </>
  );
};

interface PropsWithUserDetails {
  userDetails: IUserDetails;
}

const ProfileDetails: React.FC<PropsWithUserDetails> = ({ userDetails }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [details, setDetails] = useState<IUserDetails>(userDetails);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleStateChange = (state: any) => {
    setDetails({ ...userDetails, state } as IUserDetails);
  };

  const handleEdit = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
      setDetails(userDetails);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    createDocument("Users", details).then(() => {
      setIsSaving(false);
      setEditMode(false);
    });
  };

  return (
    <ProfileInfo>
      <ProfileDetailsWrapper>
        <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
          Profile details
        </Typography>
        <InputField
          id="fullName"
          type="text"
          label="Full name"
          value={details?.fullName}
          onChange={handleChange}
          fullWidth
          disabled={!editMode}
        />
        <InputField
          type="email"
          label="Email"
          value={details?.email}
          onChange={handleChange}
          fullWidth
          disabled={true}
        />
        <Typography variant="small">
          Please note that in order to complete your purchase, we kindly request
          you to update your shipping information at checkout. The information
          you provide is primarily used for delivery purposes, and we assure you
          that it will be kept confidential.
        </Typography>
      </ProfileDetailsWrapper>
      <ShippingInformationWrapper>
        <Typography variant="h3" fontWeight={500} paddingBottom={"1rem"}>
          Shipping Information
        </Typography>
        <Wrapper>
          <InputField
            id="phoneNumber"
            type="text"
            label="Phone number"
            value={details?.phoneNumber}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            placeholder="e.g: 0123456789"
          />
          <InputField
            id="country"
            type="text"
            label="Country"
            value={details?.country}
            onChange={handleChange}
            fullWidth
            disabled={true}
            placeholder="e.g: Malaysia"
          />
        </Wrapper>
        <InputField
          id="addressLine1"
          type="text"
          label="Address (Line 1)"
          value={details?.addressLine1}
          onChange={handleChange}
          fullWidth
          disabled={!editMode}
          placeholder="e.g: 69 Jalan 1, 50088 Kuala Lumpur, Malaysia"
        />
        <InputField
          id="addressLine2"
          type="text"
          label="Address (Line 2)"
          value={details?.addressLine2}
          onChange={handleChange}
          fullWidth
          disabled={!editMode}
          placeholder="Optional"
        />
        <Wrapper>
          <Select
            label="State"
            fullWidth
            value={details?.state}
            disabled={!editMode}
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
            value={details?.postcode}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            placeholder="e.g: 50088"
          />
        </Wrapper>
      </ShippingInformationWrapper>
      <ButtonsWrapper>
        <Button variant="outlined" onClick={handleEdit}>
          <Typography variant="p" textTransform="uppercase">
            {editMode ? "Cancel" : "Edit"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!editMode || isSaving}
        >
          <Typography variant="p" textTransform="uppercase">
            Save
          </Typography>
        </Button>
      </ButtonsWrapper>
    </ProfileInfo>
  );
};

const ProfileOrders: React.FC<PropsWithUserDetails> = ({ userDetails }) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  const getTotalAmount = (index: number) => {
    let amount = 0;
    userDetails.orderHistory[index].items.map(
      (item) => (amount += Number(item.discountedPrice ?? item.originalPrice))
    );
    return amount.toFixed(2);
  };

  const handleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ProfileOrdersInfo>
      {/* TODO: Populate orders */}
      <Typography variant="h3" fontWeight={500}>
        Orders
      </Typography>
      <OrdersList>
        {userDetails.orderHistory?.map((order, i) => (
          <OrderItem key={i}>
            <OrderItemHeader onClick={() => handleExpand(i)}>
              <motion.span
                animate={
                  expandedIndex === i ? { rotateZ: 180 } : { rotateZ: 0 }
                }
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </motion.span>
              <Typography
                variant="h3"
                fontWeight={500}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {order.id}
              </Typography>
              <OrderStatus status={order.status}>
                <Typography variant="p" fontWeight={500}>
                  {order.status}
                </Typography>
              </OrderStatus>
            </OrderItemHeader>
            <OrderItemBody
              animate={expandedIndex === i ? { height: "auto" } : { height: 0 }}
            >
              {order.items.map((item, i) => (
                <OrderItemContent key={i}>
                  <Typography variant="p" textTransform="uppercase">
                    {item.name}
                  </Typography>
                  <Typography variant="p">
                    RM{" "}
                    {item.discountedPrice
                      ? item.discountedPrice.toFixed(2)
                      : item.originalPrice.toFixed(2)}
                  </Typography>
                </OrderItemContent>
              ))}
              <OrderSummary>
                <Typography
                  variant="p"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  TOTAL
                </Typography>
                <Typography
                  variant="p"
                  textTransform="uppercase"
                  fontWeight={500}
                >
                  RM {getTotalAmount(i)}
                </Typography>
              </OrderSummary>
            </OrderItemBody>
          </OrderItem>
        ))}
      </OrdersList>
    </ProfileOrdersInfo>
  );
};

const ProfileSettings: React.FC = () => {
  return (
    <ProfileInfo>
      {/* TODO: Complete settings UI */}
      <h1>Settings</h1>
    </ProfileInfo>
  );
};

export default Page;
