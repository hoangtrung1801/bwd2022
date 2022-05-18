import { getDownloadURL, ref } from "firebase/storage";
import { Eye } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../app/slices/cartSlice";
import storage from "../../firebase";
import { Product } from "../../utils/types/Product";
import Button2 from "../Button/Button2";
import './product-card.css';

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {

    const [showAnoImg, setShowAnoImg] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const imagesArray: string[] = [];
        product.images.forEach(async (image) => {
            const imageRef = ref(storage, `images/${image}`);
            const url = await getDownloadURL(imageRef);
            setImages([...images, url]);
        })
    }, []);

    return (
        <div className="product-card full-width has-cursor-pointer">
            <figure className="image is-1by1 block has-cursor-pointer" onMouseOver={() => setShowAnoImg(true)} onMouseLeave={() => setShowAnoImg(false)}>
                <img src={product.images[0]} alt="" />
                <img src={product.images[1] || product.images[0]} className={` ${showAnoImg ? 'image-show' : 'image-hidden'}`} alt="" />
                {/* <img src={images[0]} alt="" />
                <img src={images[1] || images[0]} className={` ${showAnoImg ? 'image-show' : 'image-hidden'}`} alt="" /> */}

                <div className={ `product-card-view py-2 is-flex is-align-items-center is-justify-content-center is-uppercase is-size-7 ${showAnoImg  ? '' : 'is-hidden'}`}> <Eye /><p className="ml-1"> View</p></div>
            </figure>
            <div className="has-text-centered">
                <div className="block">
                    <Link to="#" className="product-card-title has-text-weight-semibold">{product.name}</Link>
                </div>
                {/* <h6 className="my-3">${product.price.toFixed(2).toString()}</h6> */}
                <Button2 onClick={() => dispatch(addToCart(product))}>THÊM VÀO GIỎ</Button2>
            </div>
        </div>
    )
}

export default ProductCard;