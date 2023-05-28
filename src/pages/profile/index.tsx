import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";
import { UserContext } from "@/lib/context";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
import NotFound from "@/components/NotFound";
import { IUserDetails } from "@/shared/interfaces";
import {
  Container,
  Section,
  ProfileSelection,
  ProfilePictureWrapper,
  ProfilePicture,
  ProfileOptionsWrapper,
  ProfileInfo,
  ProfileDetailsWrapper,
  ShippingInformationWrapper,
  Wrapper,
} from "@/styles/pages/Profile";

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setUserDetails(user as IUserDetails);
      console.log(user);
    }
  }, [user]);

  if (_.isEmpty(user)) {
    return <NotFound />;
  }

  return (
    <Section>
      <Container>
        <ProfileSelection>
          <ProfilePictureWrapper>
            <ProfilePicture>
              {userDetails && (
                <Image
                  src={userDetails.photoURL}
                  alt=""
                  fill
                  sizes="(max-width: 1200px) 12rem, 12rem"
                  quality={100}
                />
              )}
            </ProfilePicture>
            <Button
              variant="contained"
              fullWidth
              style={{ justifyContent: "center" }}
            >
              <Typography variant="p" textTransform="uppercase">
                Upload photo
              </Typography>
            </Button>
          </ProfilePictureWrapper>
          <ProfileOptionsWrapper>
            <Button
              fullWidth
              style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
            >
              <Typography variant="p" textTransform="uppercase">
                Profile details
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
            >
              <Typography variant="p" textTransform="uppercase">
                Orders
              </Typography>
            </Button>
            <Button
              fullWidth
              style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
            >
              <Typography variant="p" textTransform="uppercase">
                Settings
              </Typography>
            </Button>
          </ProfileOptionsWrapper>
        </ProfileSelection>
        {userDetails && <ProfileDetails userDetails={userDetails} />}
      </Container>
    </Section>
  );
};

interface IProfileDetails {
  userDetails: IUserDetails;
}

const ProfileDetails: React.FC<IProfileDetails> = ({ userDetails }) => {
  const [details, setDetails] = useState<IUserDetails>(userDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  return (
    <ProfileInfo>
      <ProfileDetailsWrapper>
        <h1>Profile details</h1>
        <InputField
          id="fullName"
          type="text"
          label="Full name"
          value={details?.fullName}
          onChange={handleChange}
          fullWidth
        />
        <InputField
          type="email"
          label="Email"
          value={details?.email}
          onChange={handleChange}
          fullWidth
        />
      </ProfileDetailsWrapper>
      <ShippingInformationWrapper>
        <h1>Shipping Information</h1>
        <InputField
          id="phoneNumber"
          type="number"
          label="Phone number"
          value={details?.phoneNumber}
          onChange={handleChange}
        />
        <h3>Address</h3>
        <InputField
          id="addressLine1"
          type="text"
          label="Line 1"
          value={details?.addressLine1}
          onChange={handleChange}
          fullWidth
        />
        <InputField
          id="addressLine2"
          type="text"
          label="Line 2"
          value={details?.addressLine2}
          onChange={handleChange}
          fullWidth
        />
        <Wrapper>
          <InputField
            id="state"
            type="text"
            label="State"
            value={details?.state}
            onChange={handleChange}
            fullWidth
          />
          <InputField
            id="postcode"
            type="number"
            label="Postcode"
            value={details?.postcode}
            onChange={handleChange}
            fullWidth
          />
        </Wrapper>
        <Button variant="contained">
          <Typography variant="p" textTransform="uppercase">
            Save
          </Typography>
        </Button>
      </ShippingInformationWrapper>
    </ProfileInfo>
  );
};

const ProfileOrders: React.FC = () => {
  return (
    <ProfileInfo>
      <h1>Orders</h1>
    </ProfileInfo>
  );
};

export default Page;
