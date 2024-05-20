import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useApi from "../utils/http";
import { Toast } from "primereact/toast";
import "./Navigation.css";

const Navigation = ({
  cartItems,
  cartModal,
  openOrder,
  menuVisible,
  setMenuVisible,
}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const [inVisible, setInVisible] = useState(true);
  const [outVisible, OutInVisible] = useState(false);

  const api = useApi(token);
  const navigate = useNavigate();
  const toastTopRight = useRef(null);

  useEffect(() => {
    if (!token) {
      setInVisible(true);
    } else {
      setInVisible(false);
      OutInVisible(true);
    }
    return () => {};
  }, []);

  function handleLogIn() {
    navigate("/log-in");
  }

  function logInHere(e) {
    e.preventDefault();
    if (!token) {
      navigate("/log-in");
    } else {
      navigate("/");
    }
  }

  async function handleLogOut() {
    try {
      await api.post("/logouthere");
      location.reload();
      localStorage.clear();
      setUser("");
      navigate("/");
    } catch (error) {}
  }

  const showMessage = (ref, danger) => {
    const label = "You need to Log-Out your Personal Account";

    ref.current.show({
      severity: danger,
      detail: label,
      life: 3000,
    });
  };

  function adminLog() {
    if (!token) {
      setMenuVisible(false);
      navigate("admin/log-in");
    } else {
      showMessage(toastTopRight, "error");
    }
  }

  function showHome(e) {
    e.preventDefault();
    setMenuVisible(true);
    navigate("/");
  }
  function showShop(e) {
    e.preventDefault();
    setMenuVisible(true);
    navigate("/shop");
  }
  function showAbout(e) {
    e.preventDefault();
    setMenuVisible(true);
    navigate("/about");
  }

  return (
    <>
      <Toast ref={toastTopRight} position="top-right" />
      <ConfirmDialog />

      <Navbar
        expand="lg"
        bg="light"
        data-bs-theme="light"
        fixed="top"
        className=""
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            <Row className="w-100 d-flex justify-content-between align-items-center m-0">
              <Col sm={4} className=" d-flex justify-content-center gap-5">
                <Link className="navLink" onClick={showHome}>
                  HOME
                </Link>

                <Link className="navLink" onClick={showShop}>
                  SHOP
                </Link>

                <Link className="navLink" onClick={showAbout}>
                  ABOUT
                </Link>
              </Col>
              <Col sm={3} className="d-flex justify-content-center">
                <img src={logo} height={50} />
              </Col>
              <Col
                sm={3}
                className="d-flex justify-content-between gap-3 align-items-center colBox  px-0"
              >
                {menuVisible && (
                  <div className="d-flex justify-content-end gap-4 align-items-center w-100">
                    <div className="d-flex align-items-center gap-2">
                      <p className="p-0 m-0 fs-5" id="user">
                        {user?.first_name}
                      </p>
                      <UserOutlined onClick={logInHere} />
                    </div>

                    <div className="cartNum" onClick={cartModal}>
                      <ShoppingCartOutlined className="cart" />
                      <p className="cartNum2">
                        {cartItems.length === 0 ? "" : cartItems.length}
                      </p>
                    </div>
                    {inVisible && (
                      <Button className="px-4 logInBtn" onClick={handleLogIn}>
                        LOG IN
                      </Button>
                    )}
                    {outVisible && (
                      <Button className="logOutBtn" onClick={handleLogOut} link>
                        Log Out
                      </Button>
                    )}
                  </div>
                )}

                <div className="adminContainer m-0 d-flex justify-content-center align-items-center">
                  <SelectOutlined className="adminIcon" />
                  <p className="admin m-0" onClick={adminLog}>
                    Admin Access
                  </p>
                </div>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
