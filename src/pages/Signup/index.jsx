import { Fragment, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import 'react-toastify/dist/ReactToastify.css';
import LoadingForm from '../../components/LoadingForm';
import Select from 'react-select';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Trường này bắt buộc')
        .min(2, 'Tên phải có độ dài hơn 2 kí tự')
        .max(30, 'Tên dài tối đa 30 kí tự'),
    email: Yup.string().required('Trường này bắt buộc'),
    address: Yup.string().required('Trường này bắt buộc'),
    phone: Yup.string()
        .required('Trường này bắt buộc')
        .matches(/^[\+|0]([0-9]{9,14})\b/, 'Số điện thoại không hợp lệ'),
    password: Yup.string().required('Trường này bắt buộc'),
    province: Yup.object().required('Trường này bắt buộc'),
    district: Yup.object().required('Trường này bắt buộc'),
    commune: Yup.object().required('Trường này bắt buộc'),
});
function Signup() {
    const [loading, setLoading] = useState(false);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const showSuccessNoti = () => toast.success('Thêm khách hàng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

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
            console.log('isDis');
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
            name: '',
            email: '',
            phone: '',
            password: '',
            province: {},
            district: {},
            commune: {},
            address: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
        validateOnBlur: false,
        validateOnChange: validateOnChange,
    });

    async function handleFormsubmit(values) {
        console.log(values);
        setLoading(true);
        try {
            let imageUrl = null;
            if (image) {
                let formdata = new FormData();
                formdata.append('image', image.file);
                const res = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formdata,
                });

                const data = await res.json();
                imageUrl = data.image.url;
            }

            const res = await fetch('http://localhost:5000/api/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    avatar: imageUrl,
                }),
            });
            const resJson = await res.json();
            if (resJson.success) {
                showSuccessNoti();
                form.resetForm();
                setImage(null);
                navigate('/login');
            } else if (resJson.message === 'phone already exists') {
                toast.error('Số điện thoại đã tồn tại');
            } else {
                showErorrNoti();
            }
        } catch {
            showErorrNoti();
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
            <section className="bg-gray-200">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-4 md:h-screen lg:py-0">
                    <Link
                        to="/"
                        className="flex select-none items-center text-2xl font-semibold text-green-600"
                    >
                        <img className="mr-2 h-16 w-16" src="/mainLogo.png" alt="logo" />
                        Fresh Food
                    </Link>
                    <div className=" w-[648px] rounded-lg bg-white shadow">
                        <div className="space-y-4 p-8">
                            <h1 className="text-center text-2xl font-semibold text-gray-900">
                                Đăng ký thành viên
                            </h1>
                            <form
                                onSubmit={(e) => {
                                    setValidateOnChange(true);
                                    form.handleSubmit(e);
                                }}
                            >
                                <div className="flex justify-between gap-8">
                                    <div className="relative h-[150px] w-[150px] rounded-full border">
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
                                        {image && (
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
                                    <div className="flex grow flex-col">
                                        <label
                                            htmlFor="phone"
                                            className="mb-1 block font-medium text-gray-900 "
                                        >
                                            Số điện thoại*
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className={clsx('text-input w-full py-2', {
                                                invalid: form.errors.phone,
                                            })}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            value={form.values.phone}
                                            placeholder="Số điện thoại"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': form.errors.phone,
                                            })}
                                        >
                                            {form.errors.phone || 'No message'}
                                        </span>
                                        <label
                                            htmlFor="password"
                                            className="mb-1 block font-medium text-gray-900 "
                                        >
                                            Mật khẩu *
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            value={form.values.password}
                                            placeholder="Mật khẩu của bạn"
                                            className={clsx('text-input w-full py-2', {
                                                invalid: form.errors.password,
                                            })}
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': form.errors.password,
                                            })}
                                        >
                                            {form.errors.password || 'No message'}
                                        </span>
                                    </div>
                                </div>
                                <div className=" flex justify-between gap-1">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-1 block font-medium text-gray-900 "
                                        >
                                            Họ và tên *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={clsx('text-input w-full py-2', {
                                                invalid: form.errors.name,
                                            })}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            value={form.values.name}
                                            placeholder="Họ và tên"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': form.errors.name,
                                            })}
                                        >
                                            {form.errors.name || 'No message'}
                                        </span>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-1 block font-medium text-gray-900 "
                                        >
                                            Email *
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className={clsx('text-input w-full py-2', {
                                                invalid: form.errors.email,
                                            })}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            value={form.values.email}
                                            placeholder="Email"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': form.errors.email,
                                            })}
                                        >
                                            {form.errors.email || 'No message'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-1">
                                    <div className="flex flex-1 flex-col gap-1">
                                        <label
                                            htmlFor="province"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Tỉnh/Thành phố *
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
                                                console.log(selectedOption);
                                                form.setFieldValue('province', selectedOption); // Set form value
                                                resetDistricts();
                                                resetCommunes();
                                            }}
                                            placeholder="Chọn Tỉnh/T.Phố"
                                            isSearchable
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
                                            Quận/Huyện *
                                        </label>
                                        <Select
                                            id="district"
                                            className="mt-1 whitespace-nowrap"
                                            options={districts.map((district) => ({
                                                value: district,
                                                label: district.Name,
                                            }))}
                                            value={selectedDistrict && selectedDistrict.value}
                                            onChange={(selectedOption) => {
                                                setSelectedDistrict(selectedOption.value);
                                                form.setFieldValue(
                                                    'district',
                                                    selectedOption.value,
                                                ); // Set form value
                                                resetCommunes();
                                            }}
                                            placeholder="Chọn Quận/Huyện"
                                            isDisabled={!selectedProvince}
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
                                            Phường/Xã *
                                        </label>
                                        <Select
                                            id="commune"
                                            className="mt-1 whitespace-nowrap"
                                            options={communes.map((commune) => ({
                                                value: commune,
                                                label: commune.Name,
                                            }))}
                                            value={selectedCommune && selectedCommune.value}
                                            onChange={(selectedOption) => {
                                                setSelectedCommune(selectedOption.value);
                                                form.setFieldValue('commune', selectedOption.value); // Set form value
                                            }}
                                            isDisabled={!selectedDistrict}
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
                                    <label
                                        htmlFor="address"
                                        className="mb-1 block font-medium text-gray-900 "
                                    >
                                        Số nhà, tên đường *
                                    </label>
                                    <textarea
                                        id="address"
                                        className={clsx('text-input !h-auto py-2', {
                                            invalid: form.errors.address,
                                        })}
                                        onChange={form.handleChange}
                                        value={form.values.address}
                                        name="address"
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

                                <button
                                    type="submit"
                                    className="btn btn-blue btn-md mt-4 w-full"
                                    disabled={loading}
                                >
                                    {!loading ? (
                                        <span>Đăng ký</span>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 animate-spin"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                />
                                            </svg>
                                            <span className="ml-1">Đang đăng ký thành viên</span>
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="h-4"></div>
                </div>
            </section>
        </div>
    );
}

export default Signup;
