import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../utils/constants/url";
import updateById from "../../utils/updateAPI/updateById";

const API = `${API_BASE_URL}/order_detail_request/getOrderDe`;
const APIUpdate = `${API_BASE_URL}/order_detail_request/updateAllOD`;

export const ValuationOrderDetailUpdate = () => {
  const { orderDetailId } = useParams();
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(!!product.img);
  const [image, setImage] = useState(product.img || null);
  // de luu file
  const [imageUpload, setImageUpload] = useState(null);

  const [formEdit, setFormEdit] = useState({
    status: product.status,
    isDiamond: product.isDiamond,
    img: product.img,
  });

  const saveImage = async () => {
    if (!imageUpload) {
      return null;
    }
    const data = new FormData();
    data.append("file", imageUpload);
    data.append("upload_preset", "diamondValuation");
    data.append("cloud_name", "dz2dv8lk4");
    data.append("secure", "true");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dz2dv8lk4/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await res.json();
      return cloudData.secure_url;
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${orderDetailId}`);
        const data = await response.json();
        setFormEdit({
          status: data.status,
          isDiamond: data.isDiamond,
          img: data.img,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderDetailId]);

  const handleFormChange = (field, value) => {
    setFormEdit((currentState) => ({ ...currentState, [field]: value }));
  };

  const handleOnchangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const imageUrl = URL.createObjectURL(img);
      setImage(imageUrl);
      setImageUpload(img);
      setShowImage(true);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUpload(null);
    setShowImage(false);
  };

  const handleSaveChanges = async () => {
    if(!image){
      toast.error('Image is required')
      return
    }
    let imageUrlD = formEdit.img;
    if (imageUpload) {
      imageUrlD = await saveImage();
      if (!imageUrlD) {
        return;
      }
    }

    try {
      const response = await fetch(`${APIUpdate}/${orderDetailId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formEdit, img: imageUrlD }),
      });
      const data = await response.json();
      if (data) {
        toast.success("Update successfully.");
        await updateById(APIUpdate,orderDetailId,'status','Finished' )
        navigate("/valuation-staff/valuation-order");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <ToastContainer />
      <div>
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
        <div className="text-center my-4">
          <h1>Edit Product</h1>
        </div>
        <div>
          <Row className="mb-4 justify-content-center">
            <Col md={2} className="text-end">
              Sample Id:
            </Col>
            <Col md={4}>{product.orderDetailId}</Col>
          </Row>
          <Row className="mb-4 justify-content-center">
            <Col md={2} className="text-end">
              <Form.Label>Is it Diamond?</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Select
                aria-label="Is Diamond"
                name="isDiamond"
                value={formEdit.isDiamond ? "true" : "false"}
                onChange={(e) =>
                  handleFormChange("isDiamond", e.target.value === "true")
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-4 justify-content-center">
            <Col md={2} className="text-end">
              <Form.Label>Image</Form.Label>
            </Col>
            <Col md={4}>
              {showImage ? (
                <div className="position-relative">
                  <img
                    className="w-100 h-100"
                    src={image || formEdit.img}
                    alt="img"
                  />
                  <div
                    className="position-absolute top-0 end-0 p-1"
                    style={{ cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                    onClick={handleRemoveImage}
                  >
                    <img
                      src="/assets/assetsStaff/remove.svg"
                      alt="Remove"
                      height="20px"
                      width="20px"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <label htmlFor="upload-img" style={{ cursor: "pointer" }}>
                    <img
                      src="/assets/assetsStaff/upload.svg"
                      alt="Upload Icon"
                      height="40px"
                      width="40px"
                    />
                  </label>
                  <input
                    type="file"
                    id="upload-img"
                    onChange={handleOnchangeImage}
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={{ span: 4, offset: 2 }} className="text-center ">
              <Button onClick={handleSaveChanges} className="w-100">
                Save Changes
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};
