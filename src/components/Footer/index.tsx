import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/Typography";
import {
  FooterContainer,
  FooterSection,
  FooterAbout,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        {/* <Link href={"https://www.instagram.com/2amrecords_/"} target="_blank">
          <Image src={"/instagram.png"} alt="" width={28} height={28} />
        </Link> */}
      </FooterSection>
      <FooterAbout>
        <Typography variant="small" fontWeight={500} paddingBottom={"1rem"}>
          {`PRODUCT ALL MADE FOR UNISEX`}
        </Typography>
        <Typography variant="small" fontWeight={500} paddingBottom={"1rem"} textAlign="justify">
          {`2AMRECORDS IS ESTABILISED IN 2022 AND IT'S A BRAND BASED ON FASHION AND
        CULTURAL COMMUNICATION. WE USE FEELING AND EMOTION AS SOURCES OF
        INSPIRATION WHEN DEVELOPING OUR PRODUCTS. THE PRODUCT ARE MADE TO
        INSPIRE OTHERS TO WEAR OUR DESIGN TO EXPRESS THEIR EMOTION. WE BELIEVE OUR BRAND AND PEOPLE'S EMOTION ARE CONNECTED.`}
        </Typography>
        {/* <Typography
          variant="h3"
          fontWeight={700}
          letterSpacing={".2rem"}
          paddingBottom={"1rem"}
        >
          {`2AMRECORDS`}
        </Typography> */}
      </FooterAbout>
    </FooterContainer>
  );
};

export default Footer;
