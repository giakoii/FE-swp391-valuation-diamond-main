import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDateTime from "../../../utils/formattedDate/formattedDateTime";
import updateById from "../../../utils/updateAPI/updateById";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Status } from "../../../component/Status";

const API_BASE_URL = "http://localhost:8080";

export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isFinishedOrder, setIsFinishedOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`
        );
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  const viewCertificate = (orderDetailId) => {
    navigate(`/staff/view-certificate/${orderDetailId}`)
  }


  const updateOrderStatus = async (status) => {
    try {
      await updateById(
        `${API_BASE_URL}/order_request/updateStatus`,
        orderId,
        "status",
        status
      );
      
      setOrderDetails((prevDetails) => 
        prevDetails.map((detail) => {
          if (detail.orderId.orderId === orderId) {
            return { ...detail, orderId: { ...detail.orderId, status: status } };
          }
          return detail;
        })
      );

      toast.success(`${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(`Failed to update order status to ${status}`);
    }
  };

  const showConfirmDialog = (e, status) => {
    e.preventDefault();
    confirmAlert({
      title: `Confirm to ${status}`,
      message: `Click ok to ${status.toLowerCase()} the order`,
      buttons: [
        {
          label: "Ok",
          onClick: () => updateOrderStatus(status),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <div className="text-center my-4" style={{ minHeight: "500px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Container>
        <div>
          <img
            src="/src/assets/assetsStaff/back.svg"
            alt=""
            onClick={() => {
              navigate("/staff/view-receipt");
            }}
          />
        </div>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.requestId?.requestId}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.customerName}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{orderDetails[0]?.orderId?.phone}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Status:</Col>
          <Col md={3}>
            <Status status={orderDetails[0]?.orderId?.status} />
          </Col>
        </Row>
        <Table>
          <thead>
            <tr className="text-center">
              <th>Sample Valuation Id</th>
              <th>Image</th>
              <th>Service</th>
              <th>Deadline</th>
              <th>Valuation Staff</th>
              <th>Size</th>
              <th>Diamond</th>
              <th>Status</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product) => (
              <tr key={product.orderDetailId} className="text-center">
                <td>{product.orderDetailId}</td>
                <td>
                  <img src={product.img} alt="" height="80" width="80" />
                </td>
                <td>{product.serviceId.serviceType}</td>
                <td>{formattedDateTime(product.receivedDate)}</td>
                <td>{product.evaluationStaffId}</td>
                <td>{product.size}</td>
                <td>{product.isDiamond ? "Yes" : "No"}</td>
                <td>
                  <Status status={product.status} />
                </td>
                <td>{product.unitPrice}</td>
                <td>
                  <Button
                    onClick={() => viewCertificate(product.orderDetailId)}
                    disabled={product.status !== "Finished"}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end my-4">
          <Button
            style={{ margin: "0px 13px" }}
            onClick={(e) => showConfirmDialog(e, "Finished")}
          >
            {!isFinishedOrder ? "Finished" : "Finish Order"}
          </Button>
          <Button
            style={{ margin: "0px 13px" }}
            onClick={(e) => showConfirmDialog(e, "Sealed")}
          >
            {!isFinishedOrder ? "Sealed" : "Seal Order"}
          </Button>
          <Button
            style={{ margin: "0px 13px" }}
            onClick={() => {
              navigate("/staff/commitment", { state: { orderDetails } });
            }}
          >
            Create Commitment
          </Button>
        </div>
      </Container>
    </div>
  );
};
