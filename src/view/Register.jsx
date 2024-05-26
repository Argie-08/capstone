import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "antd";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import useApi from "../utils/http";
import "./Register.css";
import Pics from "../assets/reg.jpg";

const Register = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useRef(null);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const body = {
        first_name: firstname,
        last_name: lastname,
        address: address,
        landmark: landmark,
        contact_number: contact,
        email: email,
        username: username,
        password: password,
        password_confirmation: confirmPassword,
      };

      const response = await api.post("registered", body);
      setFirstname("");
      setLastname("");
      setAddress("");
      setLandmark("");
      setContact("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/log-in");
    } catch (error) {
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  return (
    <>
      {" "}
      <Container className="logbase">
        <Toast ref={toast} />
        <Row>
          <Col className="navBarz"></Col>
        </Row>
        <form onSubmit={handleRegister}>
          <Row>
            <Col md={7} className="leftbg">
              <img src={Pics} className="logInPic" />
              <p className="logOver">You Got This!</p>
            </Col>
            <Col md={5} className="p-5 rightbg">
              <Row className="w-100">
                <p className="welcome2">FILL OUT THIS ONE</p>
                <Col md={6} className="p-0 pe-3">
                  <Input
                    value={firstname}
                    placeholder="First Name"
                    className="mb-3"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Col>
                <Col md={6} className="p-0">
                  <Input
                    value={lastname}
                    placeholder="Last Name"
                    className="mb-3"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                value={address}
                placeholder="Complete Address"
                className="mb-3"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                value={landmark}
                placeholder="(Optional) Apartment, Brgy, Street, etc."
                className="mb-3"
                onChange={(e) => setLandmark(e.target.value)}
              />
              <Input
                value={contact}
                placeholder="Contact Number"
                type="integer"
                className="mb-3"
                onChange={(e) => setContact(e.target.value)}
              />
              <Input
                value={email}
                placeholder="Email"
                type="email"
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                value={username}
                placeholder="Username"
                className="mb-3"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                value={password}
                placeholder="Password"
                type="password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                value={confirmPassword}
                placeholder="Confirm Password"
                type="password"
                className="mb-3"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Checkbox className="w-100 mb-5">
                I agree to <b>Terms and Condition</b>
              </Checkbox>
              <div className="d-flex flex-column justify-content-end">
                <Button
                  label="Sign Up"
                  className="px-5 py-2 rounded loginBtn mb-3 btnTest"
                />
                <Button
                  label="Log-In"
                  link
                  className="px-5 py-2 rounded continueBtn"
                  onClick={() => navigate("/log-in")}
                />
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default Register;
