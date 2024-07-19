import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailDiamondCheck.css";

const DetailDiamondCheck = () => {
  const { assess_id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [baseFinalPrice, setBaseFinalPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [loading, setLoading] = useState(true);
  const [priceLoading, setPriceLoading] = useState(false);
  const navigate = useNavigate();

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
 
        // Fetch baseFinalPrice after diamond details are set
        setPriceLoading(true);
 
        const assessmentParam = `diamondOrigin=${data?.assessOrigin}&caratWeight=${data?.assessCarat}&shape=${data?.assessShapeCut}&cut=${data?.assessCut}&fluorescence=${data?.fluorescence}&symmetry=${data?.symmetry}&clarity=${data?.assessClarity}&color=${data?.assessColor}&polish=${data?.polish}`;
        console.log(assessmentParam);
        console.log("diamond:", data);

        const priceResponse = await fetch(
          `https://valuation.techtheworld.id.vn/getDB2/calculate/price?${assessmentParam}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const priceData = await priceResponse.json();
        setBaseFinalPrice(priceData.baseFinalPrice);
        setMaxPrice(priceData.maxPrice);
        setMinPrice(priceData.minPrice);
        console.log("pricedata: ", priceData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setPriceLoading(false);
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

  // if (!diamond) {
  //   return null; // Không hiển thị gì nếu không có dữ liệu kim cương
  // }

  return (
    <div className="justify-content-md-center">
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontStyle: "italic",
          }}
        >
          If our lives were without diamonds, it would be very tedious
        </h1>
      </div>

      <div style={{ marginBottom: "25px", marginTop: "25px" }}>
        <Row>
          <Col md={6} className="d-flex justify-content-end"style={{ marginLeft: "100px" }}>
         
            <Form.Group>
              <img
                src={diamond.imageUrl}
                alt="Diamond"
                width="500px"
                height="500px"
                className="diamond-image"
              />
            </Form.Group>
           
          </Col>

          <Col md={4}>
            <div>
              <Row>
                <Col md={8}>
                  <div
                    style={{
                      width: "20%",
                      display: "flex",
                      alignItems: "left",
                    }}
                  >
                    <Form.Label
                      style={{
                        marginBottom: "0",
                        marginRight: "5px", // Giảm khoảng cách giữa Label và Input
                        whiteSpace: "nowrap", // Đảm bảo chữ không bị xuống dòng
                      }}
                    >
                      <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
                        ASSESS DIAMOND ID
                      </div>
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
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formAssessOrigin">
                    <Form.Control
                      type="text"
                      readOnly
                      value={diamond.assessOrigin}
                      style={{
                        textAlign: "center",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        borderColor: "green",
                        color: "green",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div style={{marginLeft:"50px"}}>
                <div className="d-flex" style={{ fontWeight: "bold" }}>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "-10px" }}>
                      •
                    </span>
                    Off market | Fair Price Estimate:
                  </div>
                  <div style={{ color: "blue", marginLeft: "10px" }}>
                    {priceLoading ? "Loading..." : `${baseFinalPrice}$`}
                  </div>
                </div>

                <div className="d-flex" style={{ fontWeight: "bold" }}>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "-10px" }}>
                      •
                    </span>
                    Estimate Range:{" "}
                  </div>
                  <div style={{ color: "blue", marginLeft: "10px" }}>
                    {priceLoading ? "Loading..." : `${minPrice}$`} -{" "}
                    {priceLoading ? "Loading..." : `${maxPrice}$`}
                  </div>
                </div>
                
              </div>
              <span style={{ filter: "blur(0.5px)" }}>
                  Not currently listed on Valuation Diamond similar 💎
                </span>
            </div>
            <Row
              style={{
                border: "1px solid black",
                padding: "10px",
                borderColor: "blue",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Col md={4}>
                <Form.Group
                  controlId="formAssessOrigin"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>
                    <span className="text-muted" style={{ marginLeft: "20px" }}>
                      Assess Polish
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={diamond.polish}
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
              <Col md={4}>
                <Form.Group
                  controlId="formAssessMeasurement"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>
                    <span className="text-muted" style={{ marginLeft: "20px" }}>
                      Measurement
                    </span>
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
              </Col>
              <Col md={4}>
                <Form.Group
                  controlId="formFluorescence"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>
                    <span className="text-muted" style={{ marginLeft: "20px" }}>
                      Fluorescence
                    </span>
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
            </Row>
            <Row
              style={{
                border: "1px solid black",
                padding: "10px",
                borderColor: "blue",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Row>
                <Col md={4}>
                  <Form.Group
                    controlId="formAssessCut"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <div
                        className="text-muted"
                        style={{ marginLeft: "40px" }}
                      >
                        Assess Cut
                      </div>
                    </Form.Label>
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
                </Col>
                <Col md={4}>
                  <Form.Group
                    controlId="formAssessShapeCut"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <span
                        className="text-muted"
                        style={{ marginLeft: "20px" }}
                      >
                        Assess Shape
                      </span>
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
                </Col>
                <Col md={4}>
                  <Form.Group
                    controlId="formAssessColor"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <span
                        className="text-muted"
                        style={{ marginLeft: "20px" }}
                      >
                        Assess Color
                      </span>
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
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group
                    controlId="formAssessClarity"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <span
                        className="text-muted"
                        style={{ marginLeft: "30px" }}
                      >
                        Assess Clarity
                      </span>
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
                </Col>
                <Col md={4}>
                  <Form.Group
                    controlId="formProportions"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <span
                        className="text-muted"
                        style={{ marginLeft: "30px" }}
                      >
                        Proportions
                      </span>
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
                </Col>
                <Col md={4}>
                  <Form.Group
                    controlId="formSymmetry"
                    style={{ marginBottom: "20px" }}
                  >
                    <Form.Label>
                      <span
                        className="text-muted"
                        style={{ marginLeft: "40px" }}
                      >
                        Symmetry
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={diamond.symmetry}
                      style={{
                        textAlign: "center",
                        marginLeft: "10px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        border: "none",
                        borderBottom: "0px solid #ced4da", // Thiết lập màu và kiểu đường viền bạn muốn
                        borderRadius: "0", // Đảm bảo không có viền cong
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row>
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
    </div>
  );
};

export default DetailDiamondCheck;
