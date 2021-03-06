import { useEffect, useState } from "react";
import Button4 from "../../../components/Button/Button4";
import { currency } from "../../../utils/constant";
import imageToUrl from "../../../utils/functions/imageToUrl";
import numberWithCommas from "../../../utils/functions/numberWithCommas";
import { useViewport } from "../../../utils/hook/useViewport";
import { ItemCart } from "../../../utils/types/ItemCart";

interface CheckoutCartProps {
    products: ItemCart[];
    onCheckout: () => void;
    donateAmount: number;
}

const CheckoutCart: React.FC<CheckoutCartProps> = ({
    products,
    onCheckout,
    donateAmount,
}) => {
    const { isMobile } = useViewport();
    return (
        <div
            className={`checkout-cart px-4 py-5 full-height is-flex is-flex-direction-column ${
                !isMobile && "checkout-cart-shadow"
            }`}
        >
            <div className="block">
                <h2 className="is-size-3 has-text-weight-bold is-uppercase">
                    Sản phẩm
                </h2>
                <p className="is-size-7 is-italic has-text-grey has-text-weight-light">
                    ({products.length} sản phẩm)
                </p>
            </div>
            <div className="block mb-auto">
                {products.map((item, id) => (
                    <CheckoutCartItem item={item} key={id} />
                ))}
            </div>
            <hr />
            <div className="is-flex is-align-items-center is-justify-content-space-between has-text-grey">
                <p>Tổng tiền hàng</p>
                <p>
                    {numberWithCommas(
                        products.reduce(
                            (prev, cur) =>
                                prev + cur.product.price * cur.amount,
                            0
                        )
                    )}
                    <span>{currency.vn}</span>
                </p>
            </div>
            <div className="is-flex is-align-items-center is-justify-content-space-between has-text-grey">
                <p>Phí vận chuyển</p>
                <p>-</p>
            </div>
            <div className="is-flex is-align-items-center is-justify-content-space-between has-text-grey">
                <p>Tiền quyên góp</p>
                <p>
                    {numberWithCommas(donateAmount)}
                    <span>{currency.vn}</span>
                </p>
            </div>
            <div className="is-flex is-align-items-center is-justify-content-space-between has-text-grey">
                <p>Tổng thanh toán</p>
                <p className="is-size-4" style={{ color: "#E56138" }}>
                    {numberWithCommas(
                        products.reduce(
                            (prev, cur) =>
                                prev + cur.product.price * cur.amount,
                            0
                        ) + donateAmount
                    )}
                    <span>{currency.vn}</span>
                </p>
            </div>
            <hr />
            <div className="is-flex is-justify-content-flex-end">
                {/* <Button3 className="checkout-button">Thanh toán</Button3> */}
                <Button4
                    className="checkout-button"
                    onClick={() => onCheckout()}
                >
                    Thanh toán
                </Button4>
            </div>
        </div>
    );
};

interface CheckoutCartItemProps {
    item: ItemCart;
}

const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({ item }) => {
    const { isMobile } = useViewport();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const getImages = async () => {
            const result = await imageToUrl(item.product.images);
            setImages(result);
        };
        getImages();
    }, []);

    return (
        <div className={`${isMobile ? "is-flex" : "columns"} is-variable is-1`}>
            <div className="column is-3">
                <figure className="image">
                    <img src={images[0]} alt="" />
                </figure>
            </div>
            <div className="column is-6 py-4">
                <div>
                    <p
                        className="has-text-weight-semibold"
                        style={{ letterSpacing: "0.3px" }}
                    >
                        {item.product.name}
                    </p>
                </div>
            </div>
            <div className="column is-3">
                <div className="has-text-right">
                    <p>
                        {numberWithCommas(item.product.price)}{" "}
                        <span>{currency.vn}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCart;
