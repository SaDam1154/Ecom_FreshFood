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
import Select from 'react-select';
import apiConfig from '../../configs/apiConfig';

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
    console.log(customer);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCommune, setSelectedCommune] = useState(null);

    useEffect(() => {
        fetch('https://api.npoint.io/ac646cb54b295b9555be')
            .then((response) => response.json())
            .then((data) => setProvinces(data));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch('https://api.npoint.io/34608ea16bebc5cffd42')
                .then((response) => response.json())
                .then((data) =>
                    setDistricts(data.filter((d) => d.ProvinceId === selectedProvince?.Id)),
                );
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch('https://api.npoint.io/dd278dc276e65c68cdf5')
                .then((response) => response.json())
                .then((data) =>
                    setCommunes(data.filter((c) => c.DistrictId === selectedDistrict?.Id)),
                );
        }
    }, [selectedDistrict]);

    function resetDistricts() {
        setDistricts([]);
        setSelectedDistrict(null);
        form.setFieldValue('district', '');
    }
    function resetCommunes() {
        setCommunes([]);
        setSelectedCommune(null);
        form.setFieldValue('commune', '');
    }

    const form = useFormik({
        initialValues: {
            name: customer?.name || '',
            province: customer?.province || {},
            district: customer?.district || {},
            commune: customer?.commune || {},
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
            form.setFieldValue('province', customer?.province || {});
            form.setFieldValue('district', customer?.district || {});
            form.setFieldValue('commune', customer?.commune || {});
            setSelectedProvince(customer?.province);
            setSelectedDistrict(customer?.district);
            setSelectedCommune(customer?.commune);
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
                const res = await fetch(apiConfig.apiUrl + '/api/upload', {
                    method: 'POST',
                    body: formdata,
                });

                const data = await res.json();
                imageUrl = data.image.url;
            } else if (image?.url) {
                imageUrl = image.url;
            }

            reqValue.avatar = imageUrl;
            console.log(values, 'valk');
            console.log(reqValue, 'valk');

            const res = await fetch(apiConfig.apiUrl + '/api/customer/' + customer?.id, {
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
                <div className="flex flex-col">
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
                        </div>
                    </div>

                    <div className="flex justify-between gap-1">
                        <div className="flex flex-1 flex-col gap-1">
                            <label
                                htmlFor="province"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                id="province"
                                className="mt-1 flex-1 whitespace-nowrap"
                                options={provinces}
                                getOptionLabel={(option) => option.Name}
                                getOptionValue={(option) => option.Id}
                                value={selectedProvince}
                                onChange={(selectedOption) => {
                                    setSelectedProvince(selectedOption);
                                    console.log(selectedOption, 'selectedOption');
                                    form.setFieldValue('province', selectedOption); // Set form value
                                    resetDistricts();
                                    resetCommunes();
                                }}
                                placeholder="Chọn Tỉnh/T.Phố"
                                isDisabled={!isEdit}
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.province,
                                })}
                            >
                                {form.errors.province || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                            <label
                                htmlFor="district"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Quận/Huyện
                            </label>
                            <Select
                                id="districts"
                                className="mt-1 whitespace-nowrap"
                                name="districts"
                                options={districts}
                                getOptionLabel={(option) => option.Name}
                                getOptionValue={(option) => option.Id}
                                value={selectedDistrict}
                                onChange={(selectedOption) => {
                                    setSelectedDistrict(selectedOption);
                                    form.setFieldValue('district', selectedOption);
                                    resetCommunes();
                                }}
                                onBlur={form.handleBlur}
                                placeholder="Chọn tỉnh/thành phố"
                                isSearchable
                                isDisabled={!isEdit}
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.district,
                                })}
                            >
                                {form.errors.district || 'No message'}
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                            <label
                                htmlFor="commune"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Phường/Xã
                            </label>
                            <Select
                                id="commune"
                                className="mt-1 whitespace-nowrap"
                                options={communes}
                                getOptionLabel={(option) => option.Name}
                                getOptionValue={(option) => option.Id}
                                value={selectedCommune}
                                onChange={(selectedOption) => {
                                    setSelectedCommune(selectedOption);
                                    form.setFieldValue('commune', selectedOption); // Set form value
                                }}
                                isDisabled={!isEdit || !selectedDistrict}
                                placeholder="Chọn Phường/Xã"
                            />
                            <span
                                className={clsx('text-sm text-red-500 opacity-0', {
                                    'opacity-100': form.errors.commune,
                                })}
                            >
                                {form.errors.commune || 'No message'}
                            </span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address" className="mb-1 block font-medium text-gray-900 ">
                            Địa chỉ cụ thể*
                        </label>
                        <textarea
                            id="address"
                            className={clsx('text-input !h-auto py-2', {
                                invalid: form.errors.address,
                            })}
                            onChange={form.handleChange}
                            value={form.values.address}
                            name="address"
                            disabled={!isEdit}
                            rows={2}
                        ></textarea>

                        <span
                            className={clsx('text-sm text-red-500 opacity-0', {
                                'opacity-100': form.errors.address,
                            })}
                        >
                            {form.errors.address || 'No message'}
                        </span>
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
            fetch(apiConfig.apiUrl + '/api/order/' + selectedOrderId)
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
        fetch(apiConfig.apiUrl + '/api/order')
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
