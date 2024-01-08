import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function HoverLinks({ home }) {
    const [productTypes, setProductTypes] = useState([]);
    var linkTo = '/';
    if (home) linkTo = '/products/';

    useEffect(() => {
        getProductTypes();
    }, []);

    function getProductTypes() {
        fetch('http://localhost:5000/api/product-type')
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
        <div className="flex flex-col items-center justify-start w-full">
            <Link to={'/products'} className="cursor-pointer group relative flex items-center justify-between w-full">
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    initial="initial"
                    whileHover="whileHover"
                    className="group relative flex items-center justify-between w-full px-1 lg:px-2 xl:px-3  border-b-2 border-neutral-700  transition-colors duration-500 hover:border-[#0da487] hover:text-[]"
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
                            className="relative z-10 block text-base xl:text-base 2xl:text-lg font-semibold text-neutral-950 transition-colors duration-500 group-hover:text-[#0da487] "
                        >
                            <motion.span
                                variants={{
                                    initial: { x: 0 },
                                    whileHover: { x: 16 },
                                }}
                                transition={{ type: 'spring' }}
                                className="inline-block"
                            >
                                Tất cả
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
                        className="relative z-10 py-1 sm:py-2 xl:py-3 px-1 sm:px-2 "
                    >
                        <FiArrowRight className="text-xl sm:text-xl lg:text-2xl 2xl:text-4xl text-neutral-950  group-hover:text-[#0da487]" />
                    </motion.div>
                </motion.div>
            </Link>
            {productTypes.map((productType, index) => {
                return (
                    <Link
                        key={index}
                        to={'/products/' + productType._id}
                        className="cursor-pointer group relative flex items-center justify-between w-full"
                    >
                        <motion.div
                            ref={ref}
                            onMouseMove={handleMouseMove}
                            initial="initial"
                            whileHover="whileHover"
                            className="group relative flex items-center justify-between w-full px-1 lg:px-2 xl:px-3  border-b-2 border-neutral-700  transition-colors duration-500 hover:border-[#0da487] hover:text-[]"
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
                                    className="relative z-10 block text-base xl:text-base 2xl:text-lg font-semibold text-neutral-950 transition-colors duration-500 group-hover:text-[#0da487] "
                                >
                                    <motion.span
                                        variants={{
                                            initial: { x: 0 },
                                            whileHover: { x: 16 },
                                        }}
                                        transition={{ type: 'spring' }}
                                        className="inline-block"
                                    >
                                        {productType.name}
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
                                className="relative z-10 py-1 sm:py-2 xl:py-3 px-1 sm:px-2 "
                            >
                                <FiArrowRight className="text-xl sm:text-xl lg:text-2xl 2xl:text-4xl text-neutral-950  group-hover:text-[#0da487]" />
                            </motion.div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
