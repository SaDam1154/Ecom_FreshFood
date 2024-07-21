import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import useDebounce from '../../hooks/useDebouce';
import clsx from 'clsx';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PriceFormat from '../PriceFormat';
import apiConfig from '../../configs/apiConfig';
function FilterBar({ selectedTypes, setSelectedTypes, types, price, setPrice }) {
    function getPrice(price) {
        return price === 1000000 ? (
            'Vô hạn'
        ) : (
            <p>
                <PriceFormat>{price}</PriceFormat>đ
            </p>
        );
    }
    return (
        <div className="mt-1 flex space-x-2">
            <Listbox
                className="relative w-[200px]"
                value={selectedTypes}
                onChange={setSelectedTypes}
                multiple
                as="div"
            >
                <ListboxButton
                    className="w-full cursor-pointer rounded border px-3 py-1"
                    as="button"
                >
                    <div className="flex w-full items-center justify-between">
                        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {selectedTypes.length == 0
                                ? 'Tất cả danh mục'
                                : selectedTypes.map((t) => t.name).join(', ')}
                        </p>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </ListboxButton>
                <ListboxOptions className="absolute left-0 right-0 top-full z-20 rounded border bg-white">
                    {types.map((type) => (
                        <ListboxOption key={type.id} value={type} as={Fragment}>
                            {({ focus, selected }) => (
                                <div className={clsx('flex w-full', focus && 'bg-blue-100')}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={clsx('h-6 w-6', !selected && 'invisible')}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                        />
                                    </svg>
                                    {type.name}
                                </div>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

            <button className="group/price relative flex w-[250px] rounded border px-3 py-1 text-right">
                {price.from === 0 && price.to === 1000000 ? (
                    <div>Tất cả giá</div>
                ) : (
                    <div className="flex space-x-2">
                        <p> {getPrice(price.from)}</p>
                        <p>-</p>
                        <p>{getPrice(price.to)}</p>
                    </div>
                )}

                <div className="invisible absolute left-0 right-0 top-full z-20 rounded border bg-white p-3 shadow group-focus-within/price:visible">
                    <Slider
                        range
                        value={[price.from / 10000, price.to / 10000]}
                        onChange={(value) => {
                            console.log(value);
                            setPrice({ from: value[0] * 10000, to: value[1] * 10000 });
                        }}
                        allowCross={false}
                    />
                    <div className="flex justify-between">
                        <p>{getPrice(price.from)}</p>
                        <p>{getPrice(price.to)}</p>
                    </div>
                </div>
            </button>
        </div>
    );
}

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const searchInputValue = useDebounce(searchInput, 300);
    const [searchProducts, setSearchProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [price, setPrice] = useState({ from: 0, to: 1000000 });
    const { t } = useTranslation();

    useEffect(() => {
        fetch(apiConfig.apiUrl + '/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (!searchInputValue) {
            setSearchProducts([]);
            return;
        }

        fetch(apiConfig.apiUrl + '/api/product/search?q=' + searchInputValue)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setSearchProducts(resJson.products.filter(filterType).filter(filterPrice));
                } else {
                    setSearchProducts([]);
                }
            });
    }, [searchInputValue, price, selectedTypes]);

    function filterPrice(product) {
        if (product.price < price.from) {
            return false;
        }
        if (product.price > price.to && price.to < 1000000) {
            return false;
        }
        return true;
    }

    function filterType(product) {
        if (selectedTypes.length === 0) {
            return true;
        }
        return selectedTypes.map((t) => t.name).includes(product.type);
    }

    return (
        <div className="mx-2">
            <div className="group/panel relative flex w-[600px] max-w-[600px] grow">
                <input
                    className="grow rounded-l-lg border px-4 py-2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={t('header.searchPlaceholder')}
                />

                <button className="rounded-r-lg bg-orange-500 px-3 text-white">
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>

                {/* PANEL */}
                {searchInputValue && (
                    <div className="absolute left-0 right-0 top-11 z-30 hidden max-h-[500px] min-h-[300px] cursor-auto flex-col rounded-lg border bg-white shadow-md group-focus-within/panel:flex">
                        <button className="flex cursor-default border-b px-3 py-2">
                            <FilterBar
                                selectedTypes={selectedTypes}
                                setSelectedTypes={setSelectedTypes}
                                types={productTypes}
                                price={price}
                                setPrice={setPrice}
                            />
                        </button>
                        <div className="flex-1 cursor-default overflow-auto">
                            {searchProducts.length > 0 ? (
                                searchProducts.map((product) => (
                                    <Link
                                        to={'/product/' + product.id}
                                        key={product.id}
                                        className="search-result-item flex w-full cursor-pointer items-start justify-start space-x-3 border-b p-3 text-left hover:bg-gray-50"
                                    >
                                        <img
                                            className="h-20 w-20 rounded"
                                            src={product?.images[0]}
                                        />

                                        <div className="flex h-full flex-col justify-between">
                                            <h2
                                                className="line-clamp-1 font-bold"
                                                dangerouslySetInnerHTML={{
                                                    __html: product?.name || '',
                                                }}
                                            />
                                            <p className="mt-1 line-clamp-1 text-sm leading-4 text-gray-600">
                                                <span className="font-semibold">
                                                    {t('common.Category') + ': '}
                                                </span>
                                                <span
                                                    className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: product?.type || '',
                                                    }}
                                                />
                                            </p>
                                            <p
                                                className="mt-1 line-clamp-1 text-sm leading-4 text-gray-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: product?.description || '',
                                                }}
                                            />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="mt-16 flex h-full w-full cursor-default flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-10 w-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                    <p className="mt-3">{t('header.searchNotFound')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <FilterBar
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                types={productTypes}
                price={price}
                setPrice={setPrice}
            />
        </div>
    );
}

export default Search;
