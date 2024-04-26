import Carousel from "react-bootstrap/Carousel";
import Image1 from "../assets/hero1.jpg";
import Image2 from "../assets/hero2.jpg";
import Image3 from "../assets/hero3.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="carouselPosition">
        <Carousel>
          <Carousel.Item interval={2000} className="carouselBase">
            <img src={Image1} text="First slide" />
            {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img src={Image2} text="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Image3} text="Third slide" />
          </Carousel.Item>
        </Carousel>
        <h3 className="carouselText">Leveling up, one step at a time</h3>
      </div>
    </>
  );
};

export default Hero;
