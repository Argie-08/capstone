import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./LogIn.css";
import useApi from "../utils/http";
import Pic from "../assets/login.png";

const LogIn = () => {
  const api = useApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);

  async function handleLogIn(e) {
    e.preventDefault();
    try {
      const body = { username: username, password: password };
      const { data } = await api.post("/loginhere", body);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", JSON.stringify(data.user));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  return (
    <>
      <Container className="logbase">
        <Toast ref={toast} />
        <Row>
          <Col className="navBarz"></Col>
        </Row>
        <Row>
          <Col md={7} className="leftbg">
            <img src={Pic} className="logInPic" />
            <p className="logOver">
              Man is still the most extraordinary computer of all.{" "}
            </p>
          </Col>
          <Col md={5} className="p-5 rightbg">
            <p className="welcome">HELLO! Welcome back</p>
            <form onSubmit={handleLogIn}>
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
              <div className="d-flex flex-column justify-content-end">
                <Button
                  label="Log In"
                  className="px-5 py-2 rounded loginBtn mb-3"
                />
                <Button
                  label="Sign-Up"
                  link
                  className="px-5 py-2 rounded continueBtn"
                  onClick={() => navigate("/register")}
                />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
