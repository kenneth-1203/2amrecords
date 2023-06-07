import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
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
} from "@/styles/Profile";

type ProfileSections = "profile" | "orders" | "settings";

const Page: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(UserContext);
  const { section } = router.query;
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
    } else {
      router.replace("/");
    }
  }, [isAuthenticated, router, user]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

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
              {currentSection === "orders" && <ProfileOrders />}
              {currentSection === "settings" && <ProfileSettings />}
            </Container>
          </>
        )}
      </Section>
    </>
  );
};

interface IProfileDetails {
  userDetails: IUserDetails;
}

const ProfileDetails: React.FC<IProfileDetails> = ({ userDetails }) => {
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

const ProfileOrders: React.FC = () => {
  return (
    <ProfileInfo>
      {/* TODO: Populate orders */}
      <h1>Orders</h1>
    </ProfileInfo>
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
