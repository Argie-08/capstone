import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import Routee from "./routes";
import Explore from "./view/Explore";
import Home from "./view/Home";
import Shop from "./view/Shop";
import Register from "./view/Register";
import LogIn from "./view/LogIn";
import CheckOut from "./view/CheckOut";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import { Toast } from "primereact/toast";

const images = import.meta.env.VITE_IMAGES;

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const toast = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [secondData, setSecondData] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [orderRight, setOrderRight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navIcon();
    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const [data, setData] = useState("");

  function navIcon() {
    setData(`${user?.username}`);
  }

  function handleAddCart(data) {
    if (!token) {
      navigate("/log-in");
      toast.current.show({
        severity: "error",
        detail: "You needs to log-in",
      });
    } else {
      setVisible(true);
      setSecondData(data);
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
      navigate("/log-in");
      toast.current.show({
        severity: "error",
        detail: "You needs to log-in",
      });
    } else {
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
      navigate("/log-in");
      toast.current.show({
        severity: "error",
        detail: "You needs to log-in",
      });
    } else {
      setVisibleRight(true);
    }
  }

  function openOrder() {
    if (!token) {
      navigate("/log-in");
      toast.current.show({
        severity: "error",
        detail: "You needs to log-in",
      });
    } else {
      setOrderRight(true);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Navigation
        user={user}
        cartItems={cartItems}
        cartModal={cartModal}
        openOrder={openOrder}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleAddCartHome={handleAddCartHome}
              setOpen={setOpen}
              open={open}
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
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              setVisible={setVisible}
              visible={visible}
              secondData={secondData}
              setSecondData={secondData}
              setVisibleRight={setVisibleRight}
            />
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/register" element={<Register />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route
          path="/checkout"
          element={
            <CheckOut
              cartItems={cartItems}
              user={user}
              totalPrice={totalPrice}
            />
          }
        />
      </Routes>
      <Footer />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <Row>
          <p className="freeShip">STANDARD FREE SHIPPING</p>
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
              <div className="d-flex justify-content-end my-3">
                <div className="total">GRAND TOTAL: {totalPrice}</div>
              </div>
              <Button
                className="storeBtn w-100"
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

        <Row>
          <Col xs={12}></Col>

          <Col xs={12}></Col>
        </Row>
      </Sidebar>

      {/* <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes> */}
    </>
  );
};

export default App;
