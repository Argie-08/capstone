import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Gaming from "../assets/gaming.jpg";
import Office from "../assets/office.jpg";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { Button } from "antd";
const { Meta } = Card;
import "./Highlight.css";

const Highlight = (data) => {
  const thisOne = data.data;

  useEffect(() => {
    return () => {};
  }, []);

  function handleGaming() {
    thisOne();
  }
  function handleOffice() {
    thisOne();
  }

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col className="d-flex flex-column align-items-center mt-5 lineBtn">
            <p className="hTitle1">Build Up Inspires</p>

            <p className="hTitle2">GET STARTED</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6} className="test">
            <Card className="card10">
              <div className="ImgSize">
                <Card.Img src={Gaming} />
              </div>
              <Card.Body>
                <Card.Title className="hTitle3 mb-2">Gaming Desktop</Card.Title>
                <Card.Text className="hTitle4">
                  Specialized personal computer designed for playing PC games at
                  high standards.
                </Card.Text>
              </Card.Body>
              <Button onClick={handleGaming}>SHOP NOW</Button>
            </Card>
          </Col>
          <Col md={6} className="test">
            <Card className="card10">
              <div className="ImgSize">
                <Card.Img src={Office} />
              </div>
              <Card.Body>
                <Card.Title className="hTitle3 mb-2">Office Desktop</Card.Title>
                <Card.Text className="hTitle4">
                  Preparation of word documents such as letters, reports,
                  processing of work documents such as work orders and financial
                  reports, presentation of reports and proposals to and behalf
                  of executive and higher level office personnel
                </Card.Text>
              </Card.Body>
              <Button onClick={handleOffice}>SHOP NOW</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Highlight;
