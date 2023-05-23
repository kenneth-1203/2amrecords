import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/ProductCard";
import { IProductData } from "@/shared/interfaces";

interface PropTypes {
  list: IProductData[];
  slidesPerView?: number;
}

const ProductList: React.FC<PropTypes> = ({ list, slidesPerView = 3 }) => {
  return (
    <Swiper slidesPerView={slidesPerView} spaceBetween={40}>
      {list.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductList;
