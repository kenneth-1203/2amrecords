import { NextPage } from "next/types";
import Head from "next/head";
import _ from "lodash";
import { motion } from "framer-motion";
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
} from "@/styles/pages/Home";

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
  return (
    <>
      <Head>
        <title>{PAGES_TITLE.Home}</title>
      </Head>
      <main>
        <Landing />
        <Categories>
          {categoryList &&
            categoryList.map((category: ICategoryData) => (
              <Chip key={category.id}>{category.name}</Chip>
            ))}
        </Categories>
        <Collection productList={productList} categoryList={categoryList} />
      </main>
    </>
  );
};

function Landing() {
  return (
    <Background>
      <motion.img
        src={"/bg-1.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
      />
      <motion.img
        src={"/bg-2.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
      />
      <motion.img
        src={"/bg-3.png"}
        whileHover={{ scale: 1.05, filter: "saturate(1)" }}
        transition={{ duration: 0.4 }}
      />
    </Background>
  );
}

interface CollectionProps {
  categoryList: ICategoryData[];
  productList: IProductData[];
}

function Collection(props: CollectionProps) {
  const { categoryList, productList } = props;

  return (
    <>
      {categoryList &&
        categoryList.map((category, i) => {
          const list = productList.filter((product) =>
            product.category.some((p) => p === category.id)
          );
          return (
            <Section key={i}>
              <CategorySelection>
                <Typography variant="h3">{category.name}</Typography>
              </CategorySelection>
              <ProductSelection>
                <ProductList list={list} slidesPerView={list.length} />
              </ProductSelection>
            </Section>
          );
        })}
    </>
  );
}

export default Page;
