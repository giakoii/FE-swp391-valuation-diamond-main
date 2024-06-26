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
          `http://localhost:8080/diamond_assessment/getDiamondAssessments/${assess_id}`
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
          color: "blue",
          marginTop: "20px",
        }}
      >
        If our lives were without diamonds, it would be very tedious
      </h1>
      <Form.Group
        controlId="formAssessId"
        style={{
          marginBottom: "20px",
          width: "25%",
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Form.Label  style={{ marginRight: "10px", marginBottom: "0", width: "10%" }}>
          Assess ID
        </Form.Label>
        <Form.Control type="text" readOnly value={diamond.assessId} style={{ flex: "1" }} />
      </Form.Group>

      <Col md="8">
        <Card style={{ marginBottom: "150px", marginTop: "150px" }}>
          <Card.Body>
            <Form>
              <Row>
                <Col md={8}>
                  <Row>
                    <Col md={4} className="text-center">
                      <Form.Group
                        controlId="formAssessOrigin"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Origin</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessOrigin}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessMeasurement"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Measurement</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessMeasurement}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formFluorescence"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Fluorescence</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.fluorescence}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="text-center">
                      <Form.Group
                        controlId="formAssessCut"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Cut</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessCut}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessShapeCut"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Shape Cut</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessShapeCut}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formAssessColor"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Color</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessColor}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="text-center">
                      <Form.Group
                        controlId="formAssessClarity"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Assess Clarity</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.assessClarity}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formProportions"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Proportions</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.proportions}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formSymmetry"
                        style={{ marginBottom: "20px" }}
                      >
                        <Form.Label>Symmetry</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={diamond.symmetry}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Image
                    src="/src/assets/assetsCustomer/diamond.png"
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
              color: "blue",
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
           Today is: {formattedDate}
          </div>
        </Card>
      </Col>

      <Col md="8" className="text-center" style={{ marginBottom: "50px" }}>
        <Button onClick={() => navigate('/checkdiamond')} variant="primary">
          Check Another Diamond
        </Button>
      </Col>
    </Row>
  );
};

export default DetailDiamondCheck;
