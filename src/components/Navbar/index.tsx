import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { initFirebase } from "@/lib/index";
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
  DrawerBackdrop,
  DrawerContainer,
  DrawerContents,
  DrawerBody,
  DrawerAction,
  FormContainer,
} from "./styles";

const Navbar: React.FC = () => {
  initFirebase();
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
            <Button variant="text" onClick={toggleDrawer}>
              <FontAwesomeIcon icon={faBars} fontSize={"1.2rem"} />
            </Button>
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
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [modalState, setModalState] = useState<MODAL_STATE>("login");

  useEffect(() => {
    if (user) {
      setOpenPopup(false);
    }
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      createDocument("Users", {
        id: user.uid,
        fullName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.metadata.creationTime,
        lastSignedIn: user.metadata.lastSignInTime,
        provider: "google",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.refresh();
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
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DrawerBackdrop onClick={onClose} />
            </motion.div>
            <DrawerContainer
              initial={{ width: "0" }}
              animate={{ width: "auto" }}
              exit={{ width: "0" }}
            >
              <DrawerContents>
                <Button
                  style={{
                    padding: 0,
                    fontSize: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                  />
                </Button>
                <DrawerBody>
                  {!user ? (
                    <DrawerAction
                      onClick={togglePopup}
                      whileHover={{ letterSpacing: ".2rem" }}
                    >
                      <Typography variant="h3">login / signup</Typography>
                    </DrawerAction>
                  ) : (
                    <DrawerAction
                      onClick={handleLogout}
                      whileHover={{ letterSpacing: ".2rem" }}
                    >
                      <Typography variant="h3">log off</Typography>
                    </DrawerAction>
                  )}
                </DrawerBody>
              </DrawerContents>
            </DrawerContainer>
          </div>
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
      <Button onClick={loginWithEmail} variant="contained" center fullWidth>
        <Typography fontWeight={500}>Login</Typography>
      </Button>
      <Button
        onClick={() => setModalState("sign up")}
        variant="contained"
        center
        fullWidth
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
        center
        fullWidth
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
      <Button onClick={signUpWithEmail} variant="contained" center fullWidth>
        <Typography fontWeight={500}>Submit</Typography>
      </Button>
      <Button
        onClick={() => setModalState("login")}
        variant="contained"
        center
        fullWidth
      >
        <Typography fontWeight={500}>Go back</Typography>
      </Button>
    </FormContainer>
  );
};

export default Navbar;
