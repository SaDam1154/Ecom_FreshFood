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
import { orderSelector, langSelector } from '../../redux/selectors';
import PriceFormat from '../PriceFormat';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeartIcon as SolidHeartIcon, StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import {
    HeartIcon as OutlineHeartIcon,
    StarIcon as OutlineStarIcon,
} from '@heroicons/react/24/outline';
import { customerSelector } from '../../redux/selectors';
import { customerActions } from '../../redux/slices/customerSlide';

export function CardProduct({ product, onFavoriteToggle }) {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const lang = useSelector(langSelector);
    const [qty, setQty] = useState(1);
    const { t } = useTranslation();
    const customer = useSelector(customerSelector);

    function handleAddToCart() {
        if (order.details.find((d) => d.product._id === product._id)) {
            toast.info('Sản phẩm đã có trong giỏ hàng!');
            console.log(lang);
        } else {
            dispatch(
                orderActions.addMany({
                    product,
                    quantity: qty,
                    price: product?.price,
                    priceDiscounted: product?.priceDiscounted,
                }),
            );
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
            console.log(lang);
        }
    }

    const handleAddToFavorites = (product) => {
        const isInFavorites = customer.listFavorite?.find((fav) => fav === product._id);
        const endpoint = isInFavorites
            ? `remove-from-favorites/${product._id}`
            : `add-to-favorites/${product._id}`;

        fetch(`http://localhost:5000/api/customer/${customer.id}/${endpoint}`, {
            method: 'POST',
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    if (isInFavorites) {
                        dispatch(customerActions.removeFromFavorites(product._id));
                        toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích!');
                    } else {
                        dispatch(customerActions.addToFavorites(product._id));
                        toast.success('Đã thêm sản phẩm vào danh sách yêu thích!');
                    }
                } else {
                    toast.error('Đã xảy ra lỗi khi thực hiện thao tác!');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Đã xảy ra lỗi khi thực hiện thao tác!');
            });
    };

    useEffect(() => {
        console.log(lang?.value);
    }, [lang.value]);

    return (
        <Card className="group flex w-full max-w-[26rem] cursor-pointer flex-col justify-between border-[1px] shadow-lg">
            <div className="z-10 flex flex-1 flex-col">
                <CardHeader floated={false} color="blue-gray">
                    <Link to={'/product/' + product.id}>
                        <img
                            src={product.images[0]}
                            alt="ui/ux review check"
                            className="h-[200px] w-[384px] scale-100 cursor-pointer object-cover shadow-none transition duration-300 ease-in-out hover:shadow-none focus:bg-slate-300 group-hover:scale-105 lg:h-[230px] 2xl:h-[260px]"
                        />
                    </Link>
                </CardHeader>
                <CardBody className="flex flex-1 justify-between">
                    <Link
                        to={'/product/' + product.id}
                        className="flex flex-1 flex-col items-start justify-start"
                    >
                        <Typography variant="h5" color="blue-gray" className="font-medium">
                            {lang == 'Vi' ? product.name : product.nameEN}
                        </Typography>
                        {product?.discount?.type != 'noDiscount' && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm font-semibold text-red-500 line-through">
                                    <PriceFormat>{product?.price}</PriceFormat> VNĐ
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-500">
                                <PriceFormat>{product?.priceDiscounted}</PriceFormat> VNĐ
                            </span>
                        </div>
                    </Link>
                    <Typography
                        color="gray"
                        className="z-50 flex flex-col items-center justify-start"
                    >
                        <Typography>
                            {product.ratings?.length ? (
                                <div className="flex items-center gap-1.5 font-normal   ">
                                    <SolidStarIcon className="h-6 w-6 text-yellow-300" />
                                    {product.ratings.reduce((prev, curr) => prev + curr.score, 0) /
                                        product.ratings?.length}
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 font-normal   ">
                                    <OutlineStarIcon className="h-6 w-6 text-yellow-300" />0
                                </div>
                            )}
                        </Typography>

                        <IconButton
                            onClick={() => handleAddToFavorites(product)}
                            className=" h-6 w-6 border-none shadow-none"
                        >
                            {customer &&
                            customer?.listFavorite?.find((fav) => fav === product._id) ? (
                                <SolidHeartIcon className="h-6 w-6 text-red-500" />
                            ) : (
                                <OutlineHeartIcon className="h-6 w-6 text-gray-400" />
                            )}
                        </IconButton>
                    </Typography>
                </CardBody>
            </div>
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
