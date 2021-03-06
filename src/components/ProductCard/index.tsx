import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../app/slices/cartSlice";
import { currency } from "../../utils/constant";
import imageToUrl from "../../utils/functions/imageToUrl";
import numberWithCommas from "../../utils/functions/numberWithCommas";
import toastAddToCart from "../../utils/functions/toastAddToCart";
import { Product } from "../../utils/types/Product";
import "./product-card.css";

interface ProductCardProps {
    product: Product;
    tag?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, tag }) => {
    const [star, setStar] = useState(Math.ceil(Math.random() * 3 + 2));
    const [isLoved, setIsLoved] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        const fakeFetch = new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(addToCart({ product, amount: 1 }));
                resolve(0);
            }, 800);
        });

        toastAddToCart(fakeFetch);
    };

    useEffect(() => {
        const getImages = async () => {
            const result = await imageToUrl(product.images);
            setImages(result);
        };
        getImages();
    }, [product]);

    return (
        <motion.div
            className="product-card full-width full-height is-flex is-flex-direction-column is-clickable is-relative"
            // whileHover={{ y: "-10px" }}
            // onMouseOver={() => setShowAnoImg(true)}
            // onMouseLeave={() => setShowAnoImg(false)}
        >
            <div className="product-card-tag">{tag}</div>
            <Link to={`/product/${product.id}`}>
                <motion.figure
                    className="image is-1by1 block has-cursor-pointer"
                    style={{ overflow: "hidden" }}
                >
                    <img src={images[0]} alt="" />
                </motion.figure>
            </Link>

            <div className="mt-2 px-4 py-2 is-flex is-flex-direction-column is-justify-content-space-between is-flex-grow-1">
                <div
                    className="has-text-centered"
                    style={{
                        height: "2rem",
                        overflow: "hidden",
                        textOverflow: "clip",
                    }}
                >
                    <Link
                        to={`/product/${product.id}`}
                        className="product-card-title is-size-5 has-text-weight-bold font-heading"
                    >
                        {product.name}
                    </Link>
                </div>
                <div className="mt-1">
                    <div className="has-text-centered">
                        {Array(star)
                            .fill(0)
                            .map((_, id) => (
                                <Star
                                    key={id}
                                    weight="fill"
                                    color="var(--color-3)"
                                />
                            ))}
                        {Array(5 - star)
                            .fill(0)
                            .map((_, id) => (
                                <Star key={id} />
                            ))}
                    </div>

                    <div className="is-flex is-justify-content-space-between is-align-items-center mb-2 mt-3 px-1">
                        <div onClick={() => setIsLoved(!isLoved)}>
                            {isLoved ? (
                                <Heart
                                    className="is-size-4 is-clickable"
                                    weight="fill"
                                    color="red"
                                />
                            ) : (
                                <Heart className="is-size-4 is-clickable" />
                            )}
                        </div>

                        <div className="is-flex is-align-items-center is-justify-content-center is-flex-grow-1">
                            <h6 className="is-size-5 has-text-weight-semibold ">
                                {numberWithCommas(product.price)} {currency.vn}
                            </h6>
                        </div>
                        <ShoppingCart
                            className="product-card-add is-size-4 is-clickable"
                            onClick={handleAdd}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
