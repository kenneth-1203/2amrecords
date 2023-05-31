import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import {
  faSquareCheck,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Container, ToastContainer } from "./styles";

interface PropTypes extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
  timeout?: number;
  type: "warning" | "error" | "success";
}

const Toast: React.FC<PropTypes> = ({
  children,
  open = false,
  type,
  timeout,
  onClose,
}) => {
  const variants = {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: -50 },
  };

  useEffect(() => {
    const timeoutInSeconds = timeout ? timeout * 1000 : 5000;
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, timeoutInSeconds);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, onClose, timeout]);

  return (
    <AnimatePresence>
      {open ? (
        <Container>
          <ToastContainer
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            variants={variants}
          >
            {type === "warning" ? (
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                color="rgb(240, 183, 0)"
                fontSize={"1.2rem"}
              />
            ) : type === "error" ? (
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                color="rgb(221,83,83)"
                fontSize={"1.2rem"}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquareCheck}
                color="rgb(53, 184, 90)"
                fontSize={"1.2rem"}
              />
            )}
            {children}
            <FontAwesomeIcon
              icon={faXmark}
              color="rgba(0,0,0,.3)"
              fontSize={"1.2rem"}
              style={{ cursor: "pointer" }}
              onClick={onClose}
            />
          </ToastContainer>
        </Container>
      ) : null}
    </AnimatePresence>
  );
};

export default Toast;
