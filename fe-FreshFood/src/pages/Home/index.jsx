import Sidebar from '../../layouts/components/Sidebar';
import MyCarousel from '../../components/Carousel';
import HoverLinks from '../../components/HoverLinks';
import { CardProduct } from '../../components/CardProduct';
import MyFooter from '../../components/MyFooter';
function Home() {
    return (
        <div className='flex flex-col w-full h-auto px-8 sm:px-12 lg:px-20 xl:px-28 overflow-y-scroll overflow-x-hidden items-center justify-start'>
            <Sidebar></Sidebar>
            {/* Khu hình ảnh ban đầu */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-[35vw] min-h-fit w-full gap-2 lg:gap-4 2xl:gap-6  items-center justify-between'>
                {/* Hình ảnh lớn thứ nhất */}
                <div className='flex relative col-span-2 flex-col justify-center items-start px-[2vw] h-full w-full'>
                    <img src='/1.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
                    <div className='z-10 flex flex-col gap-3 xl:gap-10 2xl:gap-8 w-[60%]'>
                        <div className='z-10 flex gap-3 text-sm lg:text-base 2xl:text-xl '>
                            <h6 className='text-[#4a5568]'>Exclusive offer</h6>
                            <span className='cursor-hover rounded-full px-2 text-[#ff4f4f] font-medium bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent '>
                                30% Off
                            </span>
                        </div>
                        <div>
                            <h1 className='uppercase text-[#4a5568] text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold cursor-hover'>
                                Stay home &amp; delivered your <span className='cursor-hover text-[#0da487] font-extrabold'>Daily Needs</span>
                            </h1>
                        </div>
                        <div>
                            <p className='w-[75%] text-[#4a5568] text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl font-normal'>
                                Vegetables contain many vitamins and minerals that are good for your health.
                            </p>
                        </div>
                        <div>
                            <button className='text-red hover:before:bg-redborder-red-500 relative overflow-hidden bord er border-red-500 rounded-md bg-white px-6 py-4 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full'>
                                <span className='relative z-10 flex gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl '>
                                    Shop Now
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
                            <h3 className='text-[28px] text-[#0da487] font-extrabold cursor-hover'>Nut Collection</h3>
                        </div>
                    </div>
                    <div className='flex relative flex-col justify-center items-start px-20 h-full w-full'>
                        <img src='/3.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
                    </div>
                </div>
            </div>
            {/* Khu slider thứ 2 */}
            <div className='h-full w-full m-8'>
                <MyCarousel />
            </div>
            {/* khu 3 */}
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'>
                {/* khu Category */}
                <div className='flex flex-col bg-slate-100 rounded-2xl p-1 lg:p-2 mx-1 sm:mx-2 lg:mx-3 xl:mx-4 2xl:mx-5'>
                    <div className='flex w-full items-center justify-center'>
                        <span className='text-3xl font-bold'>Category</span>
                        <hr />
                    </div>
                    <HoverLinks />
                </div>
                {/* khu Category */}
                <div className='sm:col-span-2 lg:col-span-3'>
                    <div className='flex w-full items-center justify-center'>
                        <span className='text-3xl font-bold'>TOP SALES TODAY</span>
                        <hr />
                        <span></span>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
