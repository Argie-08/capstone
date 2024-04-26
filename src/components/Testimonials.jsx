import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Testimonial.css";

const Testimonials = () => {
  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col
            md={4}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <i className="pi pi-user mb-3" style={{ fontSize: "2.5rem" }}></i>
            <p className="belowHead">CHAT WITH US REAL-TIME</p>
            <p>Dedicated Support</p>
            <p>(10:00AM to 5:00PM)</p>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <i className="pi pi-truck mb-3" style={{ fontSize: "2.5rem" }}></i>
            <p className="belowHead">NATIONWIDE SHIPPING</p>
            <p>Express Delivery Available</p>
            <p>NinjaVan and J&T Express</p>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <i
              className="pi pi-map-marker mb-3"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <p className="belowHead">STORE LOCATION</p>
            <p>Poblacion, Labason</p>
            <p>Zamboang del Norte</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Testimonials;
