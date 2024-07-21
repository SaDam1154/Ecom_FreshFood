import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { langSelector } from '../../redux/selectors';
import apiConfig from '../../configs/apiConfig';
export default function HoverLinks({ home }) {
    const [productTypes, setProductTypes] = useState([]);
    const lang = useSelector(langSelector);

    var linkTo = '/';
    if (home) linkTo = '/products/';

    useEffect(() => {
        getProductTypes();
    }, []);

    function getProductTypes() {
        fetch(apiConfig.apiUrl + '/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            });
    }
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };
    return (
        <div className="flex h-auto w-full flex-col items-center justify-start">
            <Link
                to={'/products'}
                className="group relative flex w-full cursor-pointer items-center justify-between"
            >
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    initial="initial"
                    whileHover="whileHover"
                    className="group relative flex w-full items-center justify-between border-b-2 border-neutral-700 px-1  transition-colors duration-500  hover:border-[#0da487] hover:text-[] lg:px-2 xl:px-3"
                >
                    <div>
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: -16 },
                            }}
                            transition={{
                                type: 'spring',
                                staggerChildren: 0.075,
                                delayChildren: 0.25,
                            }}
                            className="relative z-10 block text-base font-semibold text-neutral-950 transition-colors duration-500 group-hover:text-[#0da487] xl:text-base 2xl:text-lg "
                        >
                            <motion.span
                                variants={{
                                    initial: { x: 0 },
                                    whileHover: { x: 16 },
                                }}
                                transition={{ type: 'spring' }}
                                className="inline-block"
                            >
                                {lang == 'Vi' ? 'Tất cả' : 'All'}
                            </motion.span>
                        </motion.span>
                    </div>

                    <motion.div
                        variants={{
                            initial: {
                                x: '25%',
                                opacity: 0,
                            },
                            whileHover: {
                                x: '0%',
                                opacity: 1,
                            },
                        }}
                        transition={{ type: 'spring' }}
                        className="relative z-10 px-1 py-1 sm:px-2 sm:py-2 xl:py-3 "
                    >
                        <FiArrowRight className="text-xl text-neutral-950 group-hover:text-[#0da487] sm:text-xl lg:text-2xl  2xl:text-4xl" />
                    </motion.div>
                </motion.div>
            </Link>
            {productTypes.map((productType, index) => {
                return (
                    <Link
                        key={index}
                        to={'/products/' + productType._id}
                        className="group relative flex w-full cursor-pointer items-center justify-between"
                    >
                        <motion.div
                            ref={ref}
                            onMouseMove={handleMouseMove}
                            initial="initial"
                            whileHover="whileHover"
                            className="group relative flex w-full items-center justify-between border-b-2 border-neutral-700 px-1  transition-colors duration-500  hover:border-[#0da487] hover:text-[] lg:px-2 xl:px-3"
                        >
                            <div>
                                <motion.span
                                    variants={{
                                        initial: { x: 0 },
                                        whileHover: { x: -16 },
                                    }}
                                    transition={{
                                        type: 'spring',
                                        staggerChildren: 0.075,
                                        delayChildren: 0.25,
                                    }}
                                    className="relative z-10 block text-base font-semibold text-neutral-950 transition-colors duration-500 group-hover:text-[#0da487] xl:text-base 2xl:text-lg "
                                >
                                    <motion.span
                                        variants={{
                                            initial: { x: 0 },
                                            whileHover: { x: 16 },
                                        }}
                                        transition={{ type: 'spring' }}
                                        className="inline-block"
                                    >
                                        {lang == 'Vi' ? productType.name : productType.nameEN}
                                    </motion.span>
                                </motion.span>
                            </div>

                            <motion.div
                                variants={{
                                    initial: {
                                        x: '25%',
                                        opacity: 0,
                                    },
                                    whileHover: {
                                        x: '0%',
                                        opacity: 1,
                                    },
                                }}
                                transition={{ type: 'spring' }}
                                className="relative z-10 px-1 py-1 sm:px-2 sm:py-2 xl:py-3 "
                            >
                                <FiArrowRight className="text-xl text-neutral-950 group-hover:text-[#0da487] sm:text-xl lg:text-2xl  2xl:text-4xl" />
                            </motion.div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
