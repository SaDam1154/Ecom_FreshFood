import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function HoverLinks() {
    return (
        <div className='flex flex-col items-center justify-start w-full'>
            <Link heading='Vegetables & Fruit' href='#' />
            <Link heading='Meats & Seafood' href='#' />
            <Link heading='Breakfast & Dairy' href='#' />
            <Link heading='Frozen Foods' href='#' />
            <Link heading='Biscuits & Snacks' href='#' />
            <Link heading='Grocery & Staples' href='#' />
            <Link heading='Wines & Alcohol Drinks' href='#' />
            <Link heading='Milk & Dairies' href='#' />
            <Link heading='Pet Foods' href='#' />
            <Link heading='Beverages' href='#' />
            <Link heading='Beverages' href='#' />
            <Link heading='Beverages' href='#' />
            <Link heading='Beverages' href='#' />
        </div>
    );
}

const Link = ({ heading, imgSrc, subheading, href }) => {
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
        <motion.a
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            initial='initial'
            whileHover='whileHover'
            className='group relative flex items-center justify-between w-full px-1 lg:px-2 xl:px-3 2xl:px-3  border-b-2 border-neutral-700  transition-colors duration-500 hover:border-[#0da487] hover:text-[]'
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
                    className='relative z-10 block text-base xl:text-base 2xl:text-lg font-semibold text-neutral-950 transition-colors duration-500 group-hover:text-[#0da487] '
                >
                    {heading.split('').map((l, i) => (
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 16 },
                            }}
                            transition={{ type: 'spring' }}
                            className='inline-block'
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
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
                className='relative z-10 p-1 sm:p-2 xl:p-3'
            >
                <FiArrowRight className='text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl text-neutral-950  group-hover:text-[#0da487]' />
            </motion.div>
        </motion.a>
    );
};
