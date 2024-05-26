import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AdminLog.css";
import useApi from "../utils/http";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { message } from "antd";

const AdminLog = () => {
  const api = useApi();
  const toast = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  async function adminLog(e) {
    e.preventDefault();

    try {
      const body = {
        username: username,
        password: password,
      };
      const { data } = await api.post("/admin/logIn", body);
      navigate("/admin");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  }

  return (
    <>
      <Toast ref={toast} />
      {contextHolder}
      <Container>
        <Row>
          <Col className="navBarz"></Col>
        </Row>
        <Row className="p-5 adminRow">
          <Col
            md={12}
            className="colForm d-flex justify-content-center align-items-center"
          >
            <form className="adminForm" onSubmit={adminLog}>
              <p>Login</p>
              <div className="d-flex gap-2 adminBorderBottom">
                <UserOutlined className="adminIcon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin Username"
                />
              </div>
              <div className="d-flex gap-2 adminBorderBottom mt-4">
                <LockOutlined className="adminIcon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin Password"
                />
              </div>
              <button className="w-100">Sign In</button>
              <div className="mt-5 text-center d-flex flex-column gap-2 py-2 adminCredentials">
                <p className="adminUser m-0">
                  username: <span className="text-success">admin</span>
                </p>
                <p className="adminUser m-0">
                  password: <span className="text-success">password</span>
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLog;
