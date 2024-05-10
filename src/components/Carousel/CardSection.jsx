import { Link } from 'react-router-dom';
function CardSection({ img, discount, title, content }) {
    return (
        <div className="relative flex h-full w-full flex-col items-start justify-start">
            <img
                src={img}
                alt="Banner"
                className="absolute left-0 top-0 -z-0 h-full  w-[95%] rounded-xl object-cover"
            />
            <div className="z-10 flex w-[60%] flex-col gap-3">
                {/* Chỗ hình tròn bị mờ mờ chưa nội dung */}
                <div className=" ml-4 mt-4 flex w-[300px] flex-col rounded-r-full bg-white bg-opacity-50 p-4 backdrop-blur-[5px]">
                    <div className="z-10 flex gap-3 text-sm ">
                        <span className=" cursor-hover rounded-full bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent px-2 font-medium text-[#ff4f4f] ">
                            {discount}
                        </span>
                    </div>
                    {/* title */}
                    <div>
                        <p className="text-lg font-semibold text-[#222]">{title}</p>
                    </div>
                    {/* content */}
                    <div>
                        <p className="w-[80%]">{content}</p>
                    </div>
                </div>
                <div>
                    <Link to="/products">
                        <button className="relative flex gap-2 overflow-hidden rounded-md bg-transparent px-6 pb-2 pt-8 text-base font-semibold text-white lg:ml-2 xl:ml-2 2xl:ml-10  ">
                            <span className="relative z-10 flex gap-4 ">Xem sản phẩm</span>
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
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default CardSection;
