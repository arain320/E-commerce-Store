import React from "react";
import "./Slider.scss";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/autoplay";

const Slider = () => {
  return (
    <>
      <div className="slider">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          grabCursor={true}
          autoplay={true}
          loop={true}
          speed={300}
          navigation
        >
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/ty4tochm2etpnig/slider1.jpg?raw=1"
                alt="slider1"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/eysytbe3zrw6me8/slider7.jpg?raw=1"
                alt="slider7"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/3iqibnwhqi2ky4z/slider3.png?raw=1"
                alt="slider3"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/7i0z3x001wh0qyg/slider4.jpg?raw=1"
                alt="slider4"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/wtqtvma9m9kmr30/slider5.jpg?raw=1"
                alt="slider5"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/e35h09s7thyqnk5/slider6.jpg?raw=1"
                alt="slider6"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/cq5uhwqszxbgncq/slider8.jpg?raw=1"
                alt="slider8"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/ipw57hqgqcbt68r/slider9.png?raw=1"
                alt="slider9"
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/Products">
              <img
                src="https://www.dropbox.com/s/6g6k4wjgn7nq768/slider10.jpg?raw=1"
                alt="slider10"
              />
            </NavLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
