import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { StarOutlined } from "@ant-design/icons";
import "./Review.css";
import useApi from "../utils/http";

const Reviews = () => {
  const [review, setReview] = useState("");
  const api = useApi();

  useEffect(() => {
    async function getFile() {
      const { data } = await api.get("/testimonial");
      const latest = data.reverse();

      setReview(latest);
    }
    getFile();
    return () => {};
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 2,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className="border-1  m-2 text-center py-4 px-3 carouselHght">
        <Container>
          <Row className="d-flex flex-column">
            <Col className="reviewBorderTop"></Col>
          </Row>
          <Row>
            <Col className="text-white mb-5 mt-2 limitText">
              " {product.content} "
            </Col>
            <span className="starPos">
              <StarOutlined className="modalStar mb-3" />
              <StarOutlined className="modalStar" />
              <StarOutlined className="modalStar" />
              <StarOutlined className="modalStar" />
              <StarOutlined className="modalStar" />
            </span>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <>
      <Container className="mb-5 lineBtn pb-5">
        <Row>
          <Col className="d-flex justify-content-center review mt-5">
            OUR CLIENT REVIEW
          </Col>
        </Row>
        <Container className="mb-5 mt-5">
          <div className="testz">
            <Carousel
              value={review}
              numVisible={5}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              className="blue"
              circular
              itemTemplate={productTemplate}
            />
          </div>
        </Container>
        <Container>
          <Row>
            <Col className="d-flex flex-column justify-content-center review align-items-center">
              <p className="reviewSub">
                MORE REVIEWS FROM PEOPLE JUST LIKE YOU
              </p>
              <p className="reviewSwipe">
                SWIPE LEFT TO DISCOVER ABOUT OUR PRODUCTS
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Reviews;
