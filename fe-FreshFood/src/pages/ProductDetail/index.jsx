import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductImageSlide from './ProductImageSlide';
import { useParams } from 'react-router-dom';
import PriceFormat from '../../components/PriceFormat';
import RatingsBlock from './RatingsBlock';
import RelatedProductBlock from './RelatedProductsBlock';
import LatestProductBlock from './LatestProductsBlock';
import QuantityInput from '../../components/QuantityInput';
import { orderActions } from '../../redux/slices/orderSlice';
import { orderSelector } from '../../redux/selectors';

export default function ProductDetail() {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const [qty, setQty] = useState(1);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct();
    }, [id]);
    function getProduct() {
        fetch('http://localhost:5000/api/product' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    const _product = resJson.product;
                    const ratingAvg = _product.ratings.length
                        ? _product.ratings.reduce((prev, curr) => prev + curr.score, 0) /
                          _product.ratings.length
                        : 0;
                    _product.ratingAvg = ratingAvg;
                    setProduct(_product);
                } else {
                    setProduct({});
                }
            });
    }

    function handleAddToCart() {
        if (order.details.find((d) => d.product._id === product._id)) {
            toast.info('Sản phẩm đã có trong giỏ hàng!');
        } else {
            dispatch(orderActions.addMany({ product, quantity: qty, price: product?.price }));
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        }
    }

    return (
        <div className="px-[8vw] py-6">
            <div className="flex items-start">
                <div className="flex-1">
                    <div className="flex">
                        {/* IMAGES */}
                        <div className="mr-6 w-[480px]">
                            <div>
                                <ProductImageSlide
                                    images={
                                        product?.images?.length > 0
                                            ? product?.images
                                            : ['/placeholder.png']
                                    }
                                />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 ">
                            <p className="font-bold text-gray-900 text-2xl">{product?.name}</p>
                            <p className="text-primary-600 font-semibold text-xl mt-2">
                                <PriceFormat>{product?.price}</PriceFormat> VNĐ
                            </p>
                            <div className="flex items-center mt-3 space-x-3">
                                <div className="flex space-x-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star, index) =>
                                        star <= Math.round(product?.ratingAvg) ? (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                                />
                                            </svg>
                                        )
                                    )}
                                </div>
                                <p className="text-gray-600">
                                    {product?.ratings?.length + ' Đánh giá'}
                                </p>
                            </div>
                            <p className="mt-3 space-x-1 font-medium">
                                <span className="text-gray-600">Loại sản phẩm:</span>
                                <span className="text-primary-600">{product?.type?.name}</span>
                            </p>

                            <p className="mt-2 space-x-1 font-medium">
                                <span className="text-gray-600">Số lượng hiện có:</span>
                                <span className="text-primary-600">{product?.quantity}</span>
                            </p>

                            <p className="mt-2 space-x-1 font-medium">
                                <span className="text-gray-600">Đã bán:</span>
                                <span className="text-primary-600">{product?.saledQuantity}</span>
                            </p>

                            <p className="text-gray-600 mt-3 max-w-[360px]">
                                {product?.description}
                            </p>

                            {/* ACTION GROUP */}
                            <div className="flex items-center mt-4 space-x-2">
                                <QuantityInput
                                    value={qty}
                                    setValue={setQty}
                                    min={1}
                                    max={product?.quantity}
                                />
                                <button
                                    className="btn bg-primary-600 hover:bg-primary-700 btn-md w-full"
                                    onClick={handleAddToCart}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                    <RatingsBlock product={product} />
                </div>

                {/* RIGHT */}
                <div className="w-[300px] ml-6 space-y-6">
                    <RelatedProductBlock product={product} />
                    <LatestProductBlock product={product} />
                </div>
            </div>
        </div>
    );
}
