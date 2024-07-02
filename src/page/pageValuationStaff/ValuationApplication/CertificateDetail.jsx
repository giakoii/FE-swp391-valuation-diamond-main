import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Form, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { API_BASE_URL } from "../../../utils/constants/url";

export const CertificateDetail = () => {
  // const location = useLocation();
  // const { result } = location.state;

  const navigate = useNavigate();
  // image
  const [image, setImage] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);

  const { evaluationResultId } = useParams()
  // 
  const [priceMarket, setPriceMarket] = useState({})
  const [loading, setLoading] = useState(true);
  // default get from api
  const [resultDefault, setResultDefault] = useState({})
  // console.log(resultEdit);
  console.log('result default out side:', resultDefault)

  // validation
  const [validationErrors, setValidationErrors] = useState({
    diamondOrigin: "",
    measurements: "",
    proportions: "",
    shapeCut: "",
    description: "",
    caratWeight: "",
    color: "",
    clarity: "",
    cut: "",
    symmetry: "",
    polish: "",
    fluorescence: "",
    price: "",
  });
  const [marketPrice, setMarketPrice] = useState({
    diamondOrigin: "",
    shape: "",
    color: "",
    clarity: "",
    caratWeight: "",
    cut: "",
    symmetry: "",
    polish: "",
    fluorescence: "",
  });

  // get evaluation result by evaluation result id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/evaluation_results/getEvaluationResults/${evaluationResultId}`);
        const data = await response.json();
        setResultDefault(data)
        setMarketPrice({
          diamondOrigin: data.diamondOrigin === 'Lab Grown' ? 'Lab' : 'Natural',
          shape: data.shapeCut,
          color: data.color,
          clarity: data.clarity,
          caratWeight: data.caratWeight,
          cut: data.cut,
          symmetry: data.symmetry,
          polish: data.polish,
          fluorescence: data.fluorescence,
        });
        console.log('default result in useEffect:', data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [evaluationResultId]);

  if (loading) {
    return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  }

  console.log(marketPrice)

  const validateForm = () => {
    const errors = {};
    if (!resultDefault.diamondOrigin) {
      errors.diamondOrigin = "Diamond origin is required";
    }
    if (!resultDefault.measurements) {
      errors.measurements = "Measurements are required";
    }

    if (!resultDefault.shapeCut) {
      errors.shapeCut = "Shape cut is required";
    }
    if (!resultDefault.description) {
      errors.description = "Description is required";
    }
    if (resultDefault.description.length > 100 || resultDefault.description.length < 5) {
      errors.description = "Description must include 5 and 100 character";
    }
    if (!resultDefault.caratWeight) {
      errors.caratWeight = "Carat weight is required";
    }
    if (Number.parseFloat(resultDefault.caratWeight) <= 0) {
      errors.caratWeight = "Carat weight must have positive";
    }
    if (!resultDefault.color) {
      errors.color = "Color grade is required";
    }

    if (!resultDefault.clarity) {
      errors.clarity = "Clarity grade is required";
    }
    if (!resultDefault.cut) {
      errors.cut = "Cut grade is required";
    }

    if (!resultDefault.symmetry) {
      errors.symmetry = "Symmetry  is required";
    }
    if (!resultDefault.polish) {
      errors.polish = " Polish is required";
    }

    if (!resultDefault.proportions) {
      errors.proportions = "Proportions is required";
    }
    if (!resultDefault.fluorescence) {
      errors.fluorescence = "Fluorescence is required";
    }
    if (!resultDefault.price) {
      errors.price = "Price is required";
    }
    if (Number.parseFloat(resultDefault.price) <= 500) {
      errors.price = "Price must have greater than 500 dollars ";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  console.log(validateForm)
  const showConfirmUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      confirmAlert({
        title: "Confirm to update",
        message: "Click ok to update the valuation result",
        buttons: [
          {
            label: "Ok",
            onClick: () => updateResult(),
          },
          {
            label: "Cancel",
            onClick: () => { },
          },
        ],
      });
    }

  };
  // update result
  const updateResult = async () => {
    let imageUrl = resultDefault.img;
    if (imgUpload) {
      imageUrl = await saveImage();
      if (!imageUrl) {
        return;
      }
    }
    const formattedResult = {
      diamondOrigin: resultDefault.diamondOrigin,
      measurements: resultDefault.measurements,
      proportions: resultDefault.proportions,
      shapeCut: resultDefault.shapeCut,
      color: resultDefault.color,
      clarity: resultDefault.clarity,
      cut: resultDefault.cut,
      symmetry: resultDefault.symmetry,
      polish: resultDefault.polish,
      fluorescence: resultDefault.fluorescence,
      description: resultDefault.description,
      caratWeight: parseFloat(resultDefault.caratWeight),
      price: parseFloat(resultDefault.price),
      img: imageUrl
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation_results/updateEvaluationResult/${resultDefault.evaluationResultId}`,
        {
          method: "PUT",
          body: JSON.stringify(formattedResult),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        toast.success("Update successfully");
        // navigate("/valuation-staff/certificate-list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update error");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setResultDefault((currentState) => ({ ...currentState, [name]: value }));
    setValidationErrors((currentState) => ({ ...currentState, [name]: "" }));

    if (name === "diamondOrigin") {
      setMarketPrice((currentState) => ({
        ...currentState,
        isLabGrown: value === 'Lab Grown'
      }));
    } else if (name === "shapeCut") {
      setMarketPrice((currentState) => ({
        ...currentState,
        shape: value
      }));
    } else {
      setMarketPrice((currentState) => ({ ...currentState, [name]: value }));
    }
  };
  const handleOnchangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const imageUrl = URL.createObjectURL(img);
      setImage(imageUrl);
      setImgUpload(img);
    }
  };

  // add image into cloudinary
  const saveImage = async () => {
    if (!imgUpload) {
      return;
    }
    const data = new FormData();
    data.append("file", imgUpload);
    data.append("upload_preset", "diamondValuation");
    data.append("cloud_name", "dz2dv8lk4");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dz2dv8lk4/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await res.json();
      return cloudData.url;
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
      return null;
    }
  };

  // view market price
  const viewMarketPrice = () => {
    const queryParams = new URLSearchParams(marketPrice).toString();
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/getDB2/calculate/price?${queryParams}`
        );
        const data = await response.json();
        setPriceMarket(data);

        console.log(data)
      } catch (error) {
        setError(error);
      } finally {

      }
    };
    fetchData();

  }

  return (
    <Container>
      <div className="mb-4">
        {/* <img
          src="/src/assets/assetsStaff/back.svg"
          alt="Back"
          onClick={() => {
            navigate("/valuation-staff/certificate-list");
          }}
          style={{ cursor: "pointer" }}
        /> */}
        <i className="bi bi-arrow-90deg-left"
          onClick={() => {
            navigate("/valuation-staff/certificate-list");
          }}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      <ToastContainer />
      <h1 className="text-center my-3">Diamond Valuation Report</h1>
      <Row className="justify-content-center">
        <Col md={6} className="text-center w-100 fw-bold">
          <Form.Label className="mb-2">Certificate ID:</Form.Label>
        </Col>
        <Col md={6} className="text-center w-100 fw-bold">
          <p>{resultDefault.evaluationResultId}</p>
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
                <Form.Control
                  as="select"
                  id="diamondOrigin"
                  name="diamondOrigin"
                  value={resultDefault.diamondOrigin}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.diamondOrigin}
                  onChange={handleOnChange}
                >

                  <option value="Natural">Natural</option>
                  <option value="Lab Grown">Lab Grown</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.diamondOrigin}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="measurements">Measurements</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type="text"
                  id="measurements"
                  name="measurements"
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.measurements}
                  value={resultDefault.measurements || ""}
                  onChange={handleOnChange}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.measurements}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="shapeCut">Shape Cut</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="shapeCut"
                  name="shapeCut"
                  value={resultDefault.shapeCut || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.shapeCut}
                >

                  <option value="Round">Round</option>
                  <option value="Cushion">Cushion</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Oval">Oval</option>
                  <option value="Pear">Pear</option>
                  <option value="Princess">Princess</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.shapeCut}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="description">Description</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type="text"
                  id="description"
                  name="description"
                  value={resultDefault.description}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.description}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
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
                <Form.Control
                  type="number"
                  min={0}
                  id="caratWeight"
                  name="caratWeight"
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  value={resultDefault.caratWeight || ""}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.caratWeight}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.caratWeight}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="color">Color Grade</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="color"
                  name="color"
                  value={resultDefault.color || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.color}
                >
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="G">G</option>
                  <option value="F">F</option>
                  <option value="I">I</option>
                  <option value="H">H</option>
                  <option value="J">J</option>
                  <option value="K">K</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.color}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="clarity">Clarity Grade</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="clarity"
                  name="clarity"
                  value={resultDefault.clarity || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.clarity}
                  onChange={handleOnChange}
                >

                  <option value="SI2">SI2</option>
                  <option value="SI1">SI1</option>
                  <option value="VS2">VS2</option>
                  <option value="VS1">VS1</option>
                  <option value="VVS2">VVS2</option>
                  <option value="VVS1">VVS1</option>
                  <option value="IF">IF</option>
                  <option value="FL">FL</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.clarity}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="cut">Cut Grade</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="cut"
                  name="cut"
                  value={resultDefault.cut || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.cut}
                  onChange={handleOnChange}
                >

                  <option value="Fair">FAIR</option>
                  <option value="Good">GOOD</option>
                  <option value="Very Good">V.GOOD</option>
                  <option value="Excellent">EX.</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.cut}</Form.Control.Feedback>
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
                <Form.Control
                  as="select"
                  id="polish"
                  name="polish"
                  value={resultDefault.polish || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.polish}
                  onChange={handleOnChange}
                >

                  <option value="Fair">FAIR</option>
                  <option value="Good">GOOD</option>
                  <option value="Very Good">V.GOOD</option>
                  <option value="Excellent">EX.</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.polish}</Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="symmetry">Symmetry</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="symmetry"
                  name="symmetry"
                  value={resultDefault.symmetry || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.symmetry}
                >

                  <option value="Fair">FAIR</option>
                  <option value="Good">GOOD</option>
                  <option value="Very Good">V.GOOD</option>
                  <option value="Excellent">EX.</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.symmetry}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="fluorescence">Fluorescence</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  as="select"
                  id="fluorescence"
                  name="fluorescence"
                  value={resultDefault.fluorescence || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  isInvalid={!!validationErrors.fluorescence}
                  onChange={handleOnChange}
                >

                  <option value="Very Strong">VSTG</option>
                  <option value="Strong">STG</option>
                  <option value="Medium">MED</option>
                  <option value="Faint">FNT</option>
                  <option value="None">NON</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{validationErrors.fluorescence}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="proportions">Proportion</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type="text"
                  id="proportions"
                  name="proportions"
                  value={resultDefault.proportions}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.proportions}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.proportions}</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="price">Estimate Price</label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type="number"
                  id="price"
                  name="price"
                  min={0}
                  value={resultDefault.price || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                    borderRadius: "0px"
                  }}
                  onChange={handleOnChange}
                  isInvalid={!!validationErrors.price}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.price}</Form.Control.Feedback>
              </Col>
            </Row>
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
                  {priceMarket.basePrice ? `$${Math.round(priceMarket.baseFinalPrice)}` : 0}
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
              Product Image
            </h4>
            <div className="my-3 d-flex justify-content-center">

              <img
                src={image || resultDefault.img}
                alt="product-img"
                height="300"
                className="border border-dark w-75"
              />

            </div>
            <div className="d-flex justify-content-center">
              <input type="file" name="" id="" onChange={handleOnchangeImage} accept=".jpg, .jpeg, .png" />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end my-4">
        <Button className="btn btn-danger me-4" onClick={showConfirmUpdate}>
          Update
        </Button>
      </div>
    </Container>
  );
};
