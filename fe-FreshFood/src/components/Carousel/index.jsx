import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import CardSection from './CardSection';

import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
    <CardSection img={'/4.jpg'} discount={'5% OFF'} title={'Hot Deals on New Items'} content={'Daily Essentials Eggs & Dairy'} />,
    <CardSection img={'/5.jpg'} discount={'5% OFF'} title={'Hot Deals on New Items'} content={'Daily Essentials Eggs & Dairy'} />,
    <CardSection img={'/6.jpg'} discount={'5% OFF'} title={'Hot Deals on New Items'} content={'Daily Essentials Eggs & Dairy'} />,
    <CardSection img={'/7.jpg'} discount={'5% OFF'} title={'Hot Deals on New Items'} content={'Daily Essentials Eggs & Dairy'} />,
];

function MyCarousel() {
    return (
        <AliceCarousel
            items={items}
            autoPlay
            autoPlayInterval={2000}
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 3 },
            }}
            stagePadding={{ paddingRight: 20, paddingLeft: 20 }}
            mouseTracking
        />
    );
}
export default MyCarousel;
