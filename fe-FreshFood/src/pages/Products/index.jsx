import Sidebar from '../../layouts/components/Sidebar';
import MyCarousel from '../../components/Carousel';
import HoverLinks from '../../components/HoverLinks';
import { CardProduct } from '../../components/CardProduct';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function Products() {
    const { type } = useParams();
    const [products, setProducts] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [count, setCount] = useState(0);
    useEffect(() => {
        getProducts();
    }, []);
    useEffect(() => {
        getTypes();
    }, [type]);

    function getTypes() {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    resJson.productTypes.map((t) => {
                        if (t._id == type) setTypeName(t.name);
                    });
                } else {
                    setTypes([]);
                }
            });
    }
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
        <div className='flex flex-col w-full h-auto p-8 sm:px-12 lg:px-20 xl:px-28 overflow-y-scroll overflow-x-hidden items-center justify-start'>
            {/* khu Sản phẩm */}
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-6'>
                {/* khu Category */}
                <div className='flex flex-col jite gap-2 bg-slate-100 rounded-2xl p-1 lg:p-2 mr-1 sm:mr-2 lg:mr-3 xl:mr-4 2xl:mr-5'>
                    <div className='flex flex-col w-full items-start justify-center gap-1'>
                        <span className='text-3xl font-semibold select-none'>Category</span>
                        <hr className=' bg-green-400 w-12 h-1 border-0 rounded' />
                    </div>
                    <HoverLinks />
                </div>
                {/* khu Category */}
                {products ? (
                    <div className='flex flex-col gap-8 sm:col-span-3 lg:col-span-5'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-1 w-full items-end justify-center'>
                                <span className='text-neutral-900 text-3xl font-semibold select-none'>{type ? typeName : 'Tất cả sản phẩm'}</span>
                                <hr className=' bg-green-400 w-48 h-1 border-0 rounded' />

                                <span className='text-[#4a5568]'>
                                    {type
                                        ? products.filter((products) => {
                                              return products.type._id == type;
                                          }).length > 0
                                            ? 'Lựa chọn sản phẩm tươi ngon với giá cả phải chăng.'
                                            : 'Hiện chưa có sản phẩm loại này!!!.'
                                        : 'Lựa chọn sản phẩm tươi ngon với giá cả phải chăng.'}
                                </span>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 p-1 pb-2'>
                                {type ? (
                                    products.filter((products) => {
                                        return products.type._id == type;
                                    }).length > 0 ? (
                                        products
                                            .filter((products) => {
                                                return products.type._id == type;
                                            })
                                            .map((product, index) => {
                                                return <CardProduct key={index} product={product} />;
                                            })
                                    ) : (
                                        <div className='h-full w-full flex justify-center items-center'>Vui lòng quay lại sau!!!</div>
                                    )
                                ) : (
                                    products.map((product, index) => {
                                        return <CardProduct key={index} product={product} />;
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center'>Loading...</div>
                )}
            </div>
        </div>
    );
}

export default Products;
