// @ts-ignore
import Slider from "react-slick";
import { motion, useAnimation, Variants } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NextArrowCarousel from "../../../../components/NextArrowCarousel";
import PrevArrowCarousel from "../../../../components/PrevArrowCarousel";
import ProductCard from "../../../../components/ProductCard";
import TagNew from "../../../../components/Tag/TagNew";
import { Product } from "../../../../utils/types/Product";
import "./product-carousel.css";
import { inViewDropupShow } from "../../../../utils/variants";
import { useViewport } from "../../../../utils/hook/useViewport";

interface ProductCarouselProps {
    products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const { isMobile } = useViewport();

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 4,
        nextArrow: <NextArrowCarousel />,
        prevArrow: <PrevArrowCarousel />,
        responsive: [
            {
                breakpoint: 1204,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <motion.div
            className="product-carousel-wrapper"
            style={{ padding: isMobile ? "3rem 1rem" : "3rem" }}
        >
            <div className="has-text-centered" style={{ letterSpacing: "1px" }}>
                <p className="is-size-4 has-text-weight-bold is-relative product-carousel-title is-uppercase mb-2">
                    S???n ph???m m???i
                </p>
                <div className="is-flex is-justify-content-center is-align-items-center mb-2">
                    <svg
                        fill="currentColor"
                        style={{
                            height: "0.25rem",
                            width: "8rem",
                            color: "var(--green-6)",
                        }}
                    >
                        <rect width="100%" height="100%"></rect>
                    </svg>
                </div>
                <p style={{ fontSize: "0.85rem" }}>
                    {/* M???t d??ng g?? ???? n??n ???????c ghi ??? ????y */}
                    {/* Nh???ng s???n ph???m ???ng h??t v???a ???????c ra m???t, v???i ??a d???ng ???ng h??t l??m t??? c??c nguy??n li???u thi??n nhi??n kh??c nhau, gi??p gi???m th???i kh?? nh???a r???t nhi???u so v???i s???n ph???m ???ng h??t nh???a th??ng th?????ng */}
                    Nh???ng s???n ph???m m???i s??? lu??n ???????c c???p nh???t ??? ????y
                </p>
            </div>

            <motion.div
                className="py-2 is-relative product-carousel"
                style={{ padding: isMobile ? "0.5rem 3rem" : "0.5rem 3rem" }}
                variants={inViewDropupShow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Slider {...settings}>
                    {products.map((product, id) => (
                        <div className="px-2 py-4" key={id}>
                            <ProductCard product={product} tag={<TagNew />} />
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </motion.div>
    );
};

export default ProductCarousel;
