import React from 'react';
import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
    <div className='flex relative col-span-2 flex-col justify-center items-start px-14 h-full w-full'>
        <img src='/4.jpg' alt='Banner1' className='absolute -z-0 left-0 top-0 w-full h-full' />
        <div className='z-10 flex flex-col gap-3 w-[60%]'>
            <div className='z-10 flex gap-3 text-sm '>
                <h6 className='text-[#4a5568]'>Exclusive offer</h6>
                <span className=' cursor-hover rounded-full px-2 text-[#ff4f4f] font-medium bg-gradient-to-r from-[rgba(255,114,114,0.15)] via-transparent to-transparent '>
                    30% Off
                </span>
            </div>
            <div>
                <h1 className='uppercase text-[#4a5568] text-[42px] font-semibold cursor-hover'>
                    Stay home &amp; delivered your <span className='cursor-hover text-[#0da487] font-extrabold'>Daily Needs</span>
                </h1>
            </div>
            <div>
                <p className='w-[75%]'>Vegetables contain many vitamins and minerals that are good for your health.</p>
            </div>
            <div>
                <button className='text-red hover:before:bg-redborder-red-500 relative overflow-hidden bord er border-red-500 rounded-md bg-white px-6 py-4 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full'>
                    <span className='relative z-10 flex gap-4 '>
                        Shop Now
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
    <img src='https://picsum.photos/id/237/200/300' onDragStart={handleDragStart} role='presentation' />,
];

function MyCarousel() {
    return (
        <AliceCarousel
            items={items}
            autoPlay
            autoPlayInterval={1500}
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 3 },
            }}
            mouseTracking
        />
    );
}
export default MyCarousel;
