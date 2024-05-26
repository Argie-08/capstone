import useApi from "./utils/http";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navigation from "./components/Navigation";
import { Sidebar } from "primereact/sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Home from "./view/Home";
import Shop from "./view/Shop";
import Register from "./view/Register";
import LogIn from "./view/LogIn";
import CheckOut from "./view/CheckOut";
import AdminLog from "./view/AdminLog";
import Admin from "./view/Admin";
import About from "./view/About";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import { Toast } from "primereact/toast";
import { TruckOutlined } from "@ant-design/icons";
import { message } from "antd";

const images = import.meta.env.VITE_IMAGES;

const App = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [messageApi, contextHolder] = message.useMessage();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username"))
  );

  const toast = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [secondData, setSecondData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [orderRight, setOrderRight] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    navIcon();
    return () => {};
  }, []);

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

  const [data, setData] = useState("");

  function navIcon() {
    setData(`${user?.username}`);
  }

  function handleAddCart(data) {
    if (!token) {
      messageApi.open({
        type: "error",
        content: "You needs to Log-In",
      });
      setTimeout(() => {
        navigate("/log-in");
      }, 2000);
    } else {
      setVisible(true);
      setSecondData(data);
      setPriceData(data.price);

      const productExist = cartItems.find((item) => item.id === data.id);
      if (productExist) {
        setCartItems(
          cartItems.map((item) =>
            item.id === data.id
              ? { ...productExist, quantity: productExist.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...data, quantity: 1 }]);
      }
    }
  }

  function handleDecrease(data) {
    const productExist = cartItems.find((item) => item.id === data.id);
    if (productExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== data.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === data.id
            ? { ...productExist, quantity: productExist.quantity - 1 }
            : item
        )
      );
    }
  }
  function handleIncrease(data) {
    const productExist = cartItems.find((item) => item.id === data.id);
    if (productExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === data.id
            ? { ...productExist, quantity: productExist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...data, quantity: 1 }]);
    }
  }

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  function checkOut(data) {
    navigate("/checkout");
    setVisibleRight(false);
  }

  function handleAddCartHome(data) {
    if (!token) {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "You needs to Log-In",
      });
      setTimeout(() => {
        navigate("/log-in");
      }, 2000);
    } else {
      setShow(false);
      setVisibleRight(true);
      setOpen(false);
      const productExist = cartItems.find((item) => item.id === data.id);
      if (productExist) {
        setCartItems(
          cartItems.map((item) =>
            item.id === data.id
              ? { ...productExist, quantity: productExist.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...data, quantity: 1 }]);
      }
    }
  }

  function cartModal() {
    if (!token) {
      messageApi.open({
        type: "error",
        content: "You needs to Log-In",
      });
      setTimeout(() => {
        navigate("/log-in");
      }, 2000);
    } else {
      setVisibleRight(true);
    }
  }

  function openOrder() {
    if (!token) {
      messageApi.open({
        type: "error",
        content: "You needs to Log-In",
      });
      setTimeout(() => {
        navigate("/log-in");
      }, 2000);
    } else {
      setOrderRight(true);
    }
  }

  function placeOrder(e) {
    setOrderRight(true);
  }

  const totalPrices = totalPrice.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      <Toast ref={toast} />
      {contextHolder}
      <Navigation
        cartItems={cartItems}
        cartModal={cartModal}
        openOrder={openOrder}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleAddCartHome={handleAddCartHome}
              setOpen={setOpen}
              open={open}
              setShow={setShow}
              show={show}
              products={products}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              user={user}
              cartItems={cartItems}
              handleAddCart={handleAddCart}
              handleIncrease={handleIncrease}
              setVisible={setVisible}
              visible={visible}
              secondData={secondData}
              setSecondData={secondData}
              setVisibleRight={setVisibleRight}
              priceData={priceData}
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route
          path="/admin"
          element={<Admin setMenuVisible={setMenuVisible} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/checkout"
          element={
            <CheckOut
              cartItems={cartItems}
              user={user}
              totalPrice={totalPrice}
              placeOrder={placeOrder}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/admin/log-in" element={<AdminLog />} />
      </Routes>
      <Footer />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        className="sideBarBg"
      >
        <Row>
          <Col className="d-flex gap-3 sideBarUnderLine">
            <p className="freeShip m-0">STANDARD FREE SHIPPING</p>
            <TruckOutlined />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div>
              {cartItems.map((item, i) => {
                return (
                  <div key={i}>
                    <div className="d-flex m-0 p-0 align-items-center">
                      <img
                        src={`${images}/${item.image}`}
                        className="cartImage"
                      ></img>
                      <p>{item.name}</p>
                    </div>
                    <div className="mb-4 d-flex  justify-content-end gap-5 align-items-center">
                      <div className="">
                        <button
                          className="addminusBtn me-1"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                        <button
                          className="addminusBtn"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                      </div>

                      <div>
                        Quantity: <b>{item.quantity}</b>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex justify-content-end my-3 mb-5 totalTopLine">
                <div className="total pt-3">GRAND TOTAL: {totalPrices}</div>
              </div>
              <Button
                className="storeBtnOut w-100 py-2"
                onClick={() => checkOut(cartItems)}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </Col>
        </Row>
      </Sidebar>
      <Sidebar
        visible={orderRight}
        position="right"
        onHide={() => setOrderRight(false)}
      >
        <Row>
          <p>ORDER</p>
          <h1>IN PROGRESS(still coding)</h1>
        </Row>
      </Sidebar>
    </>
  );
};

export default App;
