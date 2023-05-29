import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { UserContext } from "@/lib/context";
import { LoadingWrapper, LoadingText } from "./styles";

const Loading: React.FC = () => {
  const router = useRouter();
  const { loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setLoading]);

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
