import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import CardSection from './CardSection';

import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
    <CardSection />,
    <CardSection />,
    <CardSection />,
    <CardSection />,
    <CardSection />,
    <CardSection />,
    <CardSection />,
    <CardSection />,
];

function MyCarousel() {
    return (
        <AliceCarousel
            items={items}
            // autoPlay
            autoPlayInterval={2000}
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
