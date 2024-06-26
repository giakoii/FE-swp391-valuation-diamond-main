import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import updateById from "../../../utils/updateAPI/updateById";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import validator from "validator";

export const ValuationApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;

  const [result, setResult] = useState({
    diamondOrigin: "",
    measurements: "",
    proportions: "",
    shapeCut: "",
    caratWeight: "",
    color: "",
    clarity: "",
    cut: "",
    symmetry: "",
    polish: "",
    fluorescence: "",
    description: "",
    price: "",
    orderDetailId: product.orderDetailId,
    userId: product.evaluationStaffId,
    img: product.img,
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setResult((currentState) => ({
      ...currentState,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const showConfirmFinished = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to Finish",
      message: "Click ok to finish the order",
      buttons: [
        {
          label: "Ok",
          onClick: () => handleOnSubmit(),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const handleOnSubmit = async () => {
    const newErrors = {};
    Object.keys(result).forEach((key) => {
      if (validator.isEmpty(result[key].toString())) {
        newErrors[key] = `${key} không được để trống.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedResult = {
      ...result,
      caratWeight: parseFloat(result.caratWeight),
      price: parseFloat(result.price),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/evaluation_results/create",
        {
          method: "POST",
          body: JSON.stringify(formattedResult),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        await updateById(
          "http://localhost:8080/order_detail_request/getOrderDe",
          product.orderDetailId,
          "status",
          "Finished"
        );
        toast.success("Create successfully");
      }
      console.log("Submitted data", data);
    } catch (error) {
      console.log(error);
      toast.error("Submission Error");
    }
  };

  return (
    <Container>
      <div className="mb-4">
        <img
          src="/src/assets/assetsStaff/back.svg"
          alt="Back"
          onClick={() => {
            navigate("/valuation-staff/certificate-list");
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
      <Form onSubmit={showConfirmFinished}>
        <h1 className="text-center my-3">Diamond Valuation Report</h1>
        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <Form.Label htmlFor="userId" className="mb-0">
              Staff ID:
            </Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              id="userId"
              name="userId"
              value={result.userId}
              readOnly
            />
          </Col>
        </Row>

        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <Form.Label htmlFor="orderDetailId" className="mb-0">
              Product ID:
            </Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              id="orderDetailId"
              name="orderDetailId"
              value={result.orderDetailId}
              readOnly
            />
          </Col>
        </Row>

        <div className="d-flex">
          <div className="w-50">
            <div className="my-4 ms-4" style={{ width: "500px" }}>
              <h4
                className="text-center py-1"
                style={{ backgroundColor: "#7CF4DE" }}
              >
                Diamond Valuation Report
              </h4>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="diamondOrigin">Diamond Origin</label>
                </Col>
                <Col md={5}>
                  <select
                    id="diamondOrigin"
                    name="diamondOrigin"
                    value={result.diamondOrigin}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.diamondOrigin}
                  >
                    <option value=""></option>
                    <option value="Natural">Natural</option>
                    <option value="Lab Grown">Lab Grown</option>
                  </select>
                  {errors.diamondOrigin && (
                    <Form.Control.Feedback type="invalid">
                      {errors.diamondOrigin}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              {/* Measurements */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="measurements">Measurements</label>
                </Col>
                <Col md={5}>
                  <input
                    minLength={2}
                    maxLength={10}
                    type="text"
                    id="measurements"
                    name="measurements"
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    value={result.measurements || ""}
                    onChange={handleOnChange}
                    isInvalid={!!errors.measurements}
                  />
                  {errors.measurements && (
                    <Form.Control.Feedback type="invalid">
                      {errors.measurements}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              {/* Shape Cut */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="shapeCut">Shape Cut</label>
                </Col>
                <Col md={5}>
                  <select
                    id="shapeCut"
                    name="shapeCut"
                    value={result.shapeCut || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.shapeCut}
                  >
                    <option value=""></option>
                    <option value="Round">Round</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Oval">Oval</option>
                    <option value="Heart">Heart</option>
                    <option value="Princess">Princess</option>
                  </select>
                  {errors.shapeCut && (
                    <Form.Control.Feedback type="invalid">
                      {errors.shapeCut}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              {/* Description */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="description">Description</label>
                </Col>
                <Col md={5}>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={result.description}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.description}
                  />
                  {errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
            </div>
            {/* Grading Results */}
            <div className="my-4 ms-4" style={{ width: "500px" }}>
              <h4
                className="text-center py-1"
                style={{ backgroundColor: "#7CF4DE" }}
              >
                Grading Results
              </h4>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="caratWeight">Carat Weight</label>
                </Col>
                <Col md={5}>
                  <input
                    type="number"
                    min={0}
                    id="caratWeight"
                    name="caratWeight"
                    value={result.caratWeight || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.caratWeight}
                  />
                  {errors.caratWeight && (
                    <Form.Control.Feedback type="invalid">
                      {errors.caratWeight}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="color">Color Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="color"
                    name="color"
                    value={result.color || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.color}
                  >
                    <option value=""></option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                  </select>
                  {errors.color && (
                    <Form.Control.Feedback type="invalid">
                      {errors.color}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="clarity">Clarity Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="clarity"
                    name="clarity"
                    value={result.clarity || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.clarity}
                  >
                    <option value=""></option>
                    <option value="FL">FL</option>
                    <option value="IF">IF</option>
                    <option value="VVS1">VVS1</option>
                    <option value="VVS2">VVS2</option>
                    <option value="VS1">VS1</option>
                    <option value="VS2">VS2</option>
                    <option value="SI1">SI1</option>
                    <option value="SI2">SI2</option>
                    <option value="I1">I1</option>
                    <option value="I2">I2</option>
                    <option value="I3">I3</option>
                  </select>
                  {errors.clarity && (
                    <Form.Control.Feedback type="invalid">
                      {errors.clarity}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="cut">Cut Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="cut"
                    name="cut"
                    value={result.cut || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.cut}
                  >
                    <option value=""></option>
                    <option value="Ideal">Ideal</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                  {errors.cut && (
                    <Form.Control.Feedback type="invalid">
                      {errors.cut}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="symmetry">Symmetry</label>
                </Col>
                <Col md={5}>
                  <select
                    id="symmetry"
                    name="symmetry"
                    value={result.symmetry || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.symmetry}
                  >
                    <option value=""></option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                  {errors.symmetry && (
                    <Form.Control.Feedback type="invalid">
                      {errors.symmetry}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="polish">Polish</label>
                </Col>
                <Col md={5}>
                  <select
                    id="polish"
                    name="polish"
                    value={result.polish || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.polish}
                  >
                    <option value=""></option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                  {errors.polish && (
                    <Form.Control.Feedback type="invalid">
                      {errors.polish}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="fluorescence">Fluorescence</label>
                </Col>
                <Col md={5}>
                  <select
                    id="fluorescence"
                    name="fluorescence"
                    value={result.fluorescence || ""}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                    isInvalid={!!errors.fluorescence}
                  >
                    <option value=""></option>
                    <option value="None">None</option>
                    <option value="Faint">Faint</option>
                    <option value="Medium">Medium</option>
                    <option value="Strong">Strong</option>
                    <option value="Very Strong">Very Strong</option>
                  </select>
                  {errors.fluorescence && (
                    <Form.Control.Feedback type="invalid">
                      {errors.fluorescence}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
            </div>
          </div>
          <div className="mx-5 my-5 d-flex flex-column">
            <img
              src={result.img}
              alt="Diamond"
              style={{ width: "500px", height: "500px" }}
            />
            <div className="my-3">
              <Row className="align-items-end justify-content-between">
                <Col md={3}>
                  <label htmlFor="price">Price</label>
                </Col>
                <Col md={7}>
                  <input
                    type="number"
                    min={0}
                    id="price"
                    name="price"
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    value={result.price || ""}
                    onChange={handleOnChange}
                    isInvalid={!!errors.price}
                  />
                  {errors.price && (
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="text-center mb-5">
          <Button
            type="submit"
            style={{
              backgroundColor: "#F05656",
              borderRadius: "0",
              border: "none",
              width: "200px",
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};
