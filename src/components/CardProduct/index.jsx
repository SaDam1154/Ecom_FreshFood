import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { orderActions } from '../../redux/slices/orderSlice';
import { orderSelector } from '../../redux/selectors';
import PriceFormat from '../PriceFormat';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export function CardProduct({ product }) {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const [qty, setQty] = useState(1);
    const { t } = useTranslation();
    function handleAddToCart() {
        if (order.details.find((d) => d.product._id === product._id)) {
            toast.info('Sản phẩm đã có trong giỏ hàng!');
        } else {
            dispatch(orderActions.addMany({ product, quantity: qty, price: product?.price }));
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        }
    }
    return (
        <Card className="group flex w-full max-w-[26rem] cursor-pointer flex-col justify-between border-[1px] shadow-lg">
            <Link to={'/product/' + product.id}>
                <CardHeader floated={false} color="blue-gray">
                    <img
                        src={product.images[0]}
                        alt="ui/ux review check"
                        className="h-[200px] w-[384px] scale-100  cursor-pointer object-cover shadow-none transition duration-300  ease-in-out hover:shadow-none focus:bg-slate-300 group-hover:scale-105  lg:h-[230px] 2xl:h-[260px] "
                    />
                </CardHeader>
                <CardBody className="grow">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="font-medium">
                            {product.name}
                        </Typography>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-0.5 h-5 w-5 text-yellow-300"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            5.0
                        </Typography>
                    </div>
                    <Typography color="gray">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-500">
                                <PriceFormat>{product?.price}</PriceFormat> VNĐ
                            </span>
                        </div>
                    </Typography>
                </CardBody>
            </Link>
            <CardFooter className="pt-0">
                <Button
                    onClick={handleAddToCart}
                    ripple={false}
                    fullWidth={true}
                    className={clsx(
                        'scale-100 bg-blue-200 text-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:bg-slate-300 focus:shadow-none active:scale-100',
                        {
                            'bg-slate-300': order.details.find(
                                (d) => d.product._id === product._id,
                            ),
                        },
                    )}
                >
                    {t('common.AddToCart')}
                </Button>
            </CardFooter>
        </Card>
    );
}
