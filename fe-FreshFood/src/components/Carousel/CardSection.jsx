function CardSection() {
    return (
        <div className="flex relative flex-col justify-start items-start w-full h-full">
            <img
                src="/4.jpg"
                alt="Banner1"
                className="absolute rounded-xl object-cover -z-0 left-0 right-0 top-0 w-full h-full"
            />
            <div className="z-10 flex flex-col gap-3 w-[60%]">
                <div className=" bg-white backdrop-blur-[5px] bg-opacity-50 ml-4 mt-4 p-4 flex flex-col rounded-r-full">
                    <div className="z-10 flex gap-3 text-sm ">
                        <span className=" cursor-hover rounded-full px-2 text-[#ff4f4f] font-medium bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent ">
                            5% Off
                        </span>
                    </div>

                    <div>
                        <p className="w-[75%]">Daily Essentials Eggs {'&'} Dairy</p>
                    </div>
                </div>
                <div>
                    <button className="text-red hover:before:bg-redborder-red-500 relative overflow-hidden bord er border-red-500 rounded-md bg-white px-6 py-4 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10 flex gap-4 ">
                            Shop Now
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
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CardSection;
