import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup, Container, Row, Col, Alert } from "react-bootstrap";
import diamondLogo from "/src/assets/assetsCustomer/diamond.png"; // Replace with the actual path to your image

const CheckDiamond = () => {
  const [assess_id, setAssessId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/diamond_assessment/getDiamondAssessments/${assess_id}`);
      if (!response.ok) {
        throw new Error("Diamond not found");
      }
      const data = await response.json();
      // Nếu thành công, điều hướng đến trang inforcheck và có thể xử lý dữ liệu nếu cần thiết
      console.log("Received data:", data);
      setError(null);
      navigate(`/inforcheck/${assess_id}`);
    } catch (err) {
      // Nếu lỗi xảy ra, hiển thị thông báo lỗi
      setError("Diamond not found");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        {/* Left Column: Text Content */}
        <Col md="6" >
          <div className="text-center mb-4" style={{ marginTop: "200px"}}>
            <h1 className="text-muted fs-4 mb-3">
              <div  style={{color:"blue"}}> Check any diamond price & quality </div>          
            </h1>
            <p className="text-muted fs-6">
              Transact with confidence — get fair price, cut score, visual
              carat and more for free
            </p>
          </div>
        </Col>

        {/* Right Column: Image, Search Input, and Button */}
        <Col md="6">
          <div className="d-flex justify-content-center mb-4" style={{ marginTop: "75px" }}>
            <img
              src={diamondLogo}
              alt="Diamond Logo"
              style={{ width: "50%", height: "50%", marginBottom: "10px", borderRadius: "15px" }}
            />
          </div>
        </Col>

        <div className="text-center" style={{ width: "50%", marginBottom: "200px", marginTop: "50px" }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Diamond Assess ID"
              aria-label="Diamond Assess ID"
              aria-describedby="basic-addon2"
              value={assess_id}
              onChange={(e) => setAssessId(e.target.value)}
            />
            <Button variant="primary" className="ms-2" onClick={handleSearch} style={{ }}> 
              Run Check
            </Button>
          </InputGroup>
          {error && (
            <Alert 
              variant="danger" 
              dismissible 
              onClose={() => setError(null)} 
              style={{ 
                marginTop: "10px",
                fontSize: "1.2em",
                fontWeight: "bold"
              }}
            >
              {error}
            </Alert>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default CheckDiamond;
