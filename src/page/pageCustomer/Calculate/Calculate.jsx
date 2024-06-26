import React, { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import "./Calculate.css";
import { CalculateOutput } from "./CalculateOutput";
import { useNavigate } from "react-router-dom";

function Calculate() {
  const [diamondCalculate, setDiamondCalculate] = useState({
    isLabGrown: true,
    shape: "Round",
    caratWeight: "",
    clarity: "VVS1",
    color: "K",
    cut: "Fair",
    symmetry: "Fair",
    polish: "Fair",
    fluorescence: "Very Strong",
  });

  const navigate = useNavigate();

  const selectedOption = (type, item) => {
    setDiamondCalculate((currentItem) => ({
      ...currentItem,
      [type]: item,
    }));
  };

  const handleOnCalculate = () => {
    const queryParams = new URLSearchParams(diamondCalculate).toString();
    navigate(`/calculate?${queryParams}`);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div>
      <div className="text-center">
        <h1>Diamond Price Calculate</h1>
        <hr
          style={{ background: "#DDE1DF", height: "2px", marginTop: "1.5em" }}
        />
      </div>
      <div>
        <Row className="justify-content-center ">
          <Col md={6} className="w-25 mb-5">
            <div className="fs-3 fw-bold">Calculate Input</div>
            <label htmlFor="">DIAMOND ORIGIN</label>
            <div className="d-flex flex-wrap mb-4 button-group ">
              {[
                { label: "Natural", value: false },
                { label: "Lab grown", value: true },
              ].map((option) => (
                <Button
                  key={option.label}
                  onClick={() => selectedOption("isLabGrown", option.value)}
                  style={{ width: "45%", marginLeft: "10px" }}
                  className={
                    diamondCalculate.isLabGrown === option.value
                      ? "selected"
                      : ""
                  }
                >
                  {capitalize(option.label)}
                </Button>
              ))}
            </div>
            <label htmlFor="">SHAPE</label>
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
                    {capitalize(value)}
                  </Button>
                )
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="caratWeight" className="w-100">
                CARAT
              </label>
              <input
                id="caratWeight"
                type="number"
                name="caratWeight"
                className="w-100"
                onChange={(e) =>
                  setDiamondCalculate((currentItem) => ({
                    ...currentItem,
                    caratWeight: e.target.value,
                  }))
                }
              />
            </div>
            <label htmlFor="">CLARITY</label>
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
                    {capitalize(clarity)}
                  </Button>
                )
              )}
            </div>
            <label htmlFor="">COLOR</label>
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
            <label htmlFor="">CUT</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["Fair", "Good", "Very Good", "Excellent"].map((cut) => (
                <Button
                  key={cut}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                  }}
                  className={
                    diamondCalculate.cut === cut ? "selected" : ""
                  }
                  onClick={() => selectedOption("cut", cut)}
                >
                  {capitalize(cut)}
                </Button>
              ))}
            </div>
            <label htmlFor="">SYMMETRY</label>
            <div className="d-flex flex-wrap ms-2 mb-4 button-group">
              {["Fair", "Good", "Very Good", "Excellent"].map((symmetry) => (
                <Button
                  key={symmetry}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                  }}
                  className={
                    diamondCalculate.symmetry === symmetry ? "selected" : ""
                  }
                  onClick={() => selectedOption("symmetry", symmetry)}
                >
                  {capitalize(symmetry)}
                </Button>
              ))}
            </div>
            <label htmlFor="">POLISH</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["Fair", "Good", "Very Good", "Excellent"].map((polish) => (
                <Button
                  key={polish}
                  style={{
                    width: "23%",
                    margin: "3px 2px",
                    textAlign: "center",
                  }}
                  className={
                    diamondCalculate.polish === polish ? "selected" : ""
                  }
                  onClick={() => selectedOption("polish", polish)}
                >
                  {capitalize(polish)}
                </Button>
              ))}
            </div>
            <label htmlFor="">FLUORESCENCE</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["Very Strong", "Strong", "Medium", "Faint", "None"].map((fluorescence) => (
                <Button
                  key={fluorescence}
                  style={{
                    width: "18%",
                    margin: "3px 2px",
                    textAlign: "center",
                  }}
                  onClick={() =>
                    selectedOption("fluorescence", fluorescence)
                  }
                  className={
                    diamondCalculate.fluorescence === fluorescence
                      ? "selected"
                      : ""
                  }
                >
                  {capitalize(fluorescence)}
                </Button>
              ))}
            </div>
            <div className="d-grid button-submit">
              <Button onClick={handleOnCalculate}>Calculate</Button>
            </div>
          </Col>
          <Col md={6} className="w-50">
            <div>
              <div className="fs-3 fw-bold">Calculate Output</div>
              <div>
                <CalculateOutput />
                <div></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Calculate;
