import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import { customerSelector } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import LoadingForm from '../../components/LoadingForm';
import { customerActions } from '../../redux/slices/customerSlide';
import PriceFormat from '../../components/PriceFormat';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Trường này bắt buộc')
        .min(2, 'Tên phải có độ dài hơn 2 kí tự')
        .max(30, 'Tên dài tối đa 30 kí tự'),
    address: Yup.string().required('Trường này bắt buộc'),
});

function InfoGroup() {
    const customer = useSelector(customerSelector);
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [image, setImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useFormik({
        initialValues: {
            name: customer?.name || '',
            address: customer?.address || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });

    useEffect(() => {
        if (!customer) {
            navigate('/');
        }
        if (!isEdit) {
            setImage({ file: null, url: customer?.avatar });
            form.setFieldValue('name', customer?.name || '');
            form.setFieldValue('address', customer?.address || '');
        }
    }, [isEdit, customer]);

    async function handleFormsubmit(values) {
        setLoading(true);
        try {
            let reqValue = {};
            Object.keys(values).forEach((key) => {
                if (values[key] !== form.initialValues[key]) {
                    reqValue[key] = values[key];
                }
            });

            let imageUrl = null;
            if (image?.file) {
                let formdata = new FormData();
                formdata.append('image', image.file);
                const res = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formdata,
                });

                const data = await res.json();
                imageUrl = data.image.url;
            } else if (image?.url) {
                imageUrl = image.url;
            }

            reqValue.avatar = imageUrl;

            const res = await fetch('http://localhost:5000/api/customer/' + customer?.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqValue),
            });

            const resJson = await res.json();
            if (resJson.success) {
                toast.success('Cập nhật thông tin cá nhân thành công');
                setIsEdit(false);
                dispatch(customerActions.update(resJson.customer));
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (e) {
            console.log(e);
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }

    function onImageInputChange(e) {
        const url = URL.createObjectURL(e.target.files[0]);
        setImage({ file: e.target.files[0], url });
        e.target.value = null;
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    setValidateOnChange(true);
                    form.handleSubmit(e);
                }}
                className="mx-auto max-w-[700px] rounded-xl border border-slate-300 p-5"
            >
                <div className="relative flex pt-10">
                    <div
                        className={clsx('relative h-[150px] w-[150px] rounded-full border', {
                            'pointer-events-none': !isEdit,
                        })}
                    >
                        <img
                            className="absolute inset-0 block h-full w-full rounded-full object-cover"
                            src={image?.url || '/placeholder.png'}
                        />
                        <label
                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full"
                            htmlFor="image-input"
                        ></label>
                        <input
                            id="image-input"
                            type="file"
                            className="hidden"
                            onChange={onImageInputChange}
                        />
                        {image?.url && isEdit && (
                            <button
                                className="absolute right-1 top-1 rounded-full border bg-white px-2 py-2 text-red-600 hover:text-red-400"
                                onClick={() => setImage(null)}
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="ml-8 flex-1">
                        <div className="mb-4 flex flex-col">
                            <label className="label pointer-events-none" htmlFor="phone">
                                Số điện thoại:
                            </label>
                            <input
                                type="text"
                                className={clsx('text-input w-full py-[5px]')}
                                value={customer?.phone}
                                disabled
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className={clsx('label', {
                                    'pointer-events-none': !isEdit,
                                })}
                                htmlFor="name"
                            >
                                Tên khách hàng *
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={clsx('text-input w-full py-[5px]', {
                                    invalid: form.errors.name,
                                })}
                                onChange={form.handleChange}
                                value={form.values.name}
                                disabled={!isEdit}
                                name="name"
                                placeholder="Nguyễn Văn A"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.name,
                                })}
                            >
                                {form.errors.name || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label
                                className={clsx('label', {
                                    'pointer-events-none': !isEdit,
                                })}
                                htmlFor="address"
                            >
                                Địa chỉ *
                            </label>
                            <textarea
                                id="address"
                                className={clsx('text-input !h-auto py-2', {
                                    invalid: form.errors.address,
                                })}
                                onChange={form.handleChange}
                                value={form.values.address}
                                name="address"
                                rows={3}
                                disabled={!isEdit}
                            ></textarea>
                            <span
                                className={clsx('block text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.address,
                                })}
                            >
                                {form.errors.address || 'No message'}
                            </span>
                        </div>
                    </div>
                    <LoadingForm loading={loading} />
                </div>

                <div className="mt-6 flex items-center justify-end space-x-3 border-t pt-6">
                    {isEdit ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-red btn-md"
                                onClick={() => setIsEdit(false)}
                            >
                                <span>Hủy</span>
                            </button>
                            <button
                                type="submit"
                                className="btn btn-md bg-primary-600 hover:bg-primary-700"
                                disabled={loading}
                            >
                                <span>Cập nhật</span>
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-yellow btn-md"
                            onClick={() => setIsEdit(true)}
                        >
                            <span>Chỉnh sửa</span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

function DeliveryStatusCell({ value }) {
    return (
        <div className="flex justify-center">
            <div
                className={clsx('rounded p-2 py-1 text-xs font-medium ', {
                    'bg-green-100 text-green-800': value === 'delivered',
                    'bg-orange-100 text-orange-800': value === 'pending',
                    'bg-red-100 text-red-800': value === 'aborted',
                })}
            >
                {value === 'delivered' ? 'Đã giao' : value === 'pending' ? 'Đang chờ' : 'Đã huỷ'}
            </div>
        </div>
    );
}

function OrderList({ orders, onSelect }) {
    return (
        <div className="mt-3">
            <div className="flex space-x-3 rounded bg-primary-100 py-3 text-center font-medium">
                <div className="flex-1">Ngày</div>
                <div className="flex-1">Thành tiền</div>
                <div className="flex-1">Trạng thái</div>
            </div>

            {orders.length === 0 && (
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
                    <p className="text-lg font-medium text-gray-700">Chưa có đơn hàng nào!</p>
                </div>
            )}

            <div
                className="max-h-[352px]"
                style={{
                    overflowY: 'overlay',
                }}
            >
                {orders.map((order) => (
                    <div
                        key={order?.id}
                        className="flex cursor-pointer space-x-3 rounded py-3 text-center hover:bg-gray-50"
                        onClick={() => onSelect(order.id)}
                    >
                        <div className="flex-1">
                            {moment(order.createdAt).format('HH:mm DD/MM/YYYY')}
                        </div>
                        <div className="flex-1">
                            <PriceFormat>{order?.intoMoney}</PriceFormat>
                        </div>
                        <div className="flex-1">
                            <DeliveryStatusCell value={order?.deliveryStatus} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OrderDetail({ order }) {
    return (
        <div className="mt-5">
            <div className="mt-3 text-gray-600">
                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <span>Tổng giá (VNĐ)</span>
                        <span>
                            <PriceFormat>{order?.totalPrice}</PriceFormat>
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Giảm giá (VNĐ)</span>
                        <span>
                            <PriceFormat>{order?.totalPrice - order?.intoMoney}</PriceFormat>
                        </span>
                    </div>
                </div>
                <div className="mt-2 flex justify-between border-t py-2 text-lg font-semibold">
                    <span>Thành tiền (VNĐ)</span>
                    <span className="text-primary-600">
                        <PriceFormat>{order?.intoMoney}</PriceFormat>
                    </span>
                </div>
            </div>
            <div className="mt-5">
                {order?.details?.map((d, index) => (
                    <div key={index} className="flex items-center space-x-4 py-2">
                        <img
                            src={d?.product?.images?.[0] || '/placeholder.png'}
                            className="h-[60px] w-[60px] rounded object-cover"
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
    );
}

function OrderGroup() {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const customer = useSelector(customerSelector);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, [customer]);

    useEffect(() => {
        if (!selectedOrderId) {
            setSelectedOrder(null);
        } else {
            fetch('http://localhost:5000/api/order/' + selectedOrderId)
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.success) {
                        setSelectedOrder(resJson.order);
                    } else {
                        setSelectedOrder(null);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSelectedOrder(null);
                });
        }
    }, [selectedOrderId]);

    function getOrders() {
        fetch('http://localhost:5000/api/order')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setOrders(
                        resJson.orders
                            .filter((o) => o.customer && o.customer === customer._id)
                            .sort((a, b) => b.id - a.id),
                    );
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setOrders([]);
            });
    }

    return (
        <div className="rounded-lg border p-5">
            <div className="flex items-center space-x-3">
                {selectedOrderId && (
                    <button onClick={() => setSelectedOrderId(null)}>
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
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                    </button>
                )}
                <p className="text-lg font-semibold">Đơn hàng</p>
            </div>
            {!selectedOrderId ? (
                <OrderList orders={orders} onSelect={(id) => setSelectedOrderId(id)} />
            ) : (
                <OrderDetail order={selectedOrder} />
            )}
        </div>
    );
}

export default function Profile() {
    return (
        <div className="flex px-[8vw] py-6">
            <div className="mr-6 flex-1">
                <InfoGroup />
            </div>
            <div className="flex-1">
                <OrderGroup />
            </div>
        </div>
    );
}
