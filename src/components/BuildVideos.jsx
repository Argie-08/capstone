import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import V1 from "../assets/2.mp4";
import V2 from "../assets/3.mp4";
import "./BuildVideos.css";

const BuildVideos = () => {
  return (
    <>
      <Row className="bg mb-5">
        <Col>
          <Container>
            <Row className="d-flex justify-content-center boxFrame">
              <Col md={4} className="frame">
                <video src={V1} autoPlay loop className="mainVideo"></video>
              </Col>
              <Col md={4} className="frame">
                <video src={V2} autoPlay loop className="mainVideo"></video>
              </Col>
              <p className="boxFrameTop d-flex justify-content-center mt-4">
                OUR MASTERPIECE
              </p>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default BuildVideos;
