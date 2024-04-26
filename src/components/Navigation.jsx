import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useApi from "../utils/http";
import { Popover } from "antd";
import "./Navigation.css";
import routes from "../routes";

const Navigation = ({ cartItems, cartModal, openOrder }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const api = useApi(token);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // const [file, setFile] = useState([]);

  async function handleLogOut() {
    try {
      await api.post("/logouthere");
      localStorage.clear();
      navigate("/");
    } catch (error) {}
  }

  function logInHere(e) {
    e.preventDefault();
    if (!token) {
      navigate("/log-in");
    } else {
      navigate("/");
    }
  }

  // const changeColor = () => {
  //   if (window.scrollY >= 500) {
  //     setColor(true);
  //   } else {
  //     setColor(false);
  //   }
  // };

  // window.addEventListener("scroll", changeColor);

  // setFile(`${user?.username}`);

  return (
    <>
      <ConfirmDialog />

      {/* <div className={color ? "navbar navbar-bg" : "navbar"}> */}
      <Navbar expand="lg" bg="light" data-bs-theme="light" fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Row className="w-100 d-flex align-items-center">
              <Col sm={4} className="">
                <Nav className="me-auto">
                  <ul>
                    <Link className="navLink" to="/">
                      HOME
                    </Link>
                  </ul>
                  <ul>
                    <Link className="navLink" to="/shop">
                      SHOP
                    </Link>
                  </ul>
                  {/* <ul>
                    <Link className="navLink" to="/explore">
                      EXPLORE
                    </Link>
                  </ul> */}
                </Nav>
              </Col>
              <Col sm={4} className="d-flex justify-content-center">
                <img src={logo} height={50} />
              </Col>
              <Col
                sm={4}
                className="d-flex justify-content-end gap-4 align-items-center"
              >
                <div className="d-flex align-items-center gap-2">
                  <p className="p-0 m-0 fs-5 ">
                    Hello! <b className="fs-5">{`${user?.username}`}</b>
                  </p>
                  <UserOutlined onClick={logInHere} />
                </div>

                <div className="cartNum">
                  <ShoppingCartOutlined onClick={cartModal} />
                  <span className="cartNum2">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </span>
                </div>
                <span
                  className="pi pi-truck"
                  style={{ fontSize: "2rem" }}
                  onClick={openOrder}
                />

                <Button className="px-4 logOutBtn" onClick={handleLogOut}>
                  Log Out
                </Button>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* </div> */}
    </>
  );
};

export default Navigation;
