import React, { useEffect, useRef } from "react";
import { NextPage } from "next/types";
import Head from "next/head";
import _ from "lodash";
import {
  animate,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { getDocuments } from "@/api/index";
import { PAGES_TITLE } from "@/shared/enums";
import { ICategoryData, IProductData } from "@/shared/interfaces";
import Typography from "@/components/Typography";
import ProductList from "@/components/ProductList";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  Categories,
  HeroContainer,
  CollectionSection,
  CategorySelection,
  ProductSelection,
  Section,
  Wrapper,
  ButtonsWrapper,
  LinearProgress,
  ScrollTo,
} from "@/styles/Home";

export const getStaticProps = async () => {
  const productList: IProductData[] = await getDocuments("Products");
  const categoryList: ICategoryData[] = await getDocuments("Categories");
  return {
    props: {
      productList,
      categoryList: categoryList.sort((a, b) => a.sort - b.sort),
    },
  };
};

interface PropTypes {
  productList: IProductData[];
  categoryList: ICategoryData[];
}

const Page: NextPage<PropTypes> = ({ productList, categoryList }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const handleClick = (category: ICategoryData) => () => {
    const element = document.getElementById(category.id);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY;

    animate(window.scrollY, y, {
      duration: 0,
      onUpdate: (y) => window.scrollTo(0, y),
    });
  };

  return (
    <>
      <Head>
        <title>{PAGES_TITLE.Home}</title>
      </Head>
      <main>
        <Landing />
        <Categories>
          <Wrapper>
            {categoryList &&
              categoryList.map((category: ICategoryData) => {
                const list = productList.filter((product) =>
                  product.category.some(
                    (p) => p.id === category.id && product.active
                  )
                );
                const isActive = list.length > 0;
                return (
                  <Chip
                    key={category.id}
                    onClick={handleClick(category)}
                    disabled={!isActive}
                  >
                    {category.name}
                  </Chip>
                );
              })}
          </Wrapper>
          <LinearProgress style={{ scaleX }} />
        </Categories>
        <Collection productList={productList} categoryList={categoryList} />
      </main>
    </>
  );
};

const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [1, 0], ["0%", "100%"]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      letterSpacing: ".8rem",
      transition: {
        staggerChildren: 0.5,
        duration: 1.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.1, 0.1, 0.1, 1],
      },
    },
  };

  // To ensure initial scale is applied
  useEffect(() => {
    scrollYProgress.set(0);
  }, [scrollYProgress]);

  const handleClick = () => {
    const element = document.getElementById("browse-start");

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY;

    animate(window.scrollY, y, {
      duration: 0,
      onUpdate: (y) => window.scrollTo(0, y),
    });
  };

  return (
    <section
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeroContainer variants={container} initial="hidden" animate="show">
          <video playsInline autoPlay muted loop>
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          <motion.div variants={item}>
            <Typography variant="h1" fontWeight={700} color="white">
              2AMRECORDS
            </Typography>
          </motion.div>
          <motion.div variants={item}>
            <Typography variant="h3" fontWeight={300} color="white">
              Timeless era.
            </Typography>
          </motion.div>
          <ButtonsWrapper variants={item}>
            <Button variant="text" onClick={handleClick}>
              <Typography variant="p" color="white">
                Browse
              </Typography>
              <motion.span
                initial={{ y: -1 }}
                animate={{ y: [-1, 1, -1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <FontAwesomeIcon icon={faArrowDown} color="white" />
              </motion.span>
            </Button>
          </ButtonsWrapper>
        </HeroContainer>
      </div>
    </section>
  );
};

interface CollectionProps {
  categoryList: ICategoryData[];
  productList: IProductData[];
}

const Collection: React.FC<CollectionProps> = ({
  categoryList,
  productList,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.5 };

  return (
    <Section>
      <ScrollTo id={"browse-start"} />
      {categoryList &&
        categoryList.map((category, i) => {
          const list = productList.filter((product) =>
            product.category.some((p) => p.id === category.id && product.active)
          );
          if (list.length > 0) {
            return (
              <React.Fragment key={i}>
                <ScrollTo id={category.id} key={i} />
                <CollectionSection
                  initial={"hidden"}
                  whileInView={"visible"}
                  variants={variants}
                  transition={transition}
                >
                  <CategorySelection>
                    <Typography variant="h2">{category.name}</Typography>
                  </CategorySelection>
                  <ProductSelection>
                    <ProductList list={list} />
                  </ProductSelection>
                </CollectionSection>
              </React.Fragment>
            );
          }
        })}
    </Section>
  );
};

export default Page;
