import { NextPage } from "next/types";
import styled from "styled-components";
import { getDocument, getDocuments } from "@/api/index";
import { IProductData } from "@/shared/interfaces";
import Select from "@/components/Select";

export const getStaticPaths = async () => {
  const data = await getDocuments("Products");
  const paths = data.map((product: IProductData) => {
    return {
      params: {
        id: product.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await getDocument("Products", id);
  return {
    props: {
      productDetails: data,
    },
  };
};

interface PropTypes {
  productDetails: IProductData;
}

const Page: NextPage<PropTypes> = ({ productDetails }) => {
  return (
    <Section>
      {productDetails.id}
      <Select
        options={[
          {
            label: "test",
            value: 1,
          },
        ]}
      />
    </Section>
  );
};

const Section = styled.section`
  overflow: hidden;
  margin: 2rem 4rem;
`;

export default Page;
