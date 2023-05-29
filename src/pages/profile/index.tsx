import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import _ from "lodash";
import { motion } from "framer-motion";
import { UserContext } from "@/lib/context";
import {
  createDocument,
  deleteFile,
  getFileURL,
  uploadFile,
} from "@/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
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
  ButtonsWrapper,
  WelcomeContainer,
} from "@/styles/Profile";

const Page: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [section, setSection] = useState<number>(0);

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setUserDetails(user as IUserDetails);
    }
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0] && userDetails) {
      setIsUploading(true);
      const file = e.currentTarget.files[0];
      const pathToStorage = `ProfileImages/${userDetails.id}`;
      const { results } = await uploadFile(file, pathToStorage);
      if (results) {
        const { results: uploadedURL } = await getFileURL(pathToStorage);
        await createDocument("Users", {
          ...userDetails,
          photoURL: uploadedURL,
        });
        setIsUploading(false);
      }
    }
  };

  const handleRemove = async () => {
    if (userDetails) {
      setIsUploading(true);
      const pathToStorage = `ProfileImages/${userDetails.id}`;
      await createDocument("Users", {
        ...userDetails,
        photoURL: "",
      });
      await deleteFile(pathToStorage);
      setIsUploading(false);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
  
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  return (
    <Section>
      {userDetails && (
        <>
          <WelcomeContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: .5, duration: .5 }}
          >
            <Typography variant="h2" fontWeight={300}>{getGreeting()}, {userDetails.fullName}</Typography>
          </WelcomeContainer>
          <Container
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfileSelection>
              <ProfilePictureWrapper>
                <ProfilePicture>
                  <Image
                    src={
                      userDetails.photoURL
                        ? userDetails.photoURL
                        : "/default-pp.png"
                    }
                    alt=""
                    fill
                    sizes="(max-width: 1200px) 12rem, 12rem"
                    quality={100}
                  />
                </ProfilePicture>
                <InputField
                  type="file"
                  onChange={handleUpload}
                  disabled={isUploading}
                  label={
                    isUploading ? (
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
                      "UPLOAD PHOTO"
                    )
                  }
                />
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ justifyContent: "center" }}
                  disabled={isUploading}
                  onClick={handleRemove}
                >
                  <Typography variant="p" textTransform="uppercase">
                    Remove photo
                  </Typography>
                </Button>
              </ProfilePictureWrapper>
              <ProfileOptionsWrapper>
                <Button
                  onClick={() => setSection(0)}
                  selected={section === 0}
                  fullWidth
                  style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                >
                  <Typography variant="p" textTransform="uppercase">
                    Profile details
                  </Typography>
                </Button>
                <Button
                  onClick={() => setSection(1)}
                  selected={section === 1}
                  fullWidth
                  style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                >
                  <Typography variant="p" textTransform="uppercase">
                    Orders
                  </Typography>
                </Button>
                <Button
                  onClick={() => setSection(2)}
                  selected={section === 2}
                  fullWidth
                  style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
                >
                  <Typography variant="p" textTransform="uppercase">
                    Settings
                  </Typography>
                </Button>
              </ProfileOptionsWrapper>
            </ProfileSelection>
            {section === 0 && <ProfileDetails userDetails={userDetails} />}
            {section === 1 && <ProfileDetails userDetails={userDetails} />}
            {section === 2 && <ProfileDetails userDetails={userDetails} />}
          </Container>
        </>
      )}
    </Section>
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
            type="number"
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
          <InputField
            id="state"
            type="text"
            label="State"
            value={details?.state}
            onChange={handleChange}
            fullWidth
            disabled={!editMode}
            placeholder="e.g: Kuala Lumpur"
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
      <h1>Orders</h1>
    </ProfileInfo>
  );
};

export default Page;
