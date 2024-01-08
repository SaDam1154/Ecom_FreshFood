import { toast } from 'react-toastify';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/slices/orderSlice';
import { customerSelector, orderSelector } from '../../redux/selectors';
import PriceFormat from '../../components/PriceFormat';
import { useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
const validationSchema = Yup.object({
    phone: Yup.string()
        .required('Trường này bắt buộc')
        .matches(/^[\+|0]([0-9]{9,14})\b/, 'Số điện thoại không hợp lệ'),

    address: Yup.string().required('Trường này bắt buộc'),
});

export default function Order() {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const customer = useSelector(customerSelector);
    const [loading, setLoading] = useState(false);
    const [couponInput, setCouponInput] = useState('');
    const [coupon, setCoupon] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const navigate = useNavigate();

    const form = useFormik({
        initialValues: {
            phone: '',
            address: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });

    useEffect(() => {
        const coupon = coupons.find((c) => c.name === couponInput);
        setCoupon(coupon || null);
    }, [couponInput]);

    useEffect(() => {
        if (customer) {
            form.setFieldValue('phone', customer.phone);
            fetch('http://localhost:5000/api/coupon/get-by-customer/' + customer?._id)
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.success) {
                        setCoupons(resJson.coupons);
                    } else {
                        setCoupons([]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setCoupons([]);
                });
        } else {
            form.setFieldValue('phone', '');
        }
    }, [customer]);

    const intoMoney = useMemo(() => {
        if (!coupon) {
            return order?.totalPrice;
        }
        if (!coupon?.canUse) {
            return order?.totalPrice;
        }
        return order?.totalPrice - (order?.totalPrice * coupon?.discountPercent) / 100;
    }, [coupon, order]);

    function handleFormsubmit(values) {
        setLoading(true);
        const details = order.details.map((d) => ({
            product: d.product._id,
            quantity: d.quantity,
            price: d.price,
        }));
        fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customer?._id,
                deliveryStatus: 'pending',
                paymentStatus: 'unpaid',
                details: details,
                receivedMoney: order.totalPrice,
                totalPrice: order.totalPrice,
                intoMoney: intoMoney,
                coupon: coupon?.canUse ? coupon?._id : null,
                exchangeMoney: 0,
                phone: values.phone,
                address: values.address,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    dispatch(orderActions.reset());
                    toast.success('Đặt hàng thành công');
                    const templateParams = {
                        Name: customer.name,
                        Address: customer.address,
                        Phone: customer.phone,
                        TotalPrice: order.totalPrice,
                        DiscountPercent: order.totalPrice,
                        IntoMoney: intoMoney,
                        Link: 'http://localhost:5173/profile',
                        reply_to: '20521154@gm.uit.edu.vn',
                    };
                    emailjs.send('service_3dwhkaf', 'template_m7a86er', templateParams, 'JcAqZIglb_PsOO35p').then(
                        (response) => {
                            console.log('SUCCESS!', response.status, response.text);
                        },
                        (err) => {
                            console.log('FAILED...', err);
                        }
                    );
                    setValidateOnChange(false);
                    navigate('/');
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
    return (
        <div className="px-[8vw] py-10">
            <div className="flex space-x-6">
                {/* CART */}
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
                                    <span>
                                        <PriceFormat>{order.totalPrice - intoMoney}</PriceFormat>
                                    </span>
                                </div>
                            </div>
                            <div className="flex py-2 mt-2 border-t font-semibold text-lg justify-between">
                                <span>Thành tiền (VNĐ)</span>
                                <span className="text-primary-600">
                                    <PriceFormat>{intoMoney}</PriceFormat>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {order?.details?.map((d, index) => (
                            <div key={index} className="flex py-2 space-x-4 items-center">
                                <img
                                    src={d?.product?.images?.[0] || '/placeholder.png'}
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

                {/* FOMR */}
                <form
                    onSubmit={(e) => {
                        setValidateOnChange(true);
                        form.handleSubmit(e);
                    }}
                    className="flex-1"
                >
                    <div>
                        <label className="label" htmlFor="phone">
                            Số điện thoại *
                        </label>
                        <input
                            type="text"
                            id="phone"
                            disabled={customer ? true : false}
                            className={clsx('text-input', {
                                invalid: form.errors.phone,
                            })}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.phone}
                            name="phone"
                        />
                        <span
                            className={clsx('text-sm text-red-500 opacity-0', {
                                'opacity-100': form.errors.phone,
                            })}
                        >
                            {form.errors.phone || 'No message'}
                        </span>
                    </div>
                    <div className="mt-2">
                        <div className="flex items-center space-x-3">
                            <label className="label" htmlFor="address">
                                Địa chỉ giao hàng *
                            </label>
                            {customer && (
                                <button
                                    type="button"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                    onClick={() => form.setFieldValue('address', customer.address)}
                                >
                                    Mặc định
                                </button>
                            )}
                        </div>
                        <textarea
                            type="text"
                            id="address"
                            className={clsx('text-input !h-auto py-2', {
                                invalid: form.errors.address,
                            })}
                            onChange={form.handleChange}
                            value={form.values.address}
                            onBlur={form.handleBlur}
                            name="address"
                            rows={2}
                        ></textarea>
                        <span
                            className={clsx('-mt-1 block text-sm text-red-500 opacity-0', {
                                'opacity-100': form.errors.address,
                            })}
                        >
                            {form.errors.address || 'No message'}
                        </span>
                    </div>
                    {customer && (
                        <div className="mb-4 flex space-x-3">
                            <div className="w-[200px]">
                                <label className="label" htmlFor="coupon">
                                    Mã giảm giá
                                </label>
                                <input
                                    type="text"
                                    id="coupon"
                                    className={clsx('text-input')}
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value)}
                                />
                            </div>
                            {coupon && (
                                <div
                                    className={clsx('flex-1 rounded border px-4 py-2', {
                                        'border-green-600': coupon.canUse,
                                        'border-gray-300 bg-gray-100': !coupon.canUse,
                                    })}
                                >
                                    <p className="font-medium text-gray-700">{coupon.description}</p>
                                    <div className="flex space-x-3">
                                        <div className="space-x-1">
                                            <span className="text-gray-600">Giảm:</span>
                                            <span className="font-bold text-green-600">
                                                {coupon.discountPercent + '%'}
                                            </span>
                                        </div>

                                        {coupon.canUse ? (
                                            <div className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                Có thể dùng
                                            </div>
                                        ) : (
                                            <div className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                Hết lượt dùng
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        type="submit"
                        className={clsx('btn btn-md mt-2 w-full bg-red-500 hover:bg-red-400')}
                        disabled={loading || order.details.length === 0}
                    >
                        Đặt hàng
                    </button>
                </form>
            </div>
        </div>
    );
}
