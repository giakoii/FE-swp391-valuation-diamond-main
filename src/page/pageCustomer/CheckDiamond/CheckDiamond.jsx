import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup, Container, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import diamondLogo from "/src/assets/assetsCustomer/diamond.png"; // Replace with the actual path to your image

const CheckDiamond = () => {
  const [assess_id, setAssessId] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/api/diamond-assessments/DiamondAssessmentByIDDB2/${assess_id}`);
      if (!response.ok) {
        throw new Error("Diamond not found");
      }
      const data = await response.json();
      // Nếu thành công, điều hướng đến trang inforcheck và có thể xử lý dữ liệu nếu cần thiết
      console.log("Received data:", data);
      navigate(`/inforcheck/${assess_id}`);
    } catch (err) {
      // Nếu lỗi xảy ra, hiển thị thông báo lỗi dùng SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Diamond not found !!!',
        text: 'Please try again',
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        {/* Left Column: Text Content */}
        <Col md="6">
          <div className="text-center mb-4" style={{ marginTop: "200px" }}>
            <h1 style={{ textAlign: "left" }}>
              <h1>Check any diamond's</h1>
              <h1 style={{ color: "blue" }}>price & quality </h1>
            </h1>
            <p style={{ textAlign: "left" }}>
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
          <div>
            <style>
              {`
                .custom-button {
                  background-color: #007bff; /* Màu xanh ban đầu */
                  border-color: #007bff;    /* Màu viền ban đầu */
                }
                .custom-button:hover {
                  background-color: green;  /* Màu xanh lá khi hover */
                  border-color: green;      /* Màu viền xanh lá khi hover */
                }
              `}
            </style>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter Diamond Assess ID"
                aria-label="Diamond Assess ID"
                aria-describedby="basic-addon2"
                value={assess_id}
                onChange={(e) => setAssessId(e.target.value)}
              />
              <Button
                variant="primary"
                className="ms-2 custom-button"
                onClick={handleSearch}
              >
                Run for Check
              </Button>
            </InputGroup>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CheckDiamond;
