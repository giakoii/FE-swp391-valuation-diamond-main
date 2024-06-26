import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import useAuth from "../../../utils/hook/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import dayjs from "dayjs";
import validator from "validator";

const CreateCommitment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state;
  const { user } = useAuth();
  const dateNow = dayjs();

  const [committedForm, setCommittedForm] = useState({
    committedDate: dateNow,
    orderId: orderDetails[0]?.orderId?.orderId,
    committedName: orderDetails[0]?.orderId?.customerName,
    civilId: "",
    phoneNumber: orderDetails[0]?.orderId?.phone,
    userId: user.userId,
  });

  const [errorCivilId, setErrorCivilId] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCommittedForm((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    if (name === "civilId") {
      setErrorCivilId("");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra validation cho civilId
    if (!validator.isNumeric(committedForm.civilId) || !validator.isLength(committedForm.civilId, { min: 12, max: 12 })) {
      setErrorCivilId("Civil Id must be numeric and contain exactly 10 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/committed_Paper/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(committedForm),
      });
      if (response.ok) {
        toast.success("Create Successfully");
      } else {
        toast.error("Failed to create commitment");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <img
          src="/src/assets/assetsStaff/back.svg"
          alt="Back"
          onClick={() => {
            navigate(`/staff/view-receipt/${orderDetails[0].orderId.orderId}`);
          }}
        />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="w-75">
          <Form onSubmit={handleOnSubmit} className="mb-4">
            <Container className="border border-dark rounded p-4">
              <Row className="d-flex">
                <Col md={4}>
                  <img
                    src="/src/assets/assetsCustomer/logo.png"
                    alt="logo"
                    width="60%"
                    height="100%"
                  />
                </Col>
                <Col md={6} className="d-flex text-center align-items-center">
                  <div>
                    <h3>Commitment Form</h3>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={2}>
                  <Form.Label htmlFor="committedName">Customer Name</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    id="committedName"
                    name="committedName"
                    value={orderDetails[0]?.orderId?.customerName}
                    readOnly
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>Date</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    value={formattedDate(dateNow)}
                    readOnly
                  />
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col md={2}>
                  <Form.Label htmlFor="orderId">Order Id</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={orderDetails[0]?.orderId?.orderId}
                    readOnly
                  />
                </Col>
                <Col md={2}>
                  <Form.Label htmlFor="civilId">Identity ID</Form.Label>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    id="civilId"
                    name="civilId"
                    value={committedForm.civilId}
                    onChange={handleOnChange}
                    isInvalid={!!errorCivilId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorCivilId}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Container className="border border-dark rounded p-3">
                <div className="mb-3">
                  <p>1/ Customers have the right to request an inspection certificate for the product.</p>
                  <p>2/ Customers are responsible for carefully checking the above information before leaving the transaction counter to ensure product quality and quantity as expected.</p>
                  <p>3/ All complaints related to the quantity of inspection samples, seal quality, quantity and quality of inspection papers must be reported immediately at the transaction counter. Once leaving the counter, customers cannot request resolution of any complaints related to these issues.</p>
                  <p>4/ When customers sign the inspection receipt, it is considered that they have carefully read and agreed to the general regulations on inspection services specified in this document, unless otherwise agreed in writing between the two parties.</p>
                  <p>5/ The person coming to receive on your behalf must provide the following information: name, phone number, ID card/CCCD number.</p>
                  <p>I have read and committed to the above goals.</p>
                </div>
                <Row className="text-center mt-4">
                  <Col>
                    <p>Manager</p>
                    <div style={{ padding: "50px" }}></div>
                  </Col>
                  <Col>
                    <p>Customer</p>
                    <div style={{ padding: "50px" }}></div>
                  </Col>
                </Row>
              </Container>
            </Container>
            <div className="text-end mt-4 text-dark">
              <Button
                type="submit"
                style={{ backgroundColor: "#E2FBF5", color: "black" }}
              >
                Create
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommitment;
