import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PriceFormat from '../../components/PriceFormat';
import apiConfig from '../../configs/apiConfig';

export default function RelatedProductBlock({ product }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (product) {
            getProducts();
        }
    }, [product]);

    function getProducts() {
        fetch(apiConfig.apiUrl + '/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    let _product = resJson.products
                        .filter((p) => p.type?._id === product?.type?._id && p._id !== product._id)
                        .splice(0, 5);
                    setProducts(_product);
                } else {
                    setProducts([]);
                }
            });
    }

    return products?.length ? (
        <div className="rounded-lg bg-gray-50 p-5">
            <p className="text-xl font-medium">Sản phẩm liên quan</p>
            <div className="mt-6 space-y-4">
                {products.map((p, index) => (
                    <Link to={'/product/' + p?.id} className="flex space-x-2" key={index}>
                        <img
                            className="h-[70px] w-[70px] rounded object-cover"
                            src={p?.images?.length ? p?.images[0] : '/placeholder.png'}
                        />
                        <div>
                            <p className="font-medium">{p?.name}</p>
                            <p className="font-medium text-primary-600">
                                <PriceFormat>{p?.price}</PriceFormat> VNĐ
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : null;
}
