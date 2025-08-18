import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MySwiper.css';

export default function MySwiper({images = []}) {
  if (!images.length) return null;

  return (
    <div className="my-swiper aspect-[4/3] w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{clickable: true}}
        loop="true"
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
