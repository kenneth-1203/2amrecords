import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/lib/context";
import {
  createDocument,
  checkDocumentExists,
  signIn,
  signUp,
} from "@/api/index";
import { ILoginForm, ISignUpForm, IUserDetails } from "@/shared/interfaces";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import Typography from "@/components/Typography";
import {
  Container,
  NavbarContainer,
  NavbarTitleWrapper,
  NavbarTitle,
  NavbarSubtitle,
  NavbarWrapper,
  ItemCounter,
  SidebarWrapper,
  SidebarButton,
  DrawerBackdrop,
  DrawerContainer,
  DrawerCloseButton,
  DrawerContents,
  DrawerBody,
  DrawerAction,
  FormContainer,
  Line,
} from "./styles";

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useContext<any>(UserContext);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const sidebarVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    setCount(user.items?.length);
  }, [user.items]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <Head>
        {openDrawer && (
          <style>{`
          body {
            overflow: hidden;
          }
        `}</style>
        )}
      </Head>
      <Container>
        <Drawer
          isAuthenticated={isAuthenticated}
          user={user as IUserDetails}
          open={openDrawer}
          onClose={toggleDrawer}
        />
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarTitleWrapper>
              <Link href={"/"} replace>
                <NavbarTitle>2AMRECORDS</NavbarTitle>
                <NavbarSubtitle>EST. 2022</NavbarSubtitle>
              </Link>
            </NavbarTitleWrapper>
            <SidebarWrapper>
              <Link href={"/bag"}>
                <SidebarButton
                  initial={"hidden"}
                  animate={"visible"}
                  exit={"hidden"}
                  variants={sidebarVariants}
                >
                  {!_.isEmpty(user.items) && (
                    <ItemCounter
                      animate={
                        count < user.items?.length
                          ? { y: [0, -50, 0] }
                          : { y: 0 }
                      }
                    >
                      {user.items?.length}
                    </ItemCounter>
                  )}
                  <motion.span
                    animate={
                      _.isEmpty(user.items) ? { opacity: 0.1 } : { opacity: 1 }
                    }
                  >
                    <FontAwesomeIcon icon={faBagShopping} fontSize={"1.2rem"} />
                  </motion.span>
                </SidebarButton>
              </Link>
              <SidebarButton onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faBars} fontSize={"1.2rem"} />
              </SidebarButton>
            </SidebarWrapper>
          </NavbarWrapper>
        </NavbarContainer>
      </Container>
    </>
  );
};

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {
  isAuthenticated: boolean;
  user: IUserDetails;
  open: boolean;
  onClose: () => void;
}

type MODAL_STATE = "login" | "sign up";

const Drawer: React.FC<PropTypes> = ({
  isAuthenticated,
  user,
  open,
  onClose,
}) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [modalState, setModalState] = useState<MODAL_STATE>("login");

  useEffect(() => {
    if (user) {
      setOpenPopup(false);
    }
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const { user } = result;
          const isExistingUser = await checkDocumentExists("Users", user.uid);
          if (!isExistingUser) {
            await createDocument("Users", {
              id: user.uid,
              fullName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: user.metadata.creationTime,
              lastSignedIn: user.metadata.lastSignInTime,
              provider: "google",
              country: "Malaysia",
              phoneNumber: "",
              addressLine1: "",
              addressLine2: "",
              state: "",
              postcode: "",
              items: [], // TODO: Add existing items from guest
              orderHistory: [],
            });
          }
          // TODO: Add a welcome modal/toast
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // TODO: Add confirmation modal/toast
    auth.signOut();
    if (router.pathname !== "/") {
      router.replace("/");
    } else {
      router.replace(router.pathname);
    }
    onClose();
  };

  const togglePopup = () => {
    onClose();
    setModalState("login");
    setOpenPopup(true);
  };

  return (
    <>
      <Modal
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        title={modalState}
        position={"absolute"}
      >
        <AnimatePresence>
          {modalState === "login" ? (
            <LoginForm
              setModalState={setModalState}
              loginWithGoogle={loginWithGoogle}
            />
          ) : (
            <SignUpForm setModalState={setModalState} />
          )}
        </AnimatePresence>
      </Modal>
      <AnimatePresence>
        {open && (
          <>
            <DrawerBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <DrawerContainer
              initial={{ width: "0" }}
              animate={{ width: "auto" }}
              exit={{ width: "0" }}
            >
              <DrawerContents>
                <DrawerCloseButton>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                    color="rgba(0,0,0,.3)"
                  />
                </DrawerCloseButton>
                <DrawerBody>
                  {!isAuthenticated ? (
                    <DrawerAction onClick={togglePopup}>
                      <Typography variant="h2">login / signup</Typography>
                    </DrawerAction>
                  ) : (
                    <>
                      <Link href="/profile">
                        <DrawerAction onClick={onClose}>
                          <Typography variant="h2">profile</Typography>
                        </DrawerAction>
                      </Link>
                      <Link href="/profile?section=orders">
                        <DrawerAction onClick={onClose}>
                          <Typography variant="h2">orders</Typography>
                        </DrawerAction>
                      </Link>
                      <Link href="/profile?section=settings">
                        <DrawerAction onClick={onClose}>
                          <Typography variant="h2">settings</Typography>
                        </DrawerAction>
                      </Link>
                      <Line />
                      <DrawerAction onClick={handleLogout}>
                        <Typography variant="h2">logout</Typography>
                      </DrawerAction>
                    </>
                  )}
                </DrawerBody>
              </DrawerContents>
            </DrawerContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const LoginForm: React.FC<{
  setModalState: (state: MODAL_STATE) => void;
  loginWithGoogle: () => void;
}> = ({ setModalState, loginWithGoogle }) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const loginWithEmail = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { results, error } = await signIn(formData);
    if (results) {
      // TODO: Add a welcome modal/toast
    }
    if (error) {
      setError(error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (error) setError(null);
    // @ts-ignore
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <FormContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InputField
        onChange={(e) => handleChange(e)}
        type="email"
        id="email"
        label="Email"
        fullWidth
      />
      <InputField
        onChange={(e) => handleChange(e)}
        type="password"
        id="password"
        label="Password"
        fullWidth
      />
      <Typography variant="small" marginBottom={".4rem"} color="red">
        {error}
      </Typography>
      <Button
        onClick={loginWithEmail}
        variant="contained"
        fullWidth
        style={{ justifyContent: "center" }}
      >
        <Typography fontWeight={500}>Login</Typography>
      </Button>
      <Button
        onClick={() => setModalState("sign up")}
        variant="contained"
        fullWidth
        style={{ justifyContent: "center" }}
        endIcon={<FontAwesomeIcon icon={faChevronRight} />}
      >
        <Typography fontWeight={500}>Sign up</Typography>
      </Button>
      <Typography fontWeight={500} textAlign="center">
        or
      </Typography>
      <Button
        onClick={loginWithGoogle}
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faGoogle} fontSize={"1rem"} />}
        fullWidth
        style={{ justifyContent: "center" }}
      >
        <Typography fontWeight={500}>Login with Google</Typography>
      </Button>
    </FormContainer>
  );
};

const SignUpForm: React.FC<{
  setModalState: (state: MODAL_STATE) => void;
}> = ({ setModalState }) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ISignUpForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signUpWithEmail = async () => {
    const { results, error } = await signUp(formData);
    if (results) {
      // automatically sign user in
      await signIn({ email: formData.email, password: formData.password });
      // TODO: Add a welcome modal/toast
    }
    if (error) {
      setError(error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (error) setError(null);
    // @ts-ignore
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <FormContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputField
        onChange={(e) => handleChange(e)}
        type="text"
        id="fullName"
        label="Full name"
        fullWidth
      />
      <InputField
        onChange={(e) => handleChange(e)}
        type="email"
        id="email"
        label="Email"
        fullWidth
      />
      <InputField
        onChange={(e) => handleChange(e)}
        type="password"
        id="password"
        label="Password"
        fullWidth
      />
      <InputField
        onChange={(e) => handleChange(e)}
        type="password"
        id="confirmPassword"
        label="Confirm password"
        fullWidth
      />
      <Typography variant="small" marginBottom={".4rem"} color="red">
        {error}
      </Typography>
      <Button
        onClick={signUpWithEmail}
        variant="contained"
        fullWidth
        style={{ justifyContent: "center" }}
      >
        <Typography fontWeight={500}>Submit</Typography>
      </Button>
      <Button
        onClick={() => setModalState("login")}
        variant="contained"
        fullWidth
        style={{ justifyContent: "center" }}
        startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
      >
        <Typography fontWeight={500}>Go back</Typography>
      </Button>
    </FormContainer>
  );
};

export default Navbar;
