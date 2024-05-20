import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import Modal from "react-bootstrap/Modal";
import useApi from "../utils/http";
import "./Featured.css";

const images = import.meta.env.VITE_IMAGES;

const Featured = ({ handleAddCartHome, setOpen, open, setShow, show }) => {
  const [products, setProducts] = useState([]);
  const [productTest, setProductTest] = useState([]);
  const [producted, setProducted] = useState(0);
  const api = useApi();

  useEffect(() => {
    async function getFile() {
      const { data } = await api.get("/products");
      const latest = data.reverse();
      const second = latest.slice(0, 6);

      setProducts(second);
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
      numVisible: 1,
      numScroll: 1,
    },
  ];

  function carouSubmit(e) {
    e.preventDefault();
  }
  function handleClose() {
    setShow(false);
  }

  const productTemplate = (product) => {
    return (
      <form className="carouselHeight" onSubmit={carouSubmit}>
        <div className="border-1  m-2 text-center py-4 px-3 carouselHeight2">
          <div className="mb-3">
            <img src={`${images}/${product.image}`} className="imgHeight" />
          </div>
          <div className="topLine">
            <h4 className="productAText">{product.name}</h4>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center checkText">
            <Button
              label="CHECK IT OUT"
              className="storeBtn px-4 py-2"
              onClick={() => modalStart(product)}
            />
          </div>
        </div>
      </form>
    );
  };

  function modalStart(data) {
    setProducted(data);
    setShow(true);
    setProductTest(data.price);
  }

  const featuredPrice = productTest.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex justify-content-center flex-column align-items-center mt-5">
            <p className="hTitle1">Featured Products</p>
            <p className="hTitle2">See What's Trending Right Now</p>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5 mt-5">
        <div className="card card1">
          <Carousel
            value={products}
            numVisible={4}
            numScroll={3}
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            itemTemplate={productTemplate}
          />
        </div>
      </Container>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="modalProduct px-5">
          <Modal.Title>PRODUCT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Row className="d-flex gap-4 justify-content-center">
            <Col md={5}>
              <img
                src={`${images}/${producted.image}`}
                alt=""
                className="modalImagezz"
              />
            </Col>
            <Col md={6}>
              <h4 className="mTitle mb-3">{producted.name}</h4>
              <p className="mTitle2" id="phpCurrency">
                {featuredPrice}
              </p>
              <p className="">{producted.details}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="modalBtn">
            <Button
              label="CONTINUE SHOPPING"
              className="continueBtn"
              onClick={() => setShow(false)}
              link
            ></Button>
            <Button
              label="ADD TO CART & CHECK OUT"
              className="storeBtnz px-4 py-2"
              onClick={() => handleAddCartHome(producted)}
            ></Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Featured;
