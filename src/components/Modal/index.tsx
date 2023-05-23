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
}

const Modal: React.FC<PropTypes> = ({
  children,
  open = false,
  title,
  onClose,
  clickOutside = true,
  ...props
}) => {
  return (
    <AnimatePresence>
      {open && (
        <ModalContainer>
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
              <Typography variant="h3" fontWeight={500}>
                {title}
              </Typography>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={onClose}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
              />
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalPopup>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default Modal;
