import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/Typography";
import {
  FooterContainer,
  FooterSection,
  FooterAbout,
  SocialHandle,
} from "./styles";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection whileHover={{ width: "160px" }}>
        <Image src={"/instagram.png"} alt="" width={28} height={28} />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <Link href={"https://www.instagram.com/2amrecords_/"} target="_blank">
            <SocialHandle>{`@2amrecords_`}</SocialHandle>
          </Link>
        </motion.div>
      </FooterSection>
      <FooterAbout>
        <Typography variant="small" paddingBottom={"1rem"}>
          {`PRODUCT ALL MADE FOR UNISEX`}
        </Typography>
        <Typography variant="small" paddingBottom={"1rem"}>
          {`2AMRECORDS IS ESTABILISED IN 2022 AND IT'S A BRAND BASED ON FASHION AND
        CULTURAL COMMUNICATION. WE USE FEELING AND EMOTION AS SOURCES OF
        INSPIRATION WHEN DEVELOPING OUR PRODUCTS. THE PRODUCT ARE MADE TO
        INSPIRE OTHERS TO WEAR OUR DESIGN TO EXPRESS THEIR EMOTION. WE BELIEVE OUR BRAND AND PEOPLE'S EMOTION ARE CONNECTED.`}
        </Typography>
        <Typography
          variant="h3"
          fontWeight={500}
          letterSpacing={".2rem"}
          paddingBottom={"1rem"}
        >
          {`2AMRECORDS`}&copy;
        </Typography>
      </FooterAbout>
    </FooterContainer>
  );
};

export default Footer;
