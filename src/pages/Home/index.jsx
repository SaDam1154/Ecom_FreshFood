import Sidebar from '../../layouts/components/Sidebar';
import MyCarousel from '../../components/Carousel';
import HoverLinks from '../../components/HoverLinks';
import ChatIcon from '../../components/ChatIcon';
import ChatBox from '../../components/ChatBox';
import { CardProduct } from '../../components/CardProduct';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { customerSelector, langSelector } from '../../redux/selectors';
import { customerActions } from '../../redux/slices/customerSlide';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { checkAndCreateUser, checkConversation } from '../../configs/firebase/firebaseUtils';
import { toast } from 'react-toastify';
import clsx from 'clsx';

function Home() {
    const dispatch = useDispatch();
    const customer = useSelector(customerSelector);
    const { t } = useTranslation();

    const [products, setProducts] = useState([]);
    const [productsRec, setProductsRec] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [idBox, setIdBox] = useState('');

    useEffect(() => {
        getProducts();
        getProductsRec();
    }, []);

    useEffect(() => {
        if (customer) {
            getFavorites();
        }
    }, [customer]);

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

    function getProductsRec() {
        fetch('http://localhost:5000/api/recommend/' + customer?._id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductsRec(resJson.products);
                } else {
                    setProductsRec(products);
                }
            });
    }

    function getFavorites() {
        fetch(`http://localhost:5000/api/customer/${customer.id}/favorites`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setFavorites(resJson.favorites);
                } else {
                    setFavorites([]);
                }
            });
    }

    const handleChatIconClick = async () => {
        await checkAndCreateUser(customer); // Đảm bảo user đã được tạo
        const conversationId = await checkConversation(customer); // Đảm bảo conversationId đã được trả về
        console.log(conversationId);
        setIdBox(conversationId);
        setIsChatOpen(!isChatOpen);
        console.log('Click in Chat');
    };

    const handleChatBoxClose = () => {
        setIsChatOpen(false);
        console.log('Click in Chat');
    };
    return (
        <div className="flex h-auto w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll px-8 sm:px-12 lg:px-20 xl:px-28">
            <Sidebar></Sidebar>
            {/* Khu hình ảnh ban đầu */}
            <div className="grid h-[35vw] min-h-fit w-full grid-cols-1 items-center justify-between gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 2xl:gap-5">
                {/* Hình ảnh lớn thứ nhất */}
                <div className="relative col-span-2 flex h-full w-full flex-col items-start justify-center px-[2vw]">
                    <img
                        src="/1.jpg"
                        alt="Banner1"
                        className="absolute left-0 top-0 -z-0 h-full w-full"
                    />
                    <div className="z-10 flex w-[60%] flex-col gap-3 xl:gap-10 2xl:gap-8">
                        <div className="z-10 flex gap-3 text-sm lg:text-base 2xl:text-xl ">
                            <h6 className="text-[#4a5568]">{t('homepage.banner1.topNote')}</h6>
                            <span className="cursor-hover rounded-full bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent px-2 font-medium text-[#ff4f4f] ">
                                10% Off
                            </span>
                        </div>
                        <div className=" cursor-hover text-xl font-semibold  uppercase text-[#4a5568] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                            <span className=" sm:leading-[40px] lg:leading-[44px] xl:leading-[48px] 2xl:leading-[52px]">
                                {t('homepage.banner1.title1')}
                                <span className="cursor-hover font-extrabold text-[#0da487] sm:leading-[48px] lg:leading-[52px] xl:leading-[56px] 2xl:leading-[60px]">
                                    {' '}
                                    {t('homepage.banner1.title2')}
                                </span>
                            </span>
                        </div>
                        <div>
                            <p className="w-[75%] text-sm font-normal text-[#4a5568] sm:text-base lg:text-base xl:text-lg 2xl:text-xl">
                                {t('homepage.banner1.description')}
                            </p>
                        </div>
                        <div>
                            <Link to="/products">
                                <button className="text-red hover:before:bg-redborder-red-500 bord er relative overflow-hidden rounded-md border-red-500 bg-white px-6 py-4 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10 flex gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl ">
                                        {t('common.ViewProducts')}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Khung 2 hình nhỏ */}
                <div className="relative hidden h-full w-full flex-col items-start justify-start gap-2 lg:flex lg:gap-4 2xl:gap-6">
                    <div className="relative flex h-full w-full flex-col items-start justify-center px-5">
                        <img
                            src="/2.jpg"
                            alt="Banner1"
                            className="absolute left-0 top-0 -z-0 h-full w-full"
                        />
                        <div className="z-10 flex flex-col gap-3">
                            <h2 className="cursor-hover text-xl text-[#ff4f4f] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px]">
                                <span className="discount cursor-hover text-xl text-red-600 ">
                                    Best seller
                                </span>
                            </h2>
                            <h3 className="cursor-hover text-[28px] font-bold text-[#0da487]">
                                {t('homepage.banner2.title')}
                            </h3>
                            <span className="w-3/5 text-[#4a5568]">
                                {t('homepage.banner2.description')}
                            </span>
                            <Link to="/products">
                                <button className="text-red  relative overflow-hidden  rounded-md bg-transparent  text-[#222222]  ">
                                    <div className="relative z-10 flex items-center justify-start gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl ">
                                        <span>{t('common.ViewProducts')}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-7 w-7"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex h-full w-full flex-col items-start justify-center px-5">
                        <img
                            src="/3.jpg"
                            alt="Banner1"
                            className="absolute left-0 top-0 -z-0 h-full w-full"
                        />
                        <div className="z-10 flex flex-col gap-3">
                            <h3 className="cursor-hover text-[28px] font-bold text-[#0da487]">
                                {t('homepage.banner3.title1')}
                            </h3>
                            <h2 className="cursor-hover text-[20px] font-semibold text-[#ff4f4f]">
                                {t('homepage.banner3.title2')}
                            </h2>
                            <span className="w-3/5 text-[#4a5568]">
                                <p className="organic cursor-hover">
                                    {t('homepage.banner3.description')}
                                </p>
                            </span>
                            <Link to="/products">
                                <button className="text-red  relative overflow-hidden  rounded-md bg-transparent  text-[#222222]  ">
                                    <div className="relative z-10 flex items-center justify-start gap-4 text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl ">
                                        <span>{t('common.ViewProducts')}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-7 w-7"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Khu slider thứ 2 */}
            <div className="m-8 h-full w-full">
                <MyCarousel />
            </div>
            {/* khu 3 */}
            <div className=" 3xl:grid-cols-6 grid  h-[80vh] w-full grid-cols-1 overflow-scroll  xl:grid-cols-4  2xl:grid-cols-5">
                {/* khu Category */}
                <div>
                    <div className="sticky top-2 z-50 mx-1 flex h-auto flex-col gap-2 rounded-2xl bg-slate-100 sm:mx-2 lg:mx-3 lg:p-2 xl:mx-4 2xl:mx-5">
                        <div className="flex h-auto w-full flex-col items-start justify-center gap-1">
                            <span className="select-none text-3xl font-semibold">
                                {t('common.Category')}
                            </span>
                            <hr className=" h-1 w-12 rounded border-0 bg-green-400" />
                        </div>
                        <HoverLinks home={true} />
                    </div>
                </div>
                {/* khu sanpham */}
                <div className="3xl:col-span-5 flex flex-col gap-4 sm:col-span-2 xl:col-span-3 2xl:col-span-4">
                    {!customer && (
                        <div className="text-[#4a5568]">{t('homepage.pleaseSignUp')}</div>
                    )}
                    {/* Sản phẩm nổi bật */}
                    <div className="flex flex-col">
                        <div className="flex w-full flex-col items-end justify-center gap-1">
                            <span className="text-3xl font-semibold text-neutral-900">
                                {t('homepage.hotProducts')}
                            </span>
                            <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                            <span className="text-[#4a5568]">
                                {t('homepage.hotProductsDescription')}
                            </span>
                        </div>
                        <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                            {products
                                .sort((a, b) => b.saledQuantity - a.saledQuantity)
                                .slice(0, 6)
                                .map((product, index) => {
                                    return <CardProduct key={index} product={product} />;
                                })}
                        </div>
                    </div>

                    {/* Sản phẩm giảm giá */}
                    <div className="flex flex-col">
                        <div className="flex w-full flex-col items-end justify-center gap-1">
                            <span className="text-3xl font-semibold text-neutral-900">
                                {t('homepage.saleProducts')}
                            </span>
                            <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                            <span className="text-[#4a5568]">
                                {t('homepage.saleProductsDescription')}
                            </span>
                        </div>
                        <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                            {products
                                .filter((product) => product.discount.type !== 'noDiscount')
                                .slice(0, 6)
                                .map((product, index) => {
                                    return <CardProduct key={index} product={product} />;
                                })}
                        </div>
                    </div>

                    {/* Sản phẩm mới */}
                    <div className="flex flex-col">
                        <div className="flex w-full flex-col items-end justify-center gap-1">
                            <span className="text-3xl font-semibold text-neutral-900">
                                {t('homepage.newProducts')}
                            </span>
                            <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                            <span className="text-[#4a5568]">
                                {t('homepage.newProductsDescription')}
                            </span>
                        </div>
                        <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                            {products
                                .sort((a, b) => b.id - a.id)
                                .slice(0, 6)
                                .map((product, index) => {
                                    return <CardProduct key={index} product={product} />;
                                })}
                        </div>
                    </div>

                    {/* Sản phẩm yêu thích */}
                    <div className="flex flex-col">
                        {customer && favorites.length > 0 ? (
                            <div className="flex w-full flex-col items-end justify-center gap-1">
                                <span className="select-none text-3xl font-semibold text-neutral-900">
                                    {t('homepage.favorites')}
                                </span>
                                <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                                <span className="text-[#4a5568]">
                                    {t('homepage.favoritesDescription')}
                                </span>
                            </div>
                        ) : (
                            <div className="text-[#4a5568]"></div>
                        )}
                        {customer && favorites.length > 0 ? (
                            <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                                {favorites.map((product, index) => {
                                    if (product)
                                        return <CardProduct key={index} product={product} />;
                                })}
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center"></div>
                        )}
                    </div>

                    {/* Sản phẩm được gợi ý */}
                    <div className="flex flex-col">
                        {customer && productsRec.length > 0 ? (
                            <div className="flex w-full flex-col items-end justify-center gap-1">
                                <span className="select-none text-3xl font-semibold text-neutral-900">
                                    {t('homepage.recommend')}
                                </span>
                                <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                                <span className="text-[#4a5568]">
                                    {t('homepage.recommendDescription')}
                                </span>
                            </div>
                        ) : (
                            <div className="text-[#4a5568]"></div>
                        )}
                        {customer && productsRec.length > 0 ? (
                            <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
                                {productsRec.map((product, index) => {
                                    if (product)
                                        return <CardProduct key={index} product={product} />;
                                })}
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center"></div>
                        )}
                    </div>
                </div>
            </div>
            <div className="fixed bottom-4 right-4 z-50">
                {customer && <ChatIcon onClick={handleChatIconClick} />}
                {customer && isChatOpen && (
                    <ChatBox
                        onClose={handleChatBoxClose}
                        start={true}
                        senderId={customer._id}
                        conversationId={idBox}
                        customerId={customer._id}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;
