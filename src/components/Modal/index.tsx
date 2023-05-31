import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  ModalBackdrop,
  ModalContainer,
  ModalPopup,
  ModalHeader,
  ModalBody,
} from "./styles";
import Typography from "@/components/Typography";

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: string | undefined;
  onClose: () => void;
  clickOutside?: boolean;
  position?: "absolute" | "fixed";
}

const Modal: React.FC<PropTypes> = ({
  children,
  open = false,
  title,
  onClose,
  position = "fixed",
  clickOutside = true,
}) => {
  return (
    <>
      <Head>
        {open && (
          <style>{`
          body {
            overflow: hidden;
          }
        `}</style>
        )}
      </Head>
      <AnimatePresence>
        {open && (
          <ModalContainer position={position}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalBackdrop onClick={clickOutside ? onClose : undefined} />
            </motion.div>
            <ModalPopup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ModalHeader>
                <Typography variant="h2" fontWeight={500}>
                  {title}
                </Typography>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={onClose}
                  style={{ cursor: "pointer", fontSize: "1.4rem" }}
                  color="rgba(0,0,0,.3)"
                />
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </ModalPopup>
          </ModalContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
