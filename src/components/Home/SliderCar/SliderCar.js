import Slider from 'react-slick'
import img2 from '../../../SliderImg/2.jpg'
import img1 from '../../../SliderImg/1.jpg'
import img3 from '../../../SliderImg/3.jpg'
import img4 from '../../../SliderImg/4.jpg'
import classes from './SliderCar.module.css'

const SliderCar = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
      
    return (
        <div className={classes.parentSlider}>
          <Slider {...settings}>
                <img src={img1}></img>
                <img src={img2}></img>
                <img src={img3}></img>
                <img src={img4}></img>
          </Slider>
        </div>
      );
}

export default SliderCar