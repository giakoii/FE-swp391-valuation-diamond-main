import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
          `https://valuation.techtheworld.id.vn/diamond_assessment/getDiamondAssessmentById/${assess_id}`
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
          color: "",
          marginTop: "20px",
          fontStyle: "italic",
        }}
      >
        If our lives were without diamonds, it would be very tedious
      </h1>
      <div className="d-flex justify-content-center">
        <Form.Group
          controlId="formAssessId"
          style={{
            marginBottom: "20px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <Form.Label
            style={{
              marginBottom: "0",
              marginRight: "5px", // Giảm khoảng cách giữa Label và Input
              whiteSpace: "nowrap", // Đảm bảo chữ không bị xuống dòng
            }}
          >
            Assess ID:
          </Form.Label>
          <Form.Control
            className="fw-bold"
            type="text"
            readOnly
            value={diamond.assessId}
            style={{
              marginRight: "100px",
              textAlign: "center",
              fontStyle: "italic",
              border: "none",
              borderBottom: "0px solid #ced4da",
              borderRadius: "0",
              flex: "1", // Đảm bảo Input chiếm phần còn lại của hàng ngang
              marginLeft: "5px", // Giảm khoảng cách giữa Label và Input
            }}
          />
        </Form.Group>
      </div>

      <Col md="8" className="text-center">
        <Card style={{ marginBottom: "50px", marginTop: "50px" }}>
          <Card.Body>
            <Form>
              <Row>
                <Col md={8} style={{ marginTop: "60px" }}>
                  <Row>
                    <Col md={4}>
                      <Form.Group
                        controlId="formAssessOrigin"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label className="fw-bold">
                          Assess Origin
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessOrigin}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">
                          Assess Measurement
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessMeasurement}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">
                          Fluorescence
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.fluorescence}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">Assess Cut</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessCut}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">
                          Assess Shape Cut
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessShapeCut}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">
                          Assess Color
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessColor}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">
                          Assess Clarity
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessClarity}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">Proportions</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.proportions}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
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
                        <Form.Label className="fw-bold">Symmetry</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.symmetry}
                          style={{
                            textAlign: "center",
                            fontStyle: "italic",
                            border: "none",
                            borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                            borderRadius: "0", // Đảm bảo không có viền cong
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Image
                    src="/assets/assetsCustomer/diamond.png"
                    fluid
                    style={{ borderRadius: "4px", marginTop: "75px" }}
                  />
                  <div className="text-center" style={{ marginTop: "20px" }}>
                    Diamond Perfect
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <h1
            className="text-center"
            style={{ margintop: "20px", marginBottom: "10px" }}
          >
            Your Diamond Detail Parameters
          </h1>

          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
              fontStyle: "italic",
            }}
          >
            Today is: {formattedDate}
          </div>
        </Card>
      </Col>

      <div className="d-flex justify-content-center">
        <style>
          {`
          .button-container {
            margin-bottom: 50px;
            text-align: center;
          }
          .custom-button {
            background-color: white;
            border-color: black;
            color: black;
          }
          .custom-button:hover {
            background-color: green;
            border-color: green;
          }
        `}
        </style>
        <Col md="8" className="button-container">
          <Button
            onClick={() => navigate("/checkdiamond")}
            variant="primary"
            className="custom-button"
          >
            Check Another Diamond
          </Button>
        </Col>
      </div>
    </Row>
  );
};

export default DetailDiamondCheck;
