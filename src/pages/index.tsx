import { NextPage } from "next/types";
import Head from "next/head";
import _ from "lodash";
import { motion } from "framer-motion";
import { ICategoryData, IProductData } from "@/shared/interfaces";
import { getDocuments } from "@/api/index";
import Typography from "@/components/Typography";
import Chip from "@/components/Chip";
import ProductList from "@/components/ProductList";
import {
  Categories,
  Background,
  Section,
  Featured,
  Header,
  Line,
  HeaderList,
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
        <title>Create Next App</title>
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
    <Section>
      {categoryList
        ? categoryList.map((category) => {
            const pl = productList.filter((product) =>
              product.category.some((p) => p === category.id)
            );
            const categoryName = !_.isEmpty(category.name) ?? category.name;
            const categoryTitle = !_.isEmpty(category.title) ?? category.title;
            const categoryDescription =
              !_.isEmpty(category.description) ?? category.description;
            return (
              <Featured key={category.id}>
                <Header>
                  {categoryName && (
                    <motion.div whileHover={{ letterSpacing: ".2rem" }}>
                      <Typography
                        variant="h2"
                        fontWeight={500}
                        textOverflow="clip"
                        whiteSpace="nowrap"
                        paddingBottom=".4rem"
                      >
                        {category.name}
                      </Typography>
                    </motion.div>
                  )}
                  {categoryTitle && (
                    <motion.div whileHover={{ letterSpacing: ".2rem" }}>
                      <Typography
                        variant="h2"
                        fontWeight={300}
                        textOverflow="clip"
                        whiteSpace="nowrap"
                        paddingBottom=".4rem"
                      >
                        {category.title}
                      </Typography>
                    </motion.div>
                  )}
                  {categoryDescription && (
                    <motion.div whileHover={{ letterSpacing: ".2rem" }}>
                      <Typography
                        variant="h2"
                        fontWeight={300}
                        textOverflow="clip"
                        whiteSpace="nowrap"
                        paddingBottom=".4rem"
                      >
                        {category.description}
                      </Typography>
                    </motion.div>
                  )}
                </Header>
                <Line></Line>
                <HeaderList>
                  <ProductList
                    list={pl}
                    slidesPerView={pl.length > 3 ? 3 : pl.length}
                  />
                </HeaderList>
              </Featured>
            );
          })
        : null}
    </Section>
  );
}

export default Page;
