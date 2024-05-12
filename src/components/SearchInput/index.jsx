import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDebounce from '../../hooks/useDebouce';

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const searchInputValue = useDebounce(searchInput, 300);
    const [searchProducts, setSearchProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {}, []);

    useEffect(() => {
        if (!searchInputValue) {
            setSearchProducts([]);
            return;
        }

        fetch('http://localhost:5000/api/product/search?q=' + searchInputValue)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setSearchProducts(resJson.products);
                } else {
                    setSearchProducts([]);
                }
            });
    }, [searchInputValue]);

    return (
        <div className="group relative mx-2 flex w-[600px] max-w-[600px] grow">
            <input
                className="grow rounded-l-lg border px-4 py-3"
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
                <div className="absolute left-0 right-0 top-14 z-30 hidden max-h-[500px] min-h-[200px] cursor-auto flex-col overflow-auto rounded-lg border bg-white shadow-md group-focus-within:flex">
                    {searchProducts.length > 0 ? (
                        searchProducts.map((product) => (
                            <Link
                                to={'/product/' + product.id}
                                key={product.id}
                                className="search-result-item flex w-full cursor-pointer items-start justify-start space-x-3 border-b p-3 text-left hover:bg-gray-50"
                            >
                                <img className="h-20 w-20 rounded" src={product?.images[0]} />

                                <div className="flex h-full flex-col justify-between">
                                    <h2
                                        className="line-clamp-1 font-bold"
                                        dangerouslySetInnerHTML={{ __html: product?.name || '' }}
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
                        <div className="mt-8 flex h-full w-full flex-col items-center">
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
            )}
        </div>
    );
}

export default Search;
