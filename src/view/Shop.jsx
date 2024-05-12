import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import Pic from "../assets/storePic.jpg";
import "./Shop.css";

const images = import.meta.env.VITE_IMAGES;

const shop = ({
  handleAddCart,
  visible,
  setVisible,
  secondData,
  setVisibleRight,
}) => {
  const navigate = useNavigate();
  const api = useApi();
  // const [visibleRight, setVisibleRight] = useState(false);
  const [firstData, setFirstData] = useState([]);
  const [filterButton, setFilterButton] = useState([]);
  const [filterGaming, setFilterGaming] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [search, setSearch] = useState("");
  // const [ramdom, setRandom] = useState("");

  useEffect(() => {
    getProduct();
    getFilter();

    return () => {};
  }, []);

  useEffect(() => {
    getFilter();
    return () => {};
  }, [firstData]);

  async function getProduct() {
    const { data } = await api.get("/products");
    setFirstData(data);
    setFilterGaming(data);
    setProducts(data);
    setSearchItem(data);
  }

  async function getFilter() {
    const uniqueCategories = Array.from(
      new Set(firstData.map((item) => item.usage))
    );
    setFilterButton(uniqueCategories);
  }

  const getItem = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
      setFilterGaming(products); // Show all products
    } else {
      setFilterGaming(
        products.filter((data) => data.usage === selectedCategory)
      ); // Filter products by category
    }
  };

  function addtoCart() {
    setVisibleRight(true);
    setVisible(false);
  }

  function searchOutput(e) {
    e.preventDefault();
    const filter = searchItem.filter((value) => {
      if (search === "") {
        return value;
      } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
        return value;
      }
    });
    setFilterGaming(filter);
  }

  return (
    <>
      <Row className="navBarz"></Row>
      <Row className="storeHeroPos">
        <div className="box12">
          <img src={Pic} className="storeHero" />
          <p className="textOver">
            "I do not fear computers. I fear lack of them"
          </p>
        </div>

        <Col className="storeHeroOver">
          <Row>
            <Col md={12} className="d-flex py-3 w-100">
              <Col xs={4}>
                <button
                  value="all"
                  onClick={getItem}
                  className="filterBtn py-1 "
                >
                  All
                </button>
              </Col>
              <Col xs={4}>
                <button
                  value="gaming"
                  onClick={getItem}
                  className="filterBtn2 py-1 "
                >
                  Gaming
                </button>
              </Col>
              <Col xs={4}>
                <button
                  value="office"
                  onClick={getItem}
                  className="filterBtn2 py-1"
                >
                  Office
                </button>
              </Col>
            </Col>
            <form onSubmit={searchOutput}>
              <Row>
                <Col className="d-flex gap-2">
                  <InputText
                    v-model="value1"
                    placeholder=" What are you looking for?"
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchBox ps-3"
                  />
                  <button className="filterBtn3">
                    <span
                      className="pi pi-search"
                      style={{ fontSize: "1.5rem" }}
                    ></span>
                  </button>
                </Col>
              </Row>
            </form>
          </Row>
          <Row></Row>
        </Col>
      </Row>
      <Container className="my-5 ">
        <Row>
          {filterGaming.map((product, i) => {
            return (
              <Col md={4} className="mb-4" key={i}>
                <Card className="shopImage">
                  <Card.Img
                    variant="top"
                    src={`${images}/${product.image}`}
                    className="storeImg"
                  />
                  <Card.Body>
                    <Card.Title className="storeProd">
                      {product.name}
                    </Card.Title>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <Card.Text className="storeProd2">
                        Php {product.price}
                      </Card.Text>
                      <Button
                        className="storeBtn"
                        onClick={() => handleAddCart(product)}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        className="dialogPad"
      >
        <Row>
          <Col className="topModal">
            <p className="shopMod">YOU HAD GREAT TASTE</p>
          </Col>
        </Row>
        <Row>
          {secondData ? (
            <div className="d-flex my-4">
              <Col sm={6} xs={12} className="modalBgT">
                <img
                  src={`${images}/${secondData.image}`}
                  alt=""
                  className="modalImage"
                />
              </Col>
              <Col sm={6} xs={12} className="px-3 lineThis">
                <p className="modalT2">{secondData.details}</p>

                <div className="d-flex justify-content-between">
                  <p>Price</p>
                  <p className="modlT3">Php {secondData.price}</p>
                </div>

                <Button className="w-100 storeBtn mb-3" onClick={addtoCart}>
                  VIEW CART & CHECK OUT
                </Button>

                <Button
                  className="w-100 storeBtn2"
                  onClick={() => setVisible(false)}
                >
                  CONTINUE SHOPPING
                </Button>
              </Col>
            </div>
          ) : null}
        </Row>

        {/* <h3 className="mb-2">You Might Also Like</h3>
        <Row className="mb-3">
          <Col md={3}>
            <Card>
              <Card.Img
                variant="top"
                src="holder.js/100px180"
                className="storeImg2"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example</Card.Text>
                <div className="d-flex justify-content-end align-items-end"></div>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Dialog>
    </>
  );
};

export default shop;
