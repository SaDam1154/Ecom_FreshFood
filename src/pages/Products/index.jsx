import Sidebar from '../../layouts/components/Sidebar';
import HoverLinks from '../../components/HoverLinks';
import { CardProduct } from '../../components/CardProduct';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerSelector, langSelector } from '../../redux/selectors';
import { customerActions } from '../../redux/slices/customerSlide';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const { type } = useParams();
    const lang = useSelector(langSelector);
    const dispatch = useDispatch();
    const customer = useSelector(customerSelector);
    const { t } = useTranslation();
    const [products, setProducts] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getProducts();
        getTypes();
        console.log(customer?.listFavorite, 'đây là customer bên product');
    }, [type, lang]);

    function getTypes() {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    resJson.productTypes.forEach((t) => {
                        if (t._id === type) {
                            setTypeName(lang === 'Vi' ? t.name : t.nameEN);
                        }
                    });
                } else {
                    setTypeName(null);
                }
            });
    }

    function getProducts() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            });
    }

    const handleAddToFavorites = (product) => {
        if (customer) {
            dispatch(customerActions.addToFavorites(product));
            toast.success(`${t('product.addedToFavorites')} ${product.name}`);
        } else {
            toast.error(t('product.pleaseLogin'));
        }
    };

    return (
        <div className="flex h-auto w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll p-8 sm:px-12 lg:px-20 xl:px-28">
            <div className="3xl:grid-cols-6 grid h-full w-full grid-cols-1  xl:grid-cols-4  2xl:grid-cols-5">
                <div className="mr-1 flex flex-col gap-2 rounded-2xl bg-slate-100 p-1 sm:mr-2 lg:mr-3 lg:p-2 xl:mr-4 2xl:mr-5">
                    <div className="flex w-full flex-col items-start justify-center gap-1">
                        <span className="select-none text-3xl font-semibold">
                            {t('common.Category')}
                        </span>
                        <hr className=" h-1 w-12 rounded border-0 bg-green-400" />
                    </div>
                    <HoverLinks />
                </div>
                {products ? (
                    <div className="3xl:col-span-5 flex flex-col gap-8 sm:col-span-2 xl:col-span-3 2xl:col-span-4">
                        <div className="flex flex-col">
                            <div className="flex w-full flex-col items-end justify-center gap-1">
                                <span className="select-none text-3xl font-semibold text-neutral-900">
                                    {type
                                        ? lang === 'Vi'
                                            ? typeName
                                            : typeName
                                        : t('product.all')}
                                </span>
                                <hr className=" h-1 w-48 rounded border-0 bg-green-400" />

                                <span className="text-[#4a5568]">
                                    {type
                                        ? products.filter((product) => product.type._id === type)
                                              .length > 0
                                            ? t('product.description')
                                            : t('product.blank')
                                        : t('product.description')}
                                </span>
                            </div>
                            <div className="3xl:grid-cols-4 grid grid-cols-1 gap-3 p-1 pb-2 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                                {type
                                    ? products
                                          .filter((product) => product.type._id === type)
                                          .map((product, index) => (
                                              <CardProduct key={index} product={product} />
                                          ))
                                    : products.map((product, index) => (
                                          <CardProduct key={index} product={product} />
                                      ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">{t('common.loading')}</div>
                )}
            </div>
        </div>
    );
}

export default Products;
