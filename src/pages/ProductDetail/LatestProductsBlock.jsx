import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PriceFormat from '../../components/PriceFormat';

export default function LatestProductBlock({ product }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (product) {
            getProducts();
        }
    }, [product]);

    function getProducts() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    let _product = resJson.products
                        .filter((p) => p._id !== product._id)
                        .sort((p1, p2) => p2.id - p1.id)
                        .splice(0, 5);
                    setProducts(_product);
                } else {
                    setProducts([]);
                }
            });
    }

    return products?.length ? (
        <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xl font-medium">Sản phẩm mới nhất</p>
            <div className="mt-6 space-y-4">
                {products.map((p, index) => (
                    <Link to={'/product/' + p?.id} className="flex space-x-2" key={index}>
                        <img
                            className="w-[70px] h-[70px] rounded object-cover"
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
