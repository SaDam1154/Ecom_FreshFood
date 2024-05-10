import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const SLIDES_PER_VIEW_THUMSNAIL = 4;
export default function ProductImageSlide({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const mainSwiperRef = useRef(null);
    const [mainSlideState, setMainSlideState] = useState({
        isBeginning: true,
        isEnd: false,
    });
    const thumbnailSwiperRef = useRef(null);
    const [thumbnailSlideState, setThumbnailSlideState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    useEffect(() => {
        mainSwiperRef.current.swiper.slideTo(currentSlide);

        let offsetActive = Math.floor((SLIDES_PER_VIEW_THUMSNAIL - 1) / 2);
        let slideToGo = currentSlide - offsetActive;
        if (slideToGo < 0) {
            slideToGo = 0;
        }
        thumbnailSwiperRef.current.swiper.slideTo(slideToGo);
    }, [currentSlide]);

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    return (
        <div className="w-full">
            {/* MAIN SLIDE */}
            <div className="group relative overflow-hidden rounded-lg">
                <Swiper
                    ref={mainSwiperRef}
                    onAfterInit={({ isBeginning, isEnd }) => {
                        setMainSlideState({ isBeginning, isEnd });
                    }}
                    onSlideChange={(swiper) => {
                        setMainSlideState({
                            isBeginning: swiper.isBeginning,
                            isEnd: swiper.isEnd,
                        });
                        setCurrentSlide(swiper.activeIndex);
                    }}
                >
                    {images &&
                        images.map((image) => (
                            <SwiperSlide key={image}>
                                <div className="aspect-[4/3]">
                                    <img src={image} className="h-full w-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            {/* THUMBNAIL SLIDE */}
            <div className="group relative -mx-2 mt-1">
                <Swiper
                    ref={thumbnailSwiperRef}
                    slidesPerView={SLIDES_PER_VIEW_THUMSNAIL}
                    onAfterInit={({ isBeginning, isEnd }) => {
                        setThumbnailSlideState({ isBeginning, isEnd });
                    }}
                    onSlideChange={({ isBeginning, isEnd }) => {
                        setThumbnailSlideState({ isBeginning, isEnd });
                    }}
                >
                    {images &&
                        images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="aspect-square overflow-hidden p-2"
                                    onClick={() => setCurrentSlide(index)}
                                >
                                    <img
                                        src={image}
                                        className={clsx(
                                            'h-full w-full cursor-pointer rounded object-cover',
                                            {
                                                'ring-2 ring-primary-700': index === currentSlide,
                                                'opacity-70': index !== currentSlide,
                                            },
                                        )}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}
