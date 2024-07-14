import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailDiamondCheck.css";

const DetailDiamondCheck = () => {
  const { assess_id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const fetchDiamondDetails = async () => {
      try {
        const response = await fetch(
          `https://valuation.techtheworld.id.vn/api/diamond-assessments/DiamondAssessmentByIDDB2/${assess_id}`
        );
        if (!response.ok) {
          throw new Error("Diamond not found");
        }
        const data = await response.json();
        setDiamond(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (assess_id) {
      fetchDiamondDetails();
    } else {
      setLoading(false);
    }
  }, [assess_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!diamond) {
    return null; // Không hiển thị gì nếu không có dữ liệu kim cương
  }

  return (
    <Row className="justify-content-md-center">
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontStyle: "italic",
        }}
      >
        If our lives were without diamonds, it would be very tedious
      </h1>
      <div className="d-flex justify-content-center">
        <div
          style={{
            marginBottom: "0",
            marginLeft: "50px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Form.Label
            style={{
              marginBottom: "0",
              marginRight: "5px", // Giảm khoảng cách giữa Label và Input
              whiteSpace: "nowrap", // Đảm bảo chữ không bị xuống dòng
            }}
          >
            <span className="text-muted">ASSESS DIAMOND ID:</span>
          </Form.Label>
          <div className="text-left">
            <div
              style={{
                marginLeft: "25px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {diamond.assessId}
            </div>
          </div>
        </div>
      </div>

      <Col md="8" className="text-center">
        <div style={{ marginBottom: "25px", marginTop: "25px" }}>
          <div>
            <div>
              <Row>
                <Col md={5}>
                  <Form.Group style={{ marginTop: "25px" }}>
                    <img
                      src={diamond.imageUrl}
                      alt="Diamond"
                      width="400px"
                      height="400px"
                      className="diamond-image"
                    />
                  </Form.Group>
                </Col>
                <Col md={7} style={{ marginTop: "60px" }}>
                  <Row>
                    <Col md={4}>
                      <Form.Group
                        controlId="formAssessOrigin"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted">Assess Origin</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessOrigin}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessMeasurement"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted">Assess Measurement</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.measurement}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formFluorescence"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Fluorescence</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.fluorescence}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="text-center">
                      <Form.Group
                        controlId="formAssessCut"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.FloatingLabel>
                          <span className="text-muted"> Assess Cut</span>
                        </Form.FloatingLabel>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessCut}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessShapeCut"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Assess Shape Cut</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessShapeCut}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessColor"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Assess Color</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessColor}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="text-center">
                      <Form.Group
                        controlId="formAssessClarity"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Assess Clarity</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessClarity}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formProportions"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Proportions</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.proportions}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formSymmetry"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>
                          <span className="text-muted"> Symmetry</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.symmetry}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <div className="button-container">
                      <Button
                        onClick={() => navigate("/checkdiamond")}
                        className="custom-button"
                        style={{ width: "600px" }}
                      >
                        Run another Check
                      </Button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>

      <h1
        className="text-center"
        style={{ marginTop: "50px", marginBottom: "50px", fontStyle: "italic" }}
      >
        Your Diamond Detail Parameters
      </h1>

      <div>
        <style>
          {`
          .button-container {
            margin-bottom: 50px; 
            text-align: center; 
          } 
          .custom-button { 
            background-color: #7B68EE; 
            border-color: lightcyan; 
            color: white; 
          }
          .custom-button:hover { 
            background-color: green; 
            border-color: green; 
          } 
        `}
        </style>
      </div>
    </Row>
  );
};

export default DetailDiamondCheck;
