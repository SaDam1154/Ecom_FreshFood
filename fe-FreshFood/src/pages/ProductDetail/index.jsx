import ProductImageSlide from './ProductImageSlide';

export default function ProductDetail() {
    return (
        <div className="px-[8vw] pt-6">
            <div>
                <div className="flex">
                    {/* IMAGES */}
                    <div className="flex-1 mr-6 max-w-[500px]">
                        <div>
                            <ProductImageSlide images={['/placeholder.png']} />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 ">
                        <p className="font-bold text-gray-900 text-2xl">Creamy Chocolate Cake</p>
                        <p className="text-primary-600 font-semibold text-xl mt-2">100,000 VND</p>
                        <div className="flex items-center mt-3 space-x-3">
                            <div className="flex space-x-1 text-yellow-400">
                                {[1, 2, 3, 4].map((_, index) => (
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
                                ))}
                                <svg
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
                            </div>
                            <p className="text-gray-600">23 Đánh giá</p>
                        </div>
                        <p className="mt-3 space-x-1 font-medium">
                            <span className="text-gray-600">Loại sản phẩm:</span>
                            <span className="text-primary-600">Ngũ cốc</span>
                        </p>
                        <p className="text-gray-600 mt-3 max-w-[360px]">
                            Lollipop cake chocolate chocolate cake dessert jujubes. Shortbread sugar
                            plum dessert powder cookie sweet brownie. Cake cookie apple pie dessert
                            sugar plum muffin cheesecake.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="w-[300px] bg-blue-300 ml-6"></div>
                </div>
            </div>
        </div>
    );
}
