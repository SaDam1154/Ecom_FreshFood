function CardSection({ img, discount, title, content }) {
    return (
        <div className="flex relative flex-col justify-start items-start w-full h-full">
            <img
                src={img}
                alt="Banner"
                className="absolute rounded-xl object-cover -z-0 left-0  top-0 w-[95%] h-full"
            />
            <div className="z-10 flex flex-col gap-3 w-[60%]">
                {/* Chỗ hình tròn bị mờ mờ chưa nội dung */}
                <div className=" bg-white backdrop-blur-[5px] bg-opacity-50 ml-4 mt-4 p-4 w-[300px] flex flex-col rounded-r-full">
                    <div className="z-10 flex gap-3 text-sm ">
                        <span className=" cursor-hover rounded-full px-2 text-[#ff4f4f] font-medium bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent ">
                            {discount}
                        </span>
                    </div>
                    {/* title */}
                    <div>
                        <p className="text-[#222] font-semibold text-lg">{title}</p>
                    </div>
                    {/* content */}
                    <div>
                        <p className="w-[80%]">{content}</p>
                    </div>
                </div>
                <div>
                    <button className="flex gap-2 lg:ml-4 xl:ml-4 2xl:ml-16 text-base font-semibold relative overflow-hidden rounded-md bg-transparent text-white px-6 pt-8 pb-2  ">
                        <span className="relative z-10 flex gap-4 ">Shop Now</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CardSection;
