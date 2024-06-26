import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommitmentGenerate from "./CommitmentGenerate";
import formattedDate from "../../../utils/formattedDate/formattedDate";


const CommitmentDetail = () => {
  const [commitmentDetail, setCommitmentDetails] = useState({});
  const [isPrint, setIsPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { committedId } = useParams();
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/committed_Paper/getCommittedPaper/${committedId}`
        );
        const data = await response.json();
        setCommitmentDetails(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [committedId]);

  const handleOnPrint = () => {
    setIsPrint(true);
  };

  const handleGoBack = () => {
    navigate(`/staff/commitment-list`);
  };
  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      {!isPrint ? (
        <>
          <div>
            <img
              src="/src/assets/assetsStaff/back.svg"
              alt="Back"
              onClick={handleGoBack}
            />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <div className="w-75">
              <Form className="mb-4">
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
                    <Col
                      md={6}
                      className="d-flex text-center align-items-center"
                    >
                      <div>
                        <h3>Commitment Form</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col md={2}>
                      <div>Customer Name:</div>
                    </Col>
                    <Col md={4}>
                      <div>{commitmentDetail.committedName}</div>
                    </Col>
                    <Col md={2}>
                      <div>Date:</div>
                    </Col>
                    <Col md={4}>
                      <div>{formattedDate(commitmentDetail.committedDate)}</div>
                    </Col>
                  </Row>
                  <Row className="mb-3 align-items-center">
                    <Col md={2}>
                      <div>Order Id:</div>
                    </Col>
                    <Col md={4}>
                      <div>{commitmentDetail.orderId.orderId}</div>
                    </Col>
                    <Col md={2}>
                      <div>Civil Id:</div>
                    </Col>
                    <Col md={4}>
                      <div>{commitmentDetail.civilId}</div>
                    </Col>
                  </Row>

                  <Container className="border border-dark rounded p-3">
                    <div className="mb-3">
                      <p>
                        1/ Customers have the right to request an inspection
                        certificate for the product.
                      </p>
                      <p>
                        2/ Customers are responsible for carefully checking the
                        above information before leaving the transaction counter
                        to ensure product quality and quantity as expected.
                      </p>
                      <p>
                        3/ All complaints related to the quantity of inspection
                        samples, seal quality, quantity and quality of
                        inspection papers must be reported immediately at the
                        transaction counter. Once leaving the counter, customers
                        cannot request resolution of any complaints related to
                        these issues.
                      </p>
                      <p>
                        4/ When customers sign the inspection receipt, it is
                        considered that they have carefully read and agreed to
                        the general regulations on inspection services specified
                        in this document, unless otherwise agreed in writing
                        between the two parties.
                      </p>
                      <p>
                        5/ The person coming to receive on your behalf must
                        provide the following information: name, phone number,
                        ID card/CCCD number.
                      </p>
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
                    type="button"
                    style={{ backgroundColor: "#E2FBF5", color: "black" }}
                    onClick={handleOnPrint}
                  >
                    Print
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <div>
          <img
            src="/src/assets/assetsStaff/back.svg"
            alt="Go Back"
            className="mt-3"
            height="20"
            width="20"
            onClick={() => setIsPrint(false)}
          />
           <CommitmentGenerate commitmentResult={commitmentDetail} />
        </div>
      )}
    </div>
  );
};
export default CommitmentDetail;
