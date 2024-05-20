import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./About.css";

const About = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="navBarz"></Col>
        </Row>
        <Row className="mt-5 aboutBase">
          <Col>
            <h2 className="fw-bold mb-3">
              Horizone: The Future of Tech Shopping
            </h2>
            <div className="mb-5">
              <span>
                In today's fast-paced world, convenience is a top priority for
                everyone, and the realm of online shopping has transformed the
                way we purchase goods and services. Horizone, your go-to
                computer store online, is revolutionizing the way customers buy
                computer components such as
              </span>
              <span className="aboutHighlightText">
                ` motherboards, memory, solid-state drives, power supplies, PC
                cases, and processors. `
              </span>
              <span>
                Horizone also offers computer accessories such as keyboards,
                headset, monitors, speakers and many more. With a strong focus
                on making the buying experience fast, safe, and reliable,
                Horizone has become the ultimate destination for tech
                enthusiasts and casual users alike.
              </span>
            </div>
            <h2 className="fw-bold">Fast and Reliable Shipping and Delivery</h2>
            <p className="mb-5">
              Getting your hands on your desired computer components is just a
              few clicks away. Horizone offers various shipping options,
              including express delivery for urgent needs. Our reliable shipping
              partners ensure that your package reaches you in excellent
              condition and within the specified time frame. You can track your
              order in real-time, providing you with peace of mind as you
              eagerly anticipate the arrival of your new tech. We understand
              that timely delivery is crucial for a seamless and satisfying
              shopping experience. That's why we have invested in a fast and
              reliable shipping and delivery system that ensures your orders
              reach you promptly and in excellent condition. Our commitment to
              delivering your products on time is a testament to our dedication
              to customer satisfaction.
            </p>
            <h2 className="fw-bold">Safe and Secure Payment Options</h2>
            <p>
              At Horizone, the safety and security of our customers' payments
              are of paramount importance to us. We understand that when it
              comes to online transactions, trust is the foundation of any
              successful business relationship. That's why we have implemented a
              comprehensive set of measures to ensure that all payment processes
              on our platform are safe, secure, and worry-free.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
