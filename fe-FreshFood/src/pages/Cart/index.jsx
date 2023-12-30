import { Link } from 'react-router-dom';
import PriceFormat from '../../components/PriceFormat';

export default function Cart() {
    return (
        <div className="px-[8vw] py-10">
            <div className="flex items-start">
                <div className="flex-1 mr-10">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="flex py-3 border-b space-x-4 items-center">
                            <img
                                src="/placeholder.png"
                                className="w-[80px] h-[80px] object-cover rounded"
                            />
                            <div className="flex-1 pr-6">
                                <p className="font-medium">Cá mồi ba cô gái</p>
                                <p className="font-medium text-primary-600">
                                    <PriceFormat>{10000}</PriceFormat> VNĐ
                                </p>
                            </div>
                            <div className="flex items-center p-1 rounded-md bg-gray-100">
                                <button className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14"
                                        />
                                    </svg>
                                </button>
                                <div className="w-16 flex items-center justify-center text-gray-600">
                                    {1}
                                </div>
                                <button className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6">
                                <p className="text-gray-600">Tổng giá</p>
                                <p className="text-gray-900 text-lg font-medium">
                                    <PriceFormat>{10000}</PriceFormat> VNĐ
                                </p>
                            </div>
                            <div className="ml-4">
                                <button className="text-red-500 flex px-3 items-center space-x-2 hover:text-red-600">
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
                        </div>
                    ))}
                </div>
                <div className="w-[290px] bg-gray-50 rounded-lg p-4">
                    <p className="text-lg font-medium border-b pb-2">Tổng giỏ hàng</p>
                    <div className="text-gray-600 mt-3">
                        <div className="">
                            <span>Phiếu giảm giá</span>
                            <input
                                className="w-full mt-1 p-2 border-primary-600 border-2 rounded"
                                placeholder="Nhập mã giảm giá"
                            />
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between">
                                <span>Tổng giá</span>
                                <span>100000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Giảm giá</span>
                                <span>20000</span>
                            </div>
                        </div>
                        <div className="flex py-2 mt-2 border-t font-semibold text-lg justify-between">
                            <span>Thành tiền</span>
                            <span className="text-primary-600">80000</span>
                        </div>
                        <div className="space-y-2">
                            <Link
                                to="/order"
                                className="btn btn-md w-full bg-red-500 hover:bg-red-400"
                            >
                                Đặt hàng
                            </Link>
                            <Link
                                to="/product"
                                className="btn btn-md w-full bg-primary-500 hover:bg-primary-400"
                            >
                                Tiếp tục mua hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
