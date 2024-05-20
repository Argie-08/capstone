import Carousel from "react-bootstrap/Carousel";
import Image1 from "../assets/hero1.jpg";
import Image2 from "../assets/hero2.jpg";
import Image3 from "../assets/hero3.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  function shop(e) {
    e.preventDefault();
    navigate("/shop");
  }
  return (
    <>
      <div className="carouselPosition">
        <Carousel>
          <Carousel.Item interval={2000} className="carouselBase">
            <img src={Image1} text="First slide" />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img src={Image2} text="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Image3} text="Third slide" />
          </Carousel.Item>
        </Carousel>
        <Container className="containerModal">
          <Row className="d-flex gap-4">
            <img alt="" />
            <Col md={12} className="carouselText">
              SUMMER HEAT! LET'S MAKE IT
              <span className="carouselText textRed"> "RED HOT"</span>
            </Col>
            <Col md={12} className="carouselHov">
              <button className="carouselBtn" onClick={shop}>
                SHOP NOW
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Hero;
