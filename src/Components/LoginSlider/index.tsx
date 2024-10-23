import React, { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { Logo, SliderOne, SliderThree, SliderTwo } from '../../utils/images';
import "./index.css";

const LoginSlider: React.FunctionComponent = () => {
    const sliderRef = useRef<Slider>(null);

    const settings: Settings = {
        className: "slider center",
        centerMode: true,
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        centerPadding: "60px",
        speed: 500,
        variableWidth: true,
        slidesToShow: 1,
        beforeChange: (oldIndex: number, newIndex: number) => console.log('beforeChange', oldIndex, newIndex),
        afterChange: (newIndex: number) => console.log('afterChange', newIndex)
    };

    return (
        <div className="remarkable-component d-flex flex-column justify-content-between pb-5">
            <div>
                <div className="image-logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="content-logo">
                    <h1>Start your remarkable journey with us!</h1>
                    <p>
                        Our cold email automation helps you send personalized cold emails at scale with high email deliverability.
                    </p>
                </div>
            </div>
            <div className='login-slider-padding'>
                <Slider
                    {...settings}
                    ref={sliderRef}
                >
                    <div className="clip">
                        <img src={SliderOne} alt="Placeholder 1" />
                    </div>
                    <div className="clip">
                        <img src={SliderTwo} alt="Placeholder 2" />
                    </div>
                    <div className="clip">
                        <img src={SliderThree} alt="Placeholder 3" />
                    </div>
                </Slider>
            </div>

        </div>
    );
};

export default LoginSlider;
