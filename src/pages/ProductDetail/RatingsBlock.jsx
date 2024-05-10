import { useSelector } from 'react-redux';
import { customerSelector } from '../../redux/selectors';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Rating({ rating, isOwn = false, onDelete, onEdit }) {
    return (
        <div className="flex space-x-4 border-b py-3 rounded-md">
            <img
                className="w-[74px] h-[74px] rounded-md border"
                src={rating?.customer?.avatar || '/placeholder.png'}
            />
            <div className="space-y-1 flex-1">
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
            {isOwn && (
                <div className="space-y-2">
                    <button
                        className="font-semibold text-orange-400 flex space-x-2 items-center"
                        onClick={onEdit}
                    >
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
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                        </svg>

                        <span>Sửa</span>
                    </button>
                    <button
                        className="font-semibold text-red-500 flex space-x-2 items-center"
                        onClick={onDelete}
                    >
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>

                        <span>Xoá</span>
                    </button>
                </div>
            )}
        </div>
    );
}

function StarInput({ score, setScore }) {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex space-x-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star, index) =>
                    star <= score ? (
                        <button
                            key={index}
                            className="hover:scale-[1.1]"
                            onClick={() => setScore(star)}
                        >
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            key={index}
                            className="hover:scale-[1.1]"
                            onClick={() => setScore(star)}
                        >
                            <svg
                                key={index}
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
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </button>
                    )
                )}
            </div>
            {score > 0 && (
                <button className="text-red-500 font-semibold" onClick={() => setScore(0)}>
                    Huỷ
                </button>
            )}
        </div>
    );
}

export default function RatingsBlock({ product, onChange }) {
    const customer = useSelector(customerSelector);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [ownRating, setOwnRating] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const _ownRating = product?.ratings?.find((r) => r?.customer?._id === customer?._id);
        setOwnRating(_ownRating);
        setIsEdit(false);
        if (_ownRating) {
            setScore(_ownRating.score);
            setComment(_ownRating.comment);
        } else {
            setComment('');
            setScore(0);
        }
    }, [product, customer]);

    function handleCreateRating() {
        setLoading(true);
        fetch('http://localhost:5000/api/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product._id,
                customer: customer._id,
                score: score,
                comment: comment,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    toast.success('Đánh giá sản phẩm thành công');
                    onChange();
                } else {
                    toast.error('Có lỗi xảy ra');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Có lỗi xảy ra');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleUpdateRating() {
        setLoading(true);
        fetch('http://localhost:5000/api/rating/' + ownRating?.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score: score,
                comment: comment,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    toast.success('Cập nhật đánh giá sản phẩm thành công');
                    setIsEdit(false);
                    onChange();
                } else {
                    toast.error('Có lỗi xảy ra');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Có lỗi xảy ra');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleDeleteRating() {
        fetch('http://localhost:5000/api/rating/' + ownRating?.id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    toast.success('Xoá đánh giá sản phẩm thành công');
                    setScore(0);
                    setComment('');
                    onChange();
                } else {
                    toast.error('Có lỗi xảy ra');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Có lỗi xảy ra');
            });
    }

    console.log(product);
    return (
        <div className="mt-10">
            <p className="font-semibold text-xl">Đánh giá của khách hàng</p>
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
                    <p className="text-gray-600">{product?.ratings?.length + ' Đánh giá'}</p>
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
                                    width: product?.ratings?.length
                                        ? (product?.ratings?.filter((r) => r.score === star)
                                              ?.length *
                                              100) /
                                              product?.ratings?.length +
                                          '%'
                                        : 0,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                {customer ? (
                    !ownRating || isEdit ? (
                        <div className="mt-3">
                            <div className="flex space-x-4 py-3 rounded-md">
                                <img
                                    className="w-[74px] h-[74px] rounded-md border"
                                    src={customer?.avatar || '/placeholder.png'}
                                />
                                <div className="space-y-1 flex-1">
                                    <StarInput score={score} setScore={setScore} />
                                    <textarea
                                        type="text"
                                        className={clsx('text-input !mt-3 w-full h-auto py-2', {})}
                                        placeholder="Viết đánh giá của bạn..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={2}
                                    ></textarea>
                                    {score > 0 && (
                                        <button
                                            className="btn btn-md bg-primary-600 hover:bg-primary-700 w-full"
                                            onClick={() =>
                                                isEdit ? handleUpdateRating() : handleCreateRating()
                                            }
                                            disabled={loading}
                                        >
                                            {isEdit ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Rating
                            rating={ownRating}
                            isOwn={true}
                            onDelete={handleDeleteRating}
                            onEdit={() => setIsEdit(true)}
                        />
                    )
                ) : (
                    <div className="text-primary-600 font-semibold">
                        Bạn cần đăng nhập để đánh giá sản phẩm
                    </div>
                )}
            </div>
            <div className="mt-6 space-y-2">
                {product?.ratings
                    ?.filter((r) => r?.customer?._id !== customer?._id)
                    .map((r, index) => (
                        <Rating rating={r} key={index} />
                    ))}
            </div>
        </div>
    );
}
