import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { customerSelector } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import LoadingForm from '../../components/LoadingForm';
import { customerActions } from '../../redux/slices/customerSlide';

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
                className="mx-auto mt-5 max-w-[700px] rounded-xl border border-slate-300 p-5"
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
                                className="absolute top-1 right-1 rounded-full border bg-white px-2 py-2 text-red-600 hover:text-red-400"
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

                <div className="mt-6 flex items-center justify-end border-t pt-6 space-x-3">
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
                                className="btn bg-primary-600 hover:bg-primary-700 btn-md"
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

function OrderGroup() {
    return <div>Order group</div>;
}

export default function Profile() {
    return (
        <div className="px-[8vw] py-6 flex">
            <div className="flex-1 mr-6">
                <InfoGroup />
            </div>
            <div className="flex-1">
                <OrderGroup />
            </div>
        </div>
    );
}
