import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";

const Footer = () => {
  const gmail = () => {
    window.location.href = "https://www.gmail.com";
  };
  const facebook = () => {
    window.location.href = "https://www.facebook.com";
  };
  const youtube = () => {
    window.location.href = "https://www.youtube.com";
  };
  const insta = () => {
    window.location.href = "https://www.instagram.com";
  };
  const tiktok = () => {
    window.location.href = "https://www.tiktok.com";
  };

  return (
    <>
      <Row className="footerbg">
        <Col>
          <Container>
            <Row className="d-flex flex-column justify-content-between gap-5">
              <Col className="fontThis mt-3">
                <p className="follow">FOLLOW US</p>
                <div className="d-flex">
                  <a className="pi pi-envelope icons" onClick={gmail}></a>
                  <a className="pi pi-facebook icons" onClick={facebook}></a>
                  <a className="pi pi-youtube icons" onClick={youtube}></a>
                  <a className="pi pi-instagram icons" onClick={insta}></a>
                  <a className="pi pi-tiktok icons" onClick={tiktok}></a>
                </div>
              </Col>
              <Col className="fontThis footerbtn">
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
