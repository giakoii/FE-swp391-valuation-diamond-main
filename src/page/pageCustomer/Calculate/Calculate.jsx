import React, { useState } from "react";
import { Button, Col, Row, Spinner, Form, Container } from "react-bootstrap";
import "./Calculate.css";
import { CalculateOutput } from "./CalculateOutput";
import { useNavigate } from "react-router-dom";

function Calculate() {
  const [diamondCalculate, setDiamondCalculate] = useState({
    diamondOrigin: "Natural",
    shape: "Round",
    caratWeight: 1,
    clarity: "FL",
    color: "K",
    cut: "Fair",
    symmetry: "Fair",
    polish: "Fair",
    fluorescence: "Very Strong",
  });

  
  const navigate = useNavigate();
  // console.log(diamondCalculate)

  const selectedOption = (type, item) => {
    setDiamondCalculate((currentItem) => ({
      ...currentItem,
      [type]: item,
    }));
  };

  const handleOnCalculate = () => {
    // convert caratWeight String to number
    const diamondCalculateFinal = {
      ...diamondCalculate,
      caratWeight: Number.parseFloat(diamondCalculate.caratWeight)
    }
    console.log(diamondCalculateFinal)
    const queryParams = new URLSearchParams(diamondCalculateFinal).toString();
    navigate(`/calculate?${queryParams}`);
  };

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-center mt-3">
          <div className="me-5 w-75">

            <h2 className="fw-bold">Diamond Price Calculator</h2>
            <div className="w-50">
              <p style={{ fontSize: 13 }} >
                Use our free diamond price calculator to estimate the current retail price for diamonds. Our price estimates are updated daily based on our massive database of online jeweler inventory sourced from top-rated jewelers. To see more diamond data and up-to-date price charts, visit our diamond price indexes page.
              </p>
            </div>
          </div>

        </div>
      </Container>

      <div className="d-flex justify-content-center">
        <hr
          style={{ background: "#DDE1DF", height: "2px", marginBottom: "4.5rem", marginTop: "1.5rem", width: "90%" }}
        />
      </div>

      <div>
        <Row className="justify-content-center ">
          <Col md={6} className="w-25 mb-5">
            <div className="fs-3 fw-bold mb-4">Calculator Input</div>
            <div className="calculate-input">
            <label style={{ color: "#767C89", marginBottom: "12px" }}>DIAMOND ORIGIN</label>
            <div className="d-flex flex-wrap mb-4 button-group ">
              {[
                { label: "Natural", value: "Natural" },
                { label: "Lab Grown", value: "Lab" },
              ].map((option) => (
                <Button
                  key={option.label}
                  onClick={() => selectedOption("diamondOrigin", option.value)}
                  style={{ width: "45%", marginLeft: "10px" }}
                  className={
                    diamondCalculate.diamondOrigin === option.value
                      ? "selected"
                      : ""
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>SHAPE</label>
            <div className="d-flex flex-wrap mb-3 button-group">
              {["Round", "Oval", "Emerald", "Pear", "Princess", "Cushion"].map(
                (value) => (
                  <Button
                    key={value}
                    onClick={() => selectedOption("shape", value)}
                    style={{ width: "30%", margin: "3px 5px" }}
                    className={
                      diamondCalculate.shape === value ? "selected" : ""
                    }
                  >
                    {value}
                  </Button>
                )
              )}
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="caratWeight" className="w-100" style={{ color: "#767C89", marginBottom: "12px" }}>
                CARAT
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Form.Control
                  type="number"
                  id="caratWeight"
                  name="caratWeight"
                  value={diamondCalculate.caratWeight}
                  className="w-25 text-center"
                  style={{ backgroundColor: "#67FFE4", appearance: "textfield", margin: "0px" }}
                  onChange={(e) =>
                    setDiamondCalculate((currentItem) => ({
                      ...currentItem,
                      caratWeight: e.target.value,
                    }))
                  }
                />
              </div>
              <Form.Range
                id="caratWeight"
                name="caratWeight"
                min={0.3}
                value={diamondCalculate.caratWeight}
                max={5}
                step={0.01}
                className="w-100"
                onChange={(e) =>
                  setDiamondCalculate((currentItem) => ({
                    ...currentItem,
                    caratWeight: e.target.value,
                  }))
                }
              />
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>CLARITY</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"].map(
                (clarity) => (
                  <Button
                    key={clarity}
                    className={
                      diamondCalculate.clarity === clarity ? "selected" : ""
                    }
                    style={{ width: "23%", margin: "3px 2px" }}
                    onClick={() => selectedOption("clarity", clarity)}
                  >
                    {(clarity)}
                  </Button>
                )
              )}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>COLOR</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["K", "J", "I", "H", "G", "F", "E", "D"].map((color) => (
                <Button
                  key={color}
                  className={
                    diamondCalculate.color === color ? "selected" : ""
                  }
                  style={{ width: "23%", margin: "3px 2px" }}
                  onClick={() => selectedOption("color", color)}
                >
                  {color}
                </Button>
              ))}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>CUT</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {[
                {label: "FAIR" ,value:"Fair"}, 
                {label:"GOOD",value:"Good"}, 
                {label:"V.GOOD",value:"Very Good"}, 
                {label:"EX.",value:"Excellent"}
              ].map((cut) => (
                <Button
                  key={cut.label}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                    
                  }}
                  className={
                    diamondCalculate.cut === cut.value ? "selected" : ""
                  }
                  onClick={() => selectedOption("cut", cut.value)}
                >
                  {cut.label}
                </Button>
              ))}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>SYMMETRY</label>
            <div className="d-flex flex-wrap ms-2 mb-4 button-group">
              {[
                {label: "FAIR" ,value:"Fair"}, 
                {label:"GOOD",value:"Good"}, 
                {label:"V.GOOD",value:"Very Good"}, 
                {label:"EX.",value:"Excellent"}
              ].map((symmetry) => (
                <Button
                  key={symmetry.label}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                  
                  }}
                  className={
                    diamondCalculate.symmetry === symmetry.value ? "selected" : ""
                  }
                  onClick={() => selectedOption("symmetry", symmetry.value)}
                >
                  {(symmetry.label)}
                </Button>
              ))}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>POLISH</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {[
                {label: "FAIR" ,value:"Fair"}, 
                {label:"GOOD",value:"Good"}, 
                {label:"V.GOOD",value:"Very Good"}, 
                {label:"EX.",value:"Excellent"}
              ].map((polish) => (
                <Button
                  key={polish.label}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                    
                  }}
                  className={
                    diamondCalculate.polish === polish.value ? "selected" : ""
                  }
                  onClick={() => selectedOption("polish", polish.value)}
                >
                  {(polish.label)}
                </Button>
              ))}
            </div>
            <label htmlFor="" style={{ color: "#767C89", marginBottom: "12px" }}>FLUORESCENCE</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {[
                  {label: "VSTG" ,value:"Very Strong"}, 
                  {label:"STG",value:"Strong"}, 
                  {label:"MED",value:"Medium"}, 
                  {label:"FNT",value:"Faint"},
                  {label:"NON",value:"None"}
              ].map((fluorescence) => (
                <Button
                  key={fluorescence.label}
                  style={{
                    width: "18%",
                    margin: "3px 2px",
                    textAlign: "center",
                  }}
                  onClick={() =>
                    selectedOption("fluorescence", fluorescence.value)
                  }
                  className={
                    diamondCalculate.fluorescence === fluorescence.value
                      ? "selected"
                      : ""
                  }
                >
                  {(fluorescence.label)}
                </Button>
              ))}
            </div>
            </div>

            <div className="d-grid button-submit">
              <Button onClick={handleOnCalculate}>Calculate</Button>
            </div>
          </Col>
          <Col md={6} className="w-50">
            <div>
              <div className="fs-3 fw-bold mb-4">Calculate Output</div>
              <div>
                <CalculateOutput  />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Calculate;
