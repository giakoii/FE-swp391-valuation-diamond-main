import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../../../utils/constants/url";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

// ROLE: VALUATION_STAFF
export const ValuationApplication = () => {
  dayjs.extend(utc)
  const navigate = useNavigate();
  const { orderDetailId } = useParams()
  const [priceMarket, setPriceMarket] = useState({})
  const [orderDetail, setOrderDetail] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [validMarketPrice, setValidMarketPrice] = useState({
    diamondOrigin:"",
    clarity: "",
    shape: "",
    caratWeight: "",
    color: "",
  });

  //GET VALUATION BY VALUATION ORDER DETAILS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order_detail_request/getOrderDe/${orderDetailId}`);
        const data = await response.json();
        setOrderDetail(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const { register: result, handleSubmit, formState: { errors } } = useForm();

  // Data market price
  const [marketPrice, setMarketPrice] = useState({
    diamondOrigin: "",
    shape: "",
    caratWeight: "",
    clarity: "",
    color: "",
    cut: "",
    symmetry: "",
    polish: "",
    fluorescence: "",
  });

  console.log(marketPrice)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "shapeCut") {
      setMarketPrice((currentState) => ({
        ...currentState,
        shape: value
      }));
    }
    else {
      setMarketPrice((currentState) => ({ ...currentState, [name]: value }));
    }
  };
  // validation calculate carat weight

  const validateForm = () => {
    const errors = {};
    if (!marketPrice.diamondOrigin) {
      errors.diamondOrigin = "Diamond Origin is required to calculate";
    }
  
    if (!marketPrice.clarity) {
      errors.clarity = "Clarity is required to calculate";
    }
    if (!marketPrice.caratWeight) {
      errors.caratWeight = "Carat weight is required to calculate";
    } else if (!/^\d+(\.\d{1,2})?$/.test(marketPrice.caratWeight)) {
      errors.caratWeight = "Carat weight must include only number and 2 decimal places";
    } else if (Number.parseFloat(marketPrice.caratWeight) < 0.1 || Number.parseFloat(marketPrice.caratWeight) > 100) {
      errors.caratWeight = "Carat Weight must be between 0.1 and 100 carats";
    }
    if (!marketPrice.shape) {
      errors.shape = "Shape cut is required to calculate";
    }
    if (!marketPrice.color) {
      errors.color = "Color is required to calculate";
    }
  
    setValidMarketPrice(errors);
    return Object.keys(errors).length === 0;
  };
  
  const viewMarketPrice = async () => {
  if (validateForm()) {
    try {
      const queryParams = new URLSearchParams(marketPrice).toString();
      const response = await fetch(
        `${API_BASE_URL}/getDB2/calculate/price?${queryParams}`
      );
      if (!response.ok) {
        throw new Error('Error fetching market price');
      }
      const data = await response.json();
      setPriceMarket(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching market price:', error);
    }
  }
};
  const checkExistId = async (orderDetailId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation_results/getEvaluationResultsByOrderDetailId/${orderDetailId}`
      );
      if (!response.ok) {
        return false;
      }
      const text = await response.text();
      if (!text) {
        return false;
      }
      const data = JSON.parse(text);
      console.log(data);

      if (data?.orderDetailId?.orderDetailId === orderDetailId) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking ID existence:", error);
      return false;
    }
  };


  const showConfirmFinished = async (data) => {
    const exist = await checkExistId(orderDetailId)
    if (exist) {
      toast.error("Sample ID already exists. Cannot create duplicate sample.");
      return;
    }


    confirmAlert({
      title: "Confirm to Finish",
      message: "Click ok to finish the order",
      buttons: [
        {
          label: "Ok",
          onClick: () => handleOnSubmit(data),
        },
        {
          label: "Cancel",
          onClick: () => { },
        },
      ],
    });
  };
  //handleOnSubmit
  const handleOnSubmit = async (data) => {
    const formattedResult = {
      ...data,
      caratWeight: parseFloat(data.caratWeight),
      price: parseFloat(data.price),
      img: orderDetail.img,
      createDate: dayjs().format()
    };
    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation_results/create`,
        {
          method: "POST",
          body: JSON.stringify(formattedResult),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        console.log(res)
        toast.success("Create successfully");
      }
      console.log("Submitted data", data);
    } catch (error) {
      console.log(error);
      toast.error("Submission Error");
    }
  };
  if (isLoading) {
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }

  return (
    <Container>
      <div className="mb-4">
        <img
          src="/assets/assetsStaff/back.svg"
          alt="Back"
          onClick={() => {
            navigate("/valuation-staff/valuation-order");
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
      <Form onSubmit={handleSubmit(showConfirmFinished)}>
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
              {...result("userId")}
              value={orderDetail.evaluationStaffId}
              readOnly
            />
          </Col>
        </Row>

        <Row className="mb-2 align-items-center">
          <Col md={2}>
            <Form.Label htmlFor="orderDetailId" className="mb-0">
              Sample ID:
            </Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              id="orderDetailId"
              {...result("orderDetailId")}
              value={orderDetail.orderDetailId}
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
                    {...result("diamondOrigin", { required: "Diamond Origin is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="Natural">Natural</option>
                    <option value="Lab">Lab Grown</option>
                  </select>
                  <div>
                  {errors.diamondOrigin && <span className="text-danger">{errors.diamondOrigin.message}</span>}
                  </div>
                  {!!validMarketPrice.diamondOrigin && <span className="text-danger">{validMarketPrice.diamondOrigin}</span>}
                </Col>
              </Row>
              {/* Measurements */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="measurements">Measurements</label>
                </Col>
                <Col md={5}>
                  <input
                    type="text"
                    id="measurements"
                    {...result("measurements", {
                      required: "Measurements is required",
                      minLength: {
                        value: 4,
                        message: "Measurements length must be at least 4 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Measurements length must not exceed 20 characters"
                      }
                    })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                  />
                  {errors.measurements && <span className="text-danger">{errors.measurements.message}</span>}
                </Col>
              </Row>

              {/*  */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="shapeCut">Shape Cut</label>
                </Col>
                <Col md={5}>
                  <select
                    name="shapeCut"
                    id="shapeCut"
                    {...result("shapeCut", { required: "Shape Cut is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="Round">Round</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Oval">Oval</option>
                    <option value="Pear">Pear</option>
                    <option value="Princess">Princess</option>
                  </select>
                  <div>
                  {errors.shapeCut && <span className="text-danger">{errors.shapeCut.message}</span>}
                  </div>
                  {!!validMarketPrice.shape && <span className="text-danger">{validMarketPrice.shape}</span>}
                </Col>
              </Row>


              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="description">Description</label>
                </Col>
                <Col md={5}>
                  <input
                    type="text"
                    id="description"
                    {...result("description", {
                      required: "Description is required",
                      minLength: {
                        value: 4,
                        message: "Description length must be at least 3 characters"
                      },
                      maxLength: {
                        value: 100,
                        message: "Description length must not exceed 100 characters"
                      }
                    })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                  />
                  {errors.description && <span className="text-danger">{errors.description.message}</span>}
                </Col>
              </Row>
            </div>
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
                    min={2}
                    max={50}
                    step="0.01"
                    id="caratWeight"
                    {...result("caratWeight", {
                      required: "Carat Weight is required",
                    })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}

                    onChange={handleOnChange}
                  />
                  <div>{errors.caratWeight && <span className="text-danger">{errors.caratWeight.message}</span>}</div>
                  {!!validMarketPrice.caratWeight && <span className="text-danger">{validMarketPrice.caratWeight}</span>}
                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="color">Color Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="color"
                    {...result("color", { required: "Color Grade is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="G">G</option>
                    <option value="F">F</option>
                    <option value="I">I</option>
                    <option value="H">H</option>
                    <option value="J">J</option>
                    <option value="K">K</option>
                  </select>
                  <div>
                  {errors.color && <span className="text-danger">{errors.color.message}</span>}
                  </div>
                  {!!validMarketPrice.color && <span className="text-danger">{validMarketPrice.color}</span>}

                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="clarity">Clarity Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="clarity"
                    {...result("clarity", { required: "Clarity Grade is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="SI2">SI2</option>
                    <option value="SI1">SI1</option>
                    <option value="VS2">VS2</option>
                    <option value="VS1">VS1</option>
                    <option value="VVS2">VVS2</option>
                    <option value="VVS1">VVS1</option>
                    <option value="IF">IF</option>
                    <option value="FL">FL</option>
                  </select>
                  <div>
                  {errors.clarity && <span className="text-danger">{errors.clarity.message}</span>}
                  </div>
                
                  {!!validMarketPrice.clarity && <span className="text-danger">{validMarketPrice.clarity}</span>}
                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="cut">Cut Grade</label>
                </Col>
                <Col md={5}>
                  <select
                    id="cut"
                    {...result("cut", { required: "Cut Grade is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="Fair">FAIR</option>
                    <option value="Good">GOOD</option>
                    <option value="Very Good">V.GOOD</option>
                    <option value="Excellent">EX.</option>
                  </select>
                  {errors.cut && <span className="text-danger">{errors.cut.message}</span>}
                </Col>
              </Row>
            </div>

            <div className="my-4 ms-4" style={{ width: "500px" }}>
              <h4
                className="text-center py-1"
                style={{ backgroundColor: "#7CF4DE" }}
              >
                Additional Grading Information
              </h4>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="polish">Polish</label>
                </Col>
                <Col md={5}>
                  <select
                    id="polish"
                    {...result("polish", { required: "Polish is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="Fair">FAIR</option>
                    <option value="Good">GOOD</option>
                    <option value="Very Good">V.GOOD</option>
                    <option value="Excellent">EX.</option>
                  </select>
                  {errors.polish && <span className="text-danger">{errors.polish.message}</span>}
                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="symmetry">Symmetry</label>
                </Col>
                <Col md={5}>
                  <select
                    id="symmetry"
                    {...result("symmetry", { required: "Symmetry is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}

                  >
                    <option value=""></option>
                    <option value="Fair">FAIR</option>
                    <option value="Good">GOOD</option>
                    <option value="Very Good">V.GOOD</option>
                    <option value="Excellent">EX.</option>
                  </select>
                  {errors.symmetry && <span className="text-danger">{errors.symmetry.message}</span>}
                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="fluorescence">Fluorescence</label>
                </Col>
                <Col md={5}>
                  <select
                    id="fluorescence"
                    {...result("fluorescence", { required: "Fluorescence is required" })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                    onChange={handleOnChange}
                  >
                    <option value=""></option>
                    <option value="Very Strong">VSTG</option>
                    <option value="Strong">STG</option>
                    <option value="Medium">MED</option>
                    <option value="Faint">FNT</option>
                    <option value="NON">NON</option>
                  </select>
                  {errors.fluorescence && <span className="text-danger">{errors.fluorescence.message}</span>}

                </Col>
              </Row>

              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="proportions">Proportion</label>
                </Col>
                <Col md={5}>
                  <input
                    minLength={2}
                    maxLength={20}
                    id="proportions"
                    type="text"
                    {...result("proportions", { required: "Proportion is required" })}

                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                  />
                  {errors.proportions && <span className="text-danger">{errors.proportions.message}</span>}
                </Col>

              </Row>
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="price">Estimate Price</label>
                </Col>
                <Col md={5}>
                  <input
                    type="number"
                    id="price"
                    min={1}
                    {...result("price", {
                      required: "Price is required",
                    })}
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                    }}
                  />
                  {errors.price && <span className="text-danger">{errors.price.message}</span>}
                </Col>
              </Row>
              {/* Market Price  */}
              <Row className="mb-2 align-items-end justify-content-between">
                <Col md={4}>
                  <label htmlFor="market-price">Market Price</label>
                </Col>
                <Col md={5} >
                  <div
                    style={{
                      border: "none",
                      borderBottom: "solid",
                      width: "100%",
                      padding: "5px",
                      color: "red"
                    }}>
                    {priceMarket.baseFinalPrice ? `$${Math.round(priceMarket.baseFinalPrice)}` : 0}
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">

                <Button
                  onClick={viewMarketPrice}
                >
                  View Price
                </Button>
              </div>


            </div>
          </div>

          <div className="w-50">
            <div className="my-4 ms-4" style={{ width: "500px" }}>
              <h4
                className="text-center py-1"
                style={{ backgroundColor: "#7CF4DE" }}
              >
                Sample Image
              </h4>
              <div className="my-3 d-flex justify-content-center">
                {orderDetail.img && (
                  <img
                    src={orderDetail.img}
                    alt="product-img"
                    height="300"
                    className="border border-dark w-75"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end my-4">
          <Button className="btn btn-danger me-4" type="submit">
            Create
          </Button>
        </div>
      </Form>
    </Container>
  );
};