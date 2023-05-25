import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingWrapper, LoadingText } from "./styles";

const Loading: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <AnimatePresence>
      {loading && (
        <LoadingWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingText
            initial={{ backgroundPositionX: "0" }}
            animate={{
              backgroundPositionX: "15rem",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
              ease: "linear",
            }}
          >
            2AMRECORDS
          </LoadingText>
        </LoadingWrapper>
      )}
    </AnimatePresence>
  );
};

export default Loading;
