import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Input } from "antd";
import "./CheckOut.css";
import { useState, useEffect } from "react";
import useApi from "../utils/http";
import image1 from "../assets/paypal.png";
import image2 from "../assets/paymaya.png";
import image3 from "../assets/gcash.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// import { Context } from "./App";

const images = import.meta.env.VITE_IMAGES;

const CheckOut = ({ cartItems, user, totalPrice, placeOrder }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [file, setFile] = useState([]);
  const [users, setUsers] = useState();
  const [review, setReview] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [id, setIdone] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  // const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const api = useApi(token);

  const totalAmount = totalPrice.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    setData();
    setPerson();
    setId();
    return () => {};
  }, []);

  useEffect(() => {
    async function getUser() {
      const { data } = await api.get(`/users/${id}`);
      setLoggedUser(data);
    }
    getUser();
    return () => {};
  }, []);

  function setId() {
    const userer = user;
    setIdone(userer.id);
  }

  async function setData() {
    const data = cartItems;
    setFile(data);
  }

  async function setPerson() {
    const person = user;
    setUsers(person);
  }

  async function handleReview(e) {
    e.preventDefault();

    try {
      const body = {
        content: review,
      };

      const response = await api.post("/testimonial", body);
      setReview("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const body = {
        first_name: firstname,
        last_name: lastname,
        address: address,
        landmark: landmark,
        contact_number: contact,
        email: email,
      };

      const { data } = await api.put(`/users/${id}`, body);
      getUser();
    } catch (error) {}
  }

  const productName = useRef("");
  const value1 = productName.current.value;

  const productPrice = useRef("");
  const value2 = productPrice.current.innerText;

  const productQuantity = useRef("");
  const value3 = productQuantity.current.innerText;

  const productTotal = useRef("");
  const value4 = productTotal.current.innerText;

  async function placeOrder(data) {
    // const orders = { orders: data };
    // const createOrder = await api.post("/order", body);
    // navigate("/");
  }

  // console.log(value1);
  // console.log(value2);
  // console.log(value3);
  // console.log(value4);

  return (
    <>
      <Row className="navBarz"></Row>
      <Container>
        <Row>
          <Col md={6}>
            <div className="">
              <p className="fw-bold fs-5 m-0">Online Transaction:</p>
              <div className="imagePay d-flex align-items-center">
                <img src={image1} />
                <img src={image2} />
                <img src={image3} />
              </div>
              <p className="fs-5 mb-5">
                OR CONTINUE BELOW TO <b className="fs-5">CASH ON DELIVERY</b>
              </p>
            </div>

            <h3>Shipping Address:</h3>
            <form onSubmit={handleUpdate}>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Complete Address</label>

                    <InputText
                      defaultValue={loggedUser.address}
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      // placeholder={`${loggedUser?.address}`}
                      onChange={(e) => setAddress(e.target.defaultValue)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">
                      Apartment, suite, barangay, etc (Optional)
                    </label>
                    <InputText
                      defaultValue={loggedUser.landmark}
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder="Optional"
                      onChange={(e) => setLandmark(e.target.defaultValue)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">First Name</label>
                    <InputText
                      defaultValue={loggedUser.first_name}
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${loggedUser?.first_name}`}
                      onChange={(e) => setFirstname(e.target.defaultValue)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Last Name</label>
                    <InputText
                      defaultValue={loggedUser.last_name}
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${loggedUser?.last_name}`}
                      onChange={(e) => setLastname(e.target.defaultValue)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Email</label>
                    <InputText
                      defaultValue={loggedUser.email}
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${loggedUser?.email}`}
                      onChange={(e) => setEmail(e.target.defaultValue)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Contact Number</label>
                    <InputText
                      defaultValue={loggedUser.contact_number}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${loggedUser?.contact_number}`}
                      onChange={(e) => setContact(e.target.defaultValue)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="mb-5 d-flex justify-content-end">
                <Button className="pi pi-pencil p-2 me-2 btnEdit" />
                <Button className="pi pi-check p-2 btnEdit" />
              </div>
            </form>

            <h4>Let's us know your Experience Here:</h4>
            <form className="btnPos" onSubmit={handleReview}>
              <InputTextarea
                value={review}
                className="commentBox p-3"
                placeholder="Your honest review will lift us."
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="reviewbtn">
                <button className="storeBtn20 px-5 py-1">SUBMIT</button>
              </div>
            </form>
          </Col>

          <Col md={6} className="border ">
            {file.map((productItem, i) => {
              return (
                <div className="border" key={i}>
                  <div className="d-flex align-items-center justify-space-between">
                    <img
                      src={`${images}/${productItem.image}`}
                      className="outImg"
                    />
                    <div>
                      <p ref={productName} className="w-100">
                        {productItem.name}
                      </p>
                      <p className="w-100">
                        <span>Unit Price: Php</span>{" "}
                        <span ref={productPrice}>{productItem.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end pe-5">
                    <p>
                      <span> QUANTITY:</span>
                      <span ref={productQuantity}>{productItem.quantity}</span>
                    </p>
                  </div>
                </div>
              );
            })}
            <p className="d-flex justify-content-end mt-4 align-items-center">
              TOTAL:
              <span className="fw-bold fs-5 ms-1" ref={productTotal}>
                {totalAmount}
              </span>
            </p>
            <div className="d-flex justify-content-end align-items-center m-0">
              <button
                className=" px-5 py-1 storeBtn30"
                onClick={() => placeOrder(cartItems)}
              >
                PLACE ORDER
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckOut;
