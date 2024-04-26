import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Row className="footerbg">
        <Col>
          <Container>
            <Row className="d-flex flex-column justify-content-between gap-5 centerTest">
              <Col className="fontThis mt-3">
                <p className="follow">FOLLOW US</p>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="pi pi-envelope icons"></p>
                  <p className="pi pi-facebook icons"></p>
                  <p className="pi pi-youtube icons"></p>
                  <p className="pi pi-instagram icons"></p>
                  <p className="pi pi-tiktok icons"></p>
                </div>
              </Col>
              <Col className="fontThis">
                <p>Privacy Policy</p>
                <p>Copyright &copy; 2024 Horizone</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
