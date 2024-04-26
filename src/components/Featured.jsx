import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Modal } from "antd";
import useApi from "../utils/http";
import "./Featured.css";

const images = import.meta.env.VITE_IMAGES;

const Featured = ({ handleAddCartHome, setOpen, open }) => {
  const [products, setProducts] = useState([]);
  const [producted, setProducted] = useState([]);
  const api = useApi();
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getFile() {
      const { data } = await api.get("/products");
      const latest = data.reverse();

      setProducts(latest);
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

  function getFile(data) {
    setProducted(data);
  }

  function carouSubmit(e) {
    e.preventDefault();
    setOpen(true);
  }

  const productTemplate = (product) => {
    return (
      <form
        className="carouselHeight"
        onSubmit={carouSubmit}
        onClick={() => getFile(product)}
      >
        <div className="border-1  m-2 text-center py-4 px-3 carouselHeight2">
          <div className="mb-3">
            <img src={`${images}/${product.image}`} className="imgHeight" />
          </div>
          <div className="topLine">
            <h4 className="productAText">{product.name}</h4>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center checkText">
            <Button label="CHECK IT OUT" className="storeBtn px-4 py-2" />
          </div>
        </div>
      </form>
    );
  };

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
      {producted ? (
        <Modal centered open={open} width={1000}>
          <Row className="h-100">
            <Col md={6}>
              <img
                src={`${images}/${producted.image}`}
                alt=""
                className="modalImagezz"
              />
            </Col>
            <Col md={6} className="pt-4 modalBox">
              <h4 className="mTitle mb-3">{producted.name}</h4>
              <p className="mTitle2">Php {producted.price}</p>
              <p className="">{producted.details}</p>
              <div className="modalBtn p-3">
                <Button
                  label="CONTINUE SHOPPING"
                  className="continueBtn"
                  onClick={() => setOpen(false)}
                  link
                ></Button>
                <Button
                  label="ADD TO CART & CHECK OUT"
                  className="storeBtnz px-4 py-2"
                  onClick={() => handleAddCartHome(producted)}
                ></Button>
              </div>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </>
  );
};

export default Featured;
