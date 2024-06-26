import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PriceFormat from '../../components/PriceFormat';
import QuantityInput from '../../components/QuantityInput';
import { orderActions } from '../../redux/slices/orderSlice';
import { customerSelector, orderSelector } from '../../redux/selectors';
import { useTranslation } from 'react-i18next';

export default function Cart() {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const customer = useSelector(customerSelector);
    const { t } = useTranslation();
    return (
        <div className="px-[8vw] py-10">
            <div className="flex items-start">
                <div className="mr-10 flex-1">
                    {order?.details?.length === 0 && (
                        <div className="flex flex-col items-center justify-center space-y-3 py-5">
                            <div className="text-orange-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="h-12 w-12"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-700">
                                {t('cartpage.noproduct')}
                            </p>
                        </div>
                    )}
                    {order?.details?.map((d, index) => (
                        <div key={index} className="flex items-center space-x-4 border-b py-3">
                            <img
                                src={
                                    d.product.images.length > 0
                                        ? d.product.images[0]
                                        : '/placeholder.png'
                                }
                                className="h-[80px] w-[80px] rounded object-cover"
                            />
                            <div className="flex-1 pr-6">
                                <p className="font-medium">{d?.product?.name}</p>
                                <p className="font-medium text-primary-600">
                                    <PriceFormat>{d?.price}</PriceFormat> VNĐ
                                </p>
                            </div>
                            <QuantityInput
                                value={d?.quantity}
                                setValue={(q) =>
                                    dispatch(
                                        orderActions.updateQuantity({
                                            _id: d?.product?._id,
                                            quantity: q,
                                        }),
                                    )
                                }
                                min={1}
                                max={d?.product?.quantity}
                            />
                            <div className="w-[180px] px-6">
                                <p className="text-gray-600"> {t('cartpage.totalPrice')}</p>
                                <p className="text-lg font-medium text-gray-900">
                                    <PriceFormat>{d?.price * d?.quantity}</PriceFormat> VNĐ
                                </p>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="flex items-center space-x-2 px-3 text-red-500 hover:text-red-600"
                                    onClick={() => dispatch(orderActions.remove(d?.product?._id))}
                                >
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>

                                    <span> {t('cartpage.delete')}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[290px] rounded-lg bg-gray-50 p-4">
                    <p className="border-b pb-2 text-lg font-medium"> {t('cartpage.totalCart')}</p>
                    <div className="mt-3 text-gray-600">
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between">
                                <span> {t('cartpage.totalProduct')}</span>
                                <span>{order?.details?.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span> {t('cartpage.totalQuantity')}</span>
                                <span>
                                    {order?.details?.reduce(
                                        (prev, curr) => prev + curr.quantity,
                                        0,
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between border-t py-2 text-lg font-semibold">
                            <span> {t('cartpage.totalPrice')} (VNĐ)</span>
                            <span className="text-primary-600">
                                <PriceFormat>{order.totalPrice}</PriceFormat>
                            </span>
                        </div>
                        <div className="space-y-2">
                            <Link
                                to="/order"
                                className={clsx('btn btn-md w-full bg-red-500 hover:bg-red-400', {
                                    'pointer-events-none opacity-50': order?.totalPrice === 0,
                                })}
                            >
                                {t('cartpage.order')}
                            </Link>
                            <Link
                                to="/products"
                                className="btn btn-md w-full bg-primary-500 hover:bg-primary-400"
                            >
                                {t('cartpage.continue')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
