import Sidebar from '../../layouts/components/Sidebar';
import MyCarousel from '../../components/Carousel';
import HoverLinks from '../../components/HoverLinks';
import { CardProduct } from '../../components/CardProduct';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { customerSelector } from '../../redux/selectors';
import { customerActions } from '../../redux/slices/customerSlide';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const customer = useSelector(customerSelector);
    const [products, setProducts] = useState([]);

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
        <div className='flex flex-col w-full h-auto px-8 sm:px-12 lg:px-20 xl:px-28 overflow-y-scroll overflow-x-hidden items-center justify-start'>
            <Sidebar></Sidebar>
            {/* Khu hình ảnh ban đầu */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[35vw] min-h-fit w-full gap-2 lg:gap-4 2xl:gap-5 items-center justify-between'>
                {/* Hình ảnh lớn thứ nhất */}
                <div className='flex relative col-span-2 flex-col justify-center items-start px-[2vw] h-full w-full'>
                    <img src='/1.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
                    <div className='z-10 flex flex-col gap-3 xl:gap-10 2xl:gap-8 w-[60%]'>
                        <div className='z-10 flex gap-3 text-sm lg:text-base 2xl:text-xl '>
                            <h6 className='text-[#4a5568]'>Ưu đãi thành viên</h6>
                            <span className='cursor-hover rounded-full px-2 text-[#ff4f4f] font-medium bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent '>
                                10% Off
                            </span>
                        </div>
                        <div className=' uppercase text-[#4a5568] text-xl  sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold cursor-hover'>
                            <span className=' sm:leading-[40px] lg:leading-[44px] xl:leading-[48px] 2xl:leading-[52px]'>
                                Khách hàng
                                <span className='cursor-hover text-[#0da487] font-extrabold sm:leading-[48px] lg:leading-[52px] xl:leading-[56px] 2xl:leading-[60px]'>
                                    {' '}
                                    thành viên
                                </span>
                            </span>
                        </div>
                        <div>
                            <p className='w-[75%] text-[#4a5568] text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl font-normal'>
                                Đăng nhập hoặc đăng ký khách hàng để áp dụng mã "thanhvien".
                            </p>
                        </div>
                        <div>
                            <Link to='/products'>
                                <button className='text-red hover:before:bg-redborder-red-500 relative overflow-hidden bord er border-red-500 rounded-md bg-white px-6 py-4 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full'>
                                    <span className='relative z-10 flex gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl '>
                                        Xem sản phẩm
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Khung 2 hình nhỏ */}
                <div className='hidden lg:flex relative flex-col justify-start items-start w-full h-full gap-2 lg:gap-4 2xl:gap-6'>
                    <div className='flex relative flex-col justify-center items-start px-5 h-full w-full'>
                        <img src='/2.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
                        <div className='z-10 flex flex-col gap-3'>
                            <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] text-[#ff4f4f] cursor-hover'>
                                45% <span className='discount text-base cursor-hover '>OFF</span>
                            </h2>
                            <h3 className='text-[28px] text-[#0da487] font-bold cursor-hover'>Bộ sưu tập hạt</h3>
                            <span className='text-[#4a5568] w-3/5'>Chúng tôi cung cấp rau và trái cây hữu cơ.</span>
                            <Link>
                                <button className='text-red  relative overflow-hidden  rounded-md bg-transparent  text-[#222222]  '>
                                    <div className='flex items-center justify-start relative z-10 gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl '>
                                        <span>Xem sản phẩm</span>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='h-7 w-7'
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                                        </svg>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex relative flex-col justify-center items-start px-5 h-full w-full'>
                        <img src='/3.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
                        <div className='z-10 flex flex-col gap-3'>
                            <h3 className='text-[28px] text-[#0da487] font-bold cursor-hover'>Sức khỏe</h3>
                            <h2 className='text-[20px] text-[#ff4f4f] font-semibold cursor-hover'>Đồ bổ dưỡng</h2>
                            <span className='text-[#4a5568] w-3/5'>
                                <p className='organic cursor-hover'>Bắt đầu mua sắm hàng ngày của bạn với một số Organic food</p>
                            </span>
                            <Link>
                                <button className='text-red  relative overflow-hidden  rounded-md bg-transparent  text-[#222222]  '>
                                    <div className='flex items-center justify-start relative z-10 gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl '>
                                        <span>Xem sản phẩm</span>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='h-7 w-7'
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                                        </svg>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Khu slider thứ 2 */}
            <div className='h-full w-full m-8'>
                <MyCarousel />
            </div>
            {/* khu 3 */}
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-6'>
                {/* khu Category */}
                <div className='flex flex-col jite gap-2 bg-slate-100 rounded-2xl p-1 lg:p-2 mx-1 sm:mx-2 lg:mx-3 xl:mx-4 2xl:mx-5'>
                    <div className='flex flex-col w-full items-start justify-center gap-1'>
                        <span className='text-3xl font-semibold select-none'>Category</span>
                        <hr className=' bg-green-400 w-12 h-1 border-0 rounded' />
                    </div>
                    <HoverLinks home={true} />
                </div>
                {/* khu Category */}
                <div className='flex flex-col gap-4 sm:col-span-4 lg:col-span-5'>
                    <div className='flex flex-col'>
                        {customer ? (
                            <div className='flex flex-col gap-1 w-full items-end justify-center'>
                                <span className='text-neutral-900 text-3xl font-semibold select-none'>Sản phẩm khuyến nghị</span>
                                <hr className=' bg-green-400 w-48 h-1 border-0 rounded' />

                                <span className='text-[#4a5568]'>Chúng tôi mong bạn sẽ thích những mặt hàng mà chúng tôi dành riêng cho bạn.</span>
                            </div>
                        ) : (
                            <div className='text-[#4a5568]'>
                                Đăng nhập hoặc đăng ký khách hàng thành viên để áp dụng nhiều ưu đãi giảm giá đặc biệt.
                            </div>
                        )}
                        {customer ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 p-1 pb-2'>
                                {products.slice(0, 5).map((product, index) => {
                                    return <CardProduct key={index} product={product} />;
                                })}
                            </div>
                        ) : (
                            <div className='h-full w-full flex items-center justify-center'></div>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-1 w-full items-end justify-center'>
                            <span className='text-neutral-900 text-3xl font-semibold'>Sản phẩm mới</span>
                            <hr className=' bg-green-400 w-48 h-1 border-0 rounded' />

                            <span className='text-[#4a5568]'>Đừng bỏ lỡ những mặt hàng mới ra mắt.</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 p-1 pb-2'>
                            {products.slice(0, 5).map((product, index) => {
                                return <CardProduct key={index} product={product} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
