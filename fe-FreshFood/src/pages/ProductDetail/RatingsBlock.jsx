function Rating({ rating }) {
    return (
        <div className="flex space-x-4 border-b py-3 rounded-md">
            <img
                className="w-[74px] h-[74px] rounded-md border"
                src={rating?.customer?.avatar || '/placeholder.png'}
            />
            <div className="space-y-1">
                <p className="font-medium text-primary-600">{rating?.customer?.name}</p>
                <div className="flex space-x-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star, index) =>
                        star <= rating?.score ? (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        )
                    )}
                </div>
                <p className="text-gray-600">{rating?.comment}</p>
            </div>
        </div>
    );
}

export default function RatingsBlock({ product }) {
    return (
        <div className="mt-10">
            <p className="font-semibold text-xl">Đánh giá của khách hàng</p>
            {product?.ratings?.length > 0 ? (
                <>
                    <div className="flex items-center mt-3 space-x-3">
                        <div className="flex space-x-1 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star, index) =>
                                star <= Math.round(product?.ratingAvg) ? (
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
                                ) : (
                                    <svg
                                        key={index}
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
                                )
                            )}
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-gray-600">{product?.ratingAvg?.toFixed(1) + '/5'}</p>
                            <div className="text-gray-400">|</div>
                            <p className="text-gray-600">
                                {product?.ratings?.length + ' Đánh giá'}
                            </p>
                        </div>
                    </div>
                    <div className="w-[500px] mt-3 space-y-1">
                        {[5, 4, 3, 2, 1].map((star, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="flex items-center text-yellow-400">
                                    <span className="text-gray-600 font-medium w-3">{star}</span>
                                    <svg
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
                                </div>
                                <div className="flex-1 h-4 bg-gray-200 rounded overflow-hidden relative">
                                    <div
                                        className="absolute h-full bg-primary-600 top-0 left-0"
                                        style={{
                                            width:
                                                (product?.ratings?.filter((r) => r.score === star)
                                                    ?.length *
                                                    100) /
                                                    product?.ratings?.length +
                                                '%',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-2">
                        {product?.ratings?.map((r, index) => (
                            <Rating rating={r} key={index} />
                        ))}
                    </div>
                </>
            ) : (
                <div>Chưa có đánh giá nào</div>
            )}
        </div>
    );
}
