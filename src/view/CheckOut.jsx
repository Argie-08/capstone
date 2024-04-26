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

const images = import.meta.env.VITE_IMAGES;

const CheckOut = ({ cartItems, user, totalPrice }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [file, setFile] = useState([]);
  const [users, setUsers] = useState();
  const [review, setReview] = useState("");
  // const [address, setAddress] = useState("");
  // const [landmark, setLandmark] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [contact, setContact] = useState("");

  const navigate = useNavigate();
  const api = useApi(token);

  useEffect(() => {
    setData();
    setPerson();
    return () => {};
  }, []);

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

  // console.log(data);
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
            <form>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Complete Address</label>
                    <InputText
                      // value={address}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${users?.address}`}
                      // onChange={(e) => setAddress(e.target.value)}
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
                      // value={landmark}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder="Optional"
                      // onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">First Name</label>
                    <InputText
                      // value={firstname}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${users?.first_name}`}
                      // onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Last Name</label>
                    <InputText
                      // value={lastname}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${users?.last_name}`}
                      // onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Email</label>
                    <InputText
                      // value={email}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${users?.email}`}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col md={12}>
                  <div className="d-flex flex-column">
                    <label htmlFor="username">Contact Number</label>
                    <InputText
                      // value={contact}
                      id="username"
                      className="p-1 ps-3 m-0 mb-3"
                      aria-describedby="username-help"
                      placeholder={`${users?.contact_number}`}
                      // onChange={(e) => setContact(e.target.value)}
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
                  <div className="d-flex align-items-center">
                    <img
                      src={`${images}/${productItem.image}`}
                      className="outImg"
                    />
                    <p>{productItem.name}</p>
                  </div>
                  <div className="d-flex justify-content-end pe-5">
                    <p>QUANTITY: {productItem.quantity}</p>
                  </div>
                </div>
              );
            })}
            <p className="d-flex justify-content-end mt-4 align-items-center">
              TOTAL: Php <span className="fw-bold fs-5 ms-1">{totalPrice}</span>
            </p>
            <div className="d-flex justify-content-end align-items-center m-0">
              <button className=" px-5 py-1 storeBtn30">PLACE ORDER</button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckOut;
