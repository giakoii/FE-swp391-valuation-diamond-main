import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contact = () => {
  const [facebook, setFacebook] = useState("");
  const [youtube, setYouTube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTikTok] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      facebook,
      youtube,
      instagram,
      tiktok,
    });
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 style={{ textAlign: "center" }}>Contact Us</h2>
        </Col>
      </Row>
      <Row className="mb-4" style={{ textAlign: "center" }}>
        <Col md={3}>
          <h5>Address</h5>
          <p>
          Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh, Vietnam
          </p>
        </Col>
        <Col md={3}>
          <h5>Phone</h5>
          <p>(+84) 766 942 380</p>
        </Col>
        <Col md={3}>
          <h5>Email</h5>
          <p>diamondValuation@gmail.com</p>
        </Col>
        <Col md={3}>
          <h5>Manager</h5>
          <p>Nguyen Anh Minh</p>
        </Col>
      </Row>

      <Row className="mb-4">
        
        <Col md={6} >
        <div style={{marginLeft:"100px"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFacebook">
              <Form.Label  style={{ fontWeight: 'bold' }}>Facebook:</Form.Label>
              <p>facebook.com/DiamondValuation</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formYouTube">
              <Form.Label  style={{ fontWeight: 'bold' }}>YouTube:</Form.Label>
              <p>youtube.com/DiamondValuation</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInstagram">
              <Form.Label  style={{ fontWeight: 'bold' }}>Instagram:</Form.Label>
              <p>instagram.com/DiamondValuation</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTikTok">
              <Form.Label  style={{ fontWeight: 'bold' }}>TikTok:</Form.Label>
              <p>tiktok.com/@DiamondValuation</p>
            </Form.Group>          
          </Form>
          </div>
        </Col>
       
        <Col md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370133!2d106.80730807488345!3d10.841127589311585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1719938797283!5m2!1sen!2s"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
