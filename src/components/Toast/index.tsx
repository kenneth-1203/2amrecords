import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

export const Container = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const ToastContainer = styled(motion.div)`
  max-width: 20rem;
  background: red;
  margin: 1rem;
`;

interface PropTypes {}

const Toast: React.FC<PropTypes> = () => {
  const variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <AnimatePresence>
      <Container>
        <ToastContainer animate={"hidden"} variants={variants}>
          I am a toast
        </ToastContainer>
      </Container>
    </AnimatePresence>
  );
};

export default Toast;
