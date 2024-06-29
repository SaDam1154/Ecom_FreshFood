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
import ReactDOMServer from 'react-dom/server';
import EmailTemplate from './template.jsx';
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
    const [voucher, setVoucher] = useState(null);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash');
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
        getVouchers();
    }, []);

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

    const intoMoneyByVoucher = useMemo(() => {
        if (!voucher) {
            return order?.totalPrice;
        }
        return order?.totalPrice - calcDiscount(voucher, order);
    }, [voucher, order]);

    function handleFormsubmit(values) {
        try {
            if (paymentMethod === 'cash') {
                handlePayViaCash(values);
            } else if (paymentMethod === 'zalopay') {
                handlePayViaZaloPay(values);
            }
        } catch (e) {
            console.log(error);
            toast.error('Có lỗi xảy ra');
        }
    }

    function handlePayViaCash(values) {
        const details = order.details.map((d) => ({
            product: d.product._id,
            quantity: d.quantity,
            price: d.price,
        }));
        const _order = {
            customerId: customer?._id,
            deliveryStatus: 'pending',
            paymentStatus: 'unpaid',
            details: details,
            receivedMoney: order.totalPrice,
            totalPrice: order.totalPrice,
            intoMoney: intoMoneyByVoucher,
            coupon: coupon?.canUse ? coupon?._id : null,
            exchangeMoney: 0,
            name: customer?.name,
            phone: values.phone,
            address: values.address,
        };
        createOrder(_order);
    }

    async function handlePayViaZaloPay(values) {
        setLoading(true);
        // Store order to local storage
        const details = order.details.map((d) => ({
            product: d.product._id,
            quantity: d.quantity,
            price: d.price,
        }));
        const pendingOrder = {
            customerId: customer?._id,
            deliveryStatus: 'pending',
            paymentStatus: 'paid',
            details: details,
            receivedMoney: order.totalPrice,
            totalPrice: order.totalPrice,
            intoMoney: intoMoneyByVoucher,
            coupon: coupon?.canUse ? coupon?._id : null,
            exchangeMoney: 0,
            name: customer?.name,
            phone: values.phone,
            address: values.address,
        };
        localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));

        // redirect to gateway
        const res = await fetch('http://localhost:5000/api/payment/create-trans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'ZALOPAY',
                amount: intoMoney,
                redirecturl: window.location.href,
            }),
        });
        const resJson = await res.json();
        if (!resJson.success) {
            throw new Error();
        }
        const url = resJson.trans.orderUrl;
        window.location = url;
    }

    function createOrder(_order) {
        setLoading(true);
        fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_order),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    dispatch(orderActions.reset());
                    toast.success('Đặt hàng thành công');
                    // const templateParams = {
                    //     Subject: 'Shop Thực Phẩm Sạch đã nhận đơn hàng.',
                    //     Title: 'Cảm ơn bạn đã đặt hàng tại',
                    //     Status: 'Đang chờ xử lý',
                    //     Name: _order?.name,
                    //     Address: _order?.address,
                    //     Phone: _order?.phone,
                    //     TotalPrice: _order.totalPrice || '0',
                    //     DiscountPercent: _order?.totalPrice - _order?.intoMoney || '0',
                    //     IntoMoney: _order?.intoMoney || '0',
                    //     Link: 'http://localhost:5173/profile',
                    //     reply_to: '20521154@gm.uit.edu.vn',
                    // };
                    const template = {
                        status: 'Đang chờ xử lý',
                        orderProduct: order,
                        order: _order,
                        link: 'http://localhost:5173/profile',
                        reply_to: '20521154@gm.uit.edu.vn',
                    };
                    const templateHTML = ReactDOMServer.renderToStaticMarkup(
                        <EmailTemplate template={template} />,
                    );
                    const templateParams = {
                        Subject: 'FreshFood Shop cảm ơn quý khách đã mua sản phẩm!',
                        HTMLContent: templateHTML,
                        reply_to: '20521154@gm.uit.edu.vn',
                    };
                    emailjs
                        .send(
                            'service_3dwhkaf',
                            'template_m7a86er',
                            templateParams,
                            'JcAqZIglb_PsOO35p',
                        )
                        .then(
                            (response) => {
                                console.log('SUCCESS!', response.status, response.text);
                            },
                            (err) => {
                                console.log('FAILED...', err);
                            },
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

    useEffect(() => {
        const pendingOrder = localStorage.getItem('pendingOrder');
        localStorage.removeItem('pendingOrder');
        const url = new URL(window.location.href);
        const status = url.searchParams.get('status');
        if (pendingOrder && status == 1) {
            createOrder(JSON.parse(pendingOrder));
        } else if (status && status != 1) {
            navigate('/');
            toast.error('Có lỗi xảy ra');
        }
    }, []);

    function getVouchers() {
        fetch('http://localhost:5000/api/voucher/get-active-by-customer-id/' + customer?.id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setVouchers(
                        resJson.vouchers.filter((voucher) => validateVoucher(voucher, order)),
                    );
                    console.log(resJson.vouchers);
                } else {
                    setVouchers([]);
                }
            })
            .catch((e) => {
                setVouchers([]);
            });
    }

    function validateVoucher(voucher, order) {
        console.log(voucher, order);
        if (voucher.orderCondition.targets === null) {
            return order.totalPrice >= voucher.orderCondition.condition.value;
        }
        if (voucher.orderCondition.condition.type === 'amount') {
            const targetsPrice = voucher.orderCondition?.targets?.reduce((prev, curr) => {
                const _detail = order.details.find((d) => d?.product?.id === curr);
                return prev + (_detail ? _detail.price * _detail?.quantity : 0);
            }, 0);
            return targetsPrice >= voucher.orderCondition.condition.value;
        }

        const targetsQuantity = voucher.orderCondition?.targets?.reduce((prev, curr) => {
            const _detail = order.details.find((d) => d?.product?.id === curr);
            return prev + (_detail?.quantity || 0);
        }, 0);

        return targetsQuantity >= voucher.orderCondition.value;
    }

    function calcDiscount(voucher, order) {
        let targetsPrice;
        if (voucher.discountTargets === null) {
            targetsPrice = order.totalPrice;
        } else {
            targetsPrice = voucher.discountTargets?.reduce((prev, curr) => {
                const _detail = order.details.find((d) => d?.product?.id === curr);
                return prev + (_detail ? _detail.price * _detail?.quantity : 0);
            }, 0);
        }
        if (voucher.discount.type === 'percent') {
            return Math.min((targetsPrice * voucher.discount?.value) / 100, voucher.limit);
        } else {
            return targetsPrice - voucher.discount.value > 0 ? voucher.discount.value : 0;
        }
    }

    return (
        <div className="px-[8vw] py-10">
            <div className="flex space-x-6">
                {/* CART */}
                <div className="w-[400px] rounded-lg bg-gray-50 p-4">
                    <div className="">
                        <p className="mt-5 border-b pb-2 text-lg font-medium">Tổng giỏ hàng</p>
                        <div className="mt-3 text-gray-600">
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
                                        <PriceFormat>
                                            {order.totalPrice - intoMoneyByVoucher}
                                        </PriceFormat>
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between border-t py-2 text-lg font-semibold">
                                <span>Thành tiền (VNĐ)</span>
                                <span className="text-primary-600">
                                    <PriceFormat>{intoMoneyByVoucher}</PriceFormat>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {order?.details?.map((d, index) => (
                            <div key={index} className="flex items-center space-x-4 py-2">
                                <img
                                    src={d?.product?.images?.[0] || '/placeholder.png'}
                                    className="h-[70px] w-[70px] rounded object-cover"
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
                            {/* <div className="w-[200px]">
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
                                    <p className="font-medium text-gray-700">
                                        {coupon.description}
                                    </p>
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
                            )} */}

                            <div>
                                <label className="label" htmlFor="coupon">
                                    Phiếu giảm giá
                                </label>

                                <div className="flex flex-wrap">
                                    {[...vouchers]?.map((_voucher) => (
                                        <div
                                            className={clsx(
                                                'mb-2 mr-2 w-72 cursor-pointer rounded border-2 px-4 py-2',
                                                {
                                                    'border-green-600':
                                                        voucher?.id === _voucher?.id,
                                                    // 'border-gray-300 bg-gray-100': !coupon.canUse,
                                                },
                                            )}
                                            onClick={() => {
                                                if (voucher?.id === _voucher?.id) {
                                                    setVoucher(null);
                                                } else {
                                                    setVoucher(_voucher);
                                                }
                                            }}
                                        >
                                            <p className="font-medium text-gray-700">
                                                {_voucher.description}
                                            </p>
                                            <div className="space-x-1">
                                                <span className="text-gray-600">Giảm:</span>
                                                <span className="font-bold text-green-600">
                                                    {_voucher.discount.value +
                                                        (_voucher.discount.type === 'percent'
                                                            ? '%'
                                                            : 'VNĐ')}
                                                </span>

                                                {_voucher.discount.type === 'percent' && (
                                                    <>
                                                        <span className="text-gray-600">
                                                            , Tối đa:
                                                        </span>
                                                        <span className="font-bold text-green-600">
                                                            <PriceFormat>
                                                                {_voucher.limit}
                                                            </PriceFormat>
                                                            {'VNĐ'}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="label">Phương thức thanh toán</label>
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                className={clsx(
                                    'flex flex-1 items-center space-x-4 rounded border p-3',
                                    {
                                        'border-green-600 bg-green-50': paymentMethod === 'cash',
                                    },
                                )}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-8 w-8"
                                    >
                                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-lg font-semibold">
                                        Thanh toán khi nhận hàng
                                    </p>
                                    <p className="text-gray-700">Thanh toán khi nhận hàng</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={clsx(
                                    'flex flex-1 items-center space-x-4 rounded border p-3',
                                    {
                                        'border-green-600 bg-green-50': paymentMethod === 'zalopay',
                                    },
                                )}
                                onClick={() => setPaymentMethod('zalopay')}
                            >
                                <div className="text-blue-500">
                                    <img
                                        className="h-8 w-8"
                                        alt="Logo ZaloPay"
                                        src="https://play-lh.googleusercontent.com/MXoXRQvKYcPzk0AITb6nVJUxZMaWYESXar_HwK8KXbGMboZPQjcwVBcVtXlpOkfD7PM=w240-h480-rw"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg font-semibold">ZaloPay</p>
                                    <p className="text-gray-700">
                                        Quét QR đa năng, thẻ ATM hoặc thẻ quốc tế
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
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
