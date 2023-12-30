import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/slices/orderSlice';
import { orderSelector } from '../../redux/selectors';
import PriceFormat from '../../components/PriceFormat';

export default function Order() {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    return (
        <div className="px-[8vw] py-10">
            <div className="flex space-x-6">
                <div className="w-[400px] bg-gray-50 p-4 rounded-lg">
                    <div className="">
                        <p className="text-lg font-medium border-b pb-2 mt-5">Tổng giỏ hàng</p>
                        <div className="text-gray-600 mt-3">
                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between">
                                    <span>Tổng giá (VNĐ)</span>
                                    <span>
                                        <PriceFormat>{order.totalPrice}</PriceFormat>
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Giảm giá (VNĐ)</span>
                                    <span>0</span>
                                </div>
                            </div>
                            <div className="flex py-2 mt-2 border-t font-semibold text-lg justify-between">
                                <span>Thành tiền (VNĐ)</span>
                                <span className="text-primary-600">
                                    <PriceFormat>{order.totalPrice}</PriceFormat>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {order?.details?.map((d, index) => (
                            <div key={index} className="flex py-2 space-x-4 items-center">
                                <img
                                    src="/placeholder.png"
                                    className="w-[70px] h-[70px] object-cover rounded"
                                />
                                <div className="flex-1 pr-6">
                                    <p className="font-medium">{d?.product?.name}</p>
                                    <p className="font-medium text-primary-600">
                                        <PriceFormat>{d?.price}</PriceFormat> VNĐ
                                    </p>
                                </div>
                                <p className="text-lg text-gray-600">{'x' + d?.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 bg-gray-300">Form</div>
            </div>
        </div>
    );
}
