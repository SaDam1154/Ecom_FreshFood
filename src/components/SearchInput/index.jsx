import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function stringToSlug(str) {
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        tooo = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), tooo[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

function Search() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchProducts, setSearchProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error(data.error);
                    setProducts([]);
                }
                setProducts(data.products);
            })
            .catch((error) => {
                console.error(error);
                setProducts([]);
            });
    }, []);

    useEffect(() => {
        if (!searchInput) {
            setSearchProducts([]);
            return;
        }
        const newSearchProducts = products
            .filter((product) => stringToSlug(product.name).includes(stringToSlug(searchInput)))
            .slice(0, 5);
        setSearchProducts(newSearchProducts);
    }, [products, searchInput]);

    return (
        <div className="group relative mx-2 flex w-[500px] max-w-[500px] grow">
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
            {searchInput && (
                <button className="absolute left-0 right-0 top-14  z-30 hidden min-h-[200px] cursor-auto flex-col space-y-2 rounded-lg border bg-white p-3 shadow-md group-focus-within:flex">
                    {searchProducts.length > 0 ? (
                        searchProducts.map((product) => (
                            <Link
                                to={'/product/' + product.id}
                                key={product._id}
                                className="flex w-full cursor-pointer items-start justify-start gap-3 rounded-md border border-gray-300 px-3 py-2 text-left hover:shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <img className="h-20 w-20" src={product?.images[0]} />
                                </div>
                                <div className="flex h-full flex-col justify-between">
                                    <h2 className="line-clamp-1 font-bold">{product?.name}</h2>
                                    <p className="mt-1 line-clamp-1 text-sm leading-4 text-gray-600">
                                        {product?.description}
                                    </p>
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
                            <p className="mt-3">Not Found!</p>
                        </div>
                    )}
                </button>
            )}
        </div>
    );
}

export default Search;
