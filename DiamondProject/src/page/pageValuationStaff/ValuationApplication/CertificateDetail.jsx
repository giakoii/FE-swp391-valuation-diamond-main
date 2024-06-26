import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

export const CertificateDetail = () => {
  const location = useLocation();
  const { result } = location.state;
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imgUpload, setImgUpload] = useState(null)

  const [resultEdit, setResultEdit] = useState({
    diamondOrigin: result.diamondOrigin,
    measurements: result.measurements,
    proportions: result.proportions,
    shapeCut: result.shapeCut,
    caratWeight: result.caratWeight,
    color: result.color,
    clarity: result.clarity,
    cut: result.cut,
    symmetry: result.symmetry,
    polish: result.polish,
    fluorescence: result.fluorescence,
    description: result.description,
    price: result.price,
    img: result.img,
  });

  const showConfirmUpdate = (e) => {
    e.preventDefault();
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
          onClick: () => {},
        },
      ],
    });
  };

  const updateResult = async () => {
    let imageUrl = resultEdit.img;
    if (imgUpload) {
      imageUrl = await saveImage();
      if (!imageUrl) {
        return;
      }
    }
    const formattedResult = {
      ...resultEdit,
      caratWeight: parseFloat(resultEdit.caratWeight),
      price: parseFloat(resultEdit.price),
      img: imageUrl
    };

    try {
      const response = await fetch(
        `http://localhost:8080/evaluation_results/updateEvaluationResult/${result.evaluationResultId}`,
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
    setResultEdit((currentState) => ({ ...currentState, [name]: value }));
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

  return (
    <Container>
      <div className="mb-4">
        <img
          src="/src/assets/assetsStaff/back.svg"
          alt="Back"
          onClick={() => {
            navigate("/valuation-staff/valuation-order");
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
      <h1 className="text-center my-3">Diamond Valuation Report</h1>
      <Row className="justify-content-center">
        <Col md={6} className="text-center w-100 fw-bold">
          <Form.Label className="mb-2">Certificate ID:</Form.Label>
        </Col>
        <Col md={6} className="text-center w-100 fw-bold">
          <p>{result.evaluationResultId}</p>
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
                  value={resultEdit.diamondOrigin}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="Natural">Natural</option>
                  <option value="Lab Grown">Lab Grown</option>
                </select>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="measurements">Measurements</label>
              </Col>
              <Col md={5}>
                <input
                  type="text"
                  id="measurements"
                  name="measurements"
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  value={resultEdit.measurements || ""}
                  onChange={handleOnChange}
                />
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="shapeCut">Shape Cut</label>
              </Col>
              <Col md={5}>
                <select
                  id="shapeCut"
                  name="shapeCut"
                  value={resultEdit.shapeCut || ""}
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
                  <option value="Heart">Heart</option>
                  <option value="Princess">Princess</option>
                </select>
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
                  name="description"
                  value={resultEdit.description}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                />
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
                  id="caratWeight"
                  name="caratWeight"
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  value={resultEdit.caratWeight || ""}
                  onChange={handleOnChange}
                />
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
                  value={resultEdit.color || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="K">K</option>
                  <option value="J">J</option>
                  <option value="I">I</option>
                  <option value="H">H</option>
                  <option value="G">G</option>
                  <option value="F">F</option>
                </select>
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
                  value={resultEdit.clarity || ""}
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
                  value={resultEdit.cut || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="FAIR">FAIR</option>
                  <option value="GOOD">GOOD</option>
                  <option value="V.GOOD">V.GOOD</option>
                  <option value="EX.">EX.</option>
                </select>
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
                  name="polish"
                  value={resultEdit.polish || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="FAIR">FAIR</option>
                  <option value="GOOD">GOOD</option>
                  <option value="V.GOOD">V.GOOD</option>
                  <option value="EX.">EX.</option>
                </select>
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
                  value={resultEdit.symmetry || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="FAIR">FAIR</option>
                  <option value="GOOD">GOOD</option>
                  <option value="V.GOOD">V.GOOD</option>
                  <option value="EX.">EX.</option>
                </select>
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
                  value={resultEdit.fluorescence || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                >
                  <option value=""></option>
                  <option value="VSTG">VSTG</option>
                  <option value="STG">STG</option>
                  <option value="MED">MED</option>
                  <option value="FNT">FNT</option>
                  <option value="NON">NON</option>
                </select>
              </Col>
            </Row>
            <Row className="mb-2 align-items-end justify-content-between">
              <Col md={4}>
                <label htmlFor="proportions">Proportion</label>
              </Col>
              <Col md={5}>
                <input
                  type="text"
                  id="proportions"
                  name="proportions"
                  value={resultEdit.proportions}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                />
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
                  name="price"
                  value={resultEdit.price || ""}
                  style={{
                    border: "none",
                    borderBottom: "solid",
                    width: "100%",
                  }}
                  onChange={handleOnChange}
                />
              </Col>
            </Row>
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
                  src={image || resultEdit.img}
                  alt="product-img"
                  height="300"
                  className="border border-dark w-75"
                />
           
            </div>
            <div className="d-flex justify-content-center">
              <input type="file" name="" id="" onChange={handleOnchangeImage} />
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
