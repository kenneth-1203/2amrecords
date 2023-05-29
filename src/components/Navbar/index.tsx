import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AnimatePresence } from "framer-motion";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { createDocument, signIn, signUp } from "@/api/index";
import { ILoginForm, ISignUpForm } from "@/shared/interfaces";
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
import { UserContext } from "@/lib/context";

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
        <Drawer open={openDrawer} onClose={toggleDrawer} />
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarTitleWrapper>
              <Link href={"/"} replace>
                <NavbarTitle>2AMRECORDS</NavbarTitle>
                <NavbarSubtitle>EST. 2022</NavbarSubtitle>
              </Link>
            </NavbarTitleWrapper>
            <SidebarWrapper>
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
  open: boolean;
  onClose: () => void;
}

type MODAL_STATE = "login" | "sign up";

const Drawer: React.FC<PropTypes> = ({ open, onClose }) => {
  const { user } = useContext(UserContext);
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
        .then((result) => {
          const { user } = result;
          createDocument("Users", {
            id: user.uid,
            fullName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: user.metadata.creationTime,
            lastSignedIn: user.metadata.lastSignInTime,
            provider: "google",
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            state: "",
            postcode: "",
            orderHistory: [],
          });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.replace(router.pathname);
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
                  />
                </DrawerCloseButton>
                <DrawerBody>
                  {_.isEmpty(user) ? (
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
                      <DrawerAction onClick={onClose}>
                        <Typography variant="h2">orders</Typography>
                      </DrawerAction>
                      <Line />
                      <DrawerAction onClick={onClose}>
                        <Typography variant="h2">settings</Typography>
                      </DrawerAction>
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
      console.log(results);
    }
    if (error) {
      console.log(error);
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
