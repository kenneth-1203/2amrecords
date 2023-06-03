import React from "react";
import { NextPage } from "next/types";
import Head from "next/head";
import _ from "lodash";
import { motion, useScroll, useSpring } from "framer-motion";
import { getDocuments } from "@/api/index";
import { PAGES_TITLE } from "@/shared/enums";
import { ICategoryData, IProductData } from "@/shared/interfaces";
import Typography from "@/components/Typography";
import ProductList from "@/components/ProductList";
import Chip from "@/components/Chip";
import {
  Categories,
  Background,
  Section,
  CategorySelection,
  ProductSelection,
  Wrapper,
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
              categoryList.map((category: ICategoryData) => (
                <Chip key={category.id} to={`#${category.id}`}>
                  {category.name}
                </Chip>
              ))}
          </Wrapper>
          <LinearProgress style={{ scaleX }} />
        </Categories>
        <Collection productList={productList} categoryList={categoryList} />
      </main>
    </>
  );
};

const Landing: React.FC = () => {
  return (
    <Background>
      <motion.img
        src={"/bg-1.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
        loading="lazy"
      />
      <motion.img
        src={"/bg-2.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
        loading="lazy"
      />
      <motion.img
        src={"/bg-3.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
        loading="lazy"
      />
    </Background>
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
    <>
      {categoryList &&
        categoryList.map((category, i) => {
          const list = productList.filter((product) =>
            product.category.some((p) => p.id === category.id)
          );
          return (
            <React.Fragment key={i}>
              <ScrollTo id={category.id} />
              <Section
                initial={"hidden"}
                whileInView={"visible"}
                variants={variants}
                transition={transition}
              >
                <CategorySelection>
                  <Typography variant="h2">{category.name}</Typography>
                </CategorySelection>
                <ProductSelection>
                  <ProductList list={list} slidesPerView={list.length} />
                </ProductSelection>
              </Section>
            </React.Fragment>
          );
        })}
    </>
  );
};

export default Page;
