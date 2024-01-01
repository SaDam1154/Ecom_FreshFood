import Sidebar from '../../layouts/components/Sidebar';
import MyCarousel from '../../components/Carousel';
import HoverLinks from '../../components/HoverLinks';
import { CardProduct } from '../../components/CardProduct';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Products() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            });
    }

    return (
        <div className="flex flex-col w-full h-auto p-8 sm:px-12 lg:px-20 xl:px-28 overflow-y-scroll overflow-x-hidden items-center justify-start">
            {/* khu Sản phẩm */}
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                {/* khu Category */}
                <div className="flex flex-col jite gap-2 bg-slate-100 rounded-2xl p-1 lg:p-2 mr-1 sm:mr-2 lg:mr-3 xl:mr-4 2xl:mr-5">
                    <div className="flex flex-col w-full items-start justify-center gap-1">
                        <span className="text-3xl font-semibold select-none">Category</span>
                        <hr class=" bg-green-400 w-12 h-1 border-0 rounded" />
                    </div>
                    <HoverLinks />
                </div>
                {/* khu Category */}
                {products ? (
                    <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-3">
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-1 w-full items-end justify-center">
                                <span className="text-neutral-900 text-3xl font-semibold select-none">
                                    Tất cả sản phẩm
                                </span>
                                <hr class=" bg-green-400 w-48 h-1 border-0 rounded" />

                                <span className="text-[#4a5568]">
                                    Lựa chọn sản phẩm tươi ngon với giá cả phải chăng.
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-1">
                                {products.map((product, index) => {
                                    return <CardProduct key={index} product={product} />;
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default Products;
