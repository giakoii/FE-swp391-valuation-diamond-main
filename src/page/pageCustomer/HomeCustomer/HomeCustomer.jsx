import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Make sure to import the CSS file containing your custom styles
import addressIcon from "/assets/assetsCustomer/instagram.svg"; // Path to your image files
import handle from "/assets/assetsCustomer/hand.jpg";

const HomeCustomer = () => {
  return (
    <div className="full-width-container diagonal-shadow">
      <img
        src="/assets/assetsCustomer/pickture.png"
        alt="Diamond"
        style={{ width: "100%", height: "40vh" }}
      />

      <Container id="services" className="my-5">
        <Row>
          <Col className="text-center">
            <div  className="has-bg left">
              <img
                src="/assets/assetsCustomer/make.png"
                alt="Diamond"
                style={{ width: "70%", height: "60%", marginLeft: "10%" }}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col className="text-center" style={{ marginTop: "60px" }}>
            <h1 style={{ textAlign: "center", marginRight: "50px", color: "#000055" }}>
              Services at Valuation Diamond
            </h1>
            <p
              className="text-left"
              style={{
                textAlign: "justify",
                marginRight: "100px",
                marginLeft: "50px",
              }}
            >
              Inspection Company has been affirming its reputation with domestic
              and foreign customers and has become one of the leading Inspection
              Companies today. With the increasing demand for diamond, precious
              and semi-precious jewelry, having reputable quality inspection
              certificates is increasingly of top concern to consumers.
            </p>
            <div style={{ fontStyle: "italic", textAlign: "left" }}>
              <img
                src={addressIcon}
                alt="Address Icon"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Diamond Assessment and Consulting.
            </div>
            <div style={{ fontStyle: "italic", textAlign: "left" }}>
              <img
                src={addressIcon}
                alt="Address Icon"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Assessment and Consulting on Precious and Semi-Precious Stones.
            </div>
            <div style={{ fontStyle: "italic", textAlign: "left" }}>
              <img
                src={addressIcon}
                alt="Address Icon"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Assessment and Consulting on Gold, Silver, Precious Metals, Non-ferrous Metals
            </div>
          </Col>
        </Row>

        <div className=" d-flex justify-content-center">
          {/* Additional content or components can be added here */}
        </div>
        <div className="text-left">
          <div className="d-flex justify-content-between mt-4">
            <div className="w-50 p-2 text-left">
              <h2>Diamond Classification and Evaluation</h2>
              <p
                className="text-left"
                style={{
                  textAlign: "justify",
                  marginRight: "100px",
                  marginLeft: "25px",
                }}
              >
                Diamonds are sorted and categorized, divided according to a
                range of factors, including size, shape colour and quality, as
                well as yield potential (high yielding sawable, low yielding
                sawable, makeable), gem or industrial. Fancy coloured diamonds
                are valued separately and cut offs are used only when necessary.
              </p>
            </div>
            <div className="w-50 p-2 text-left">
              <h2>Diamond Valuation and Evaluation Process</h2>
              <p className="text-left" style={{ textAlign: "justify" }}>
                As stones are sorted, the number in each category is entered
                into a laptop computer loaded with the current price for each
                category. A detailed valuation, together with statistics, is
                then provided at source.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container id="info" className="my-5">
        <div className="d-flex">
          <div className="w-50 p-2 text-left" style={{ marginTop: "50px" }}>
            <h2>We have over 40 years of experience and</h2>
            <h2>insider knowledge of the industry.</h2>
            <p className="text-left" style={{ textAlign: "justify" }}>
              Our team of diamond experts has helped over 71,308 shoppers find
              the right conflict-free diamond with our comprehensive guides and
              offering honest and unbiased advice by answering your questions.
              We will help you sift through hundreds of thousands of loose
              diamonds online in order to find the one that best fits your
              needs.
            </p>
          </div>
       

          <div className="w-50 p-2">
            <img
              src={handle}
              alt="Diamond"
              style={{ width: "80%", height: "90%", marginLeft: "10%", marginBottom: "0px" }}
              className="img-fluid"
            />
          </div>
        </div>
        <Container id="contactt" className="my-5"></Container>
      </Container>
    </div>
  );
};

export default HomeCustomer;
