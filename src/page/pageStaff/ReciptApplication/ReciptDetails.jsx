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
import getColorTime from "../../../utils/hook/getTimeColor";
import { API_BASE_URL } from "../../../utils/constants/url";
import getExpiredDateMax from "../../../utils/hook/getExpiredDateMax";


export const ReceiptDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isOrder, setIsOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  // get order detail by order id
  const fetchData = async () => {
    try {
      const [orderResponse, orderDetailsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/order_request/getOrder/${orderId}`),
        fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`)
      ]);


      if (!orderResponse.ok || !orderDetailsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const orderData = await orderResponse.json();
      const orderDetailsData = await orderDetailsResponse.json();
      setOrderDetails(orderDetailsData);

      const updatedOrder = await updateOrderStatus(orderData, orderDetailsData);
      setOrder(updatedOrder);
      setIsOrder(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const updateOrderStatus = async (order, orderDetails) => {
    const allFinished = orderDetails?.every((detail) => detail.status === 'Finished');
    const expiredDateMax = getExpiredDateMax(orderDetails);
    const now = new Date();

    if (allFinished && (order.status !== 'Finished' && order.status !== 'Sealed')) {
        await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Completed');
        order.status = 'Completed';
    } 
    if (expiredDateMax && expiredDateMax < now && (order.status === 'Completed')) {
        console.log('Updating status to Sealed for order:', order.orderId);
        await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Sealed');
        order.status = 'Sealed';
    }
    return order;
};


  useEffect(() => {
    fetchData();
  }, [orderId]);

  const viewCertificate = (orderDetailId) => {
    navigate(`/staff/view-certificate/${orderDetailId}`);
  };
  const createCommitment = async () => {
    if (order?.status === 'In_Progress') {
      toast.error('Your order have not completed')
      return;
    }
    navigate(`/staff/commitment/${order?.orderId}`, { state: { orderDetails } });

  };

  const updateStatus = async (status) => {
    try {
      await updateById(
        `${API_BASE_URL}/order_request/updateStatus`,
        orderId,
        "status",
        status
      );

      // setOrderDetails((prevDetails) =>
      //   prevDetails.map((detail) => {
      //     if (detail.orderId.orderId === orderId) {
      //       return { ...detail, orderId: { ...detail.orderId, status: status } };
      //     }
      //     return detail;
      //   })
      // );
      setOrder((currentState)=>({...currentState,status:'Finished'}))


      toast.success(`${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(`Failed to update order status to ${status}`);
    }
  };

  const showConfirmDialog = (e, status) => {

    if (order?.status === 'In_Progress') {
      toast.error('Your order have not completed')

      return;
    }
    e.preventDefault();
    confirmAlert({
      title: `Confirm to ${status}`,
      message: `Click ok to ${status.toLowerCase()} the order`,
      buttons: [
        {
          label: "Ok",
          onClick: () => updateStatus(status),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  if (loading) {
    return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  }

  return (
    <div>
      <ToastContainer />
      <Container>
        <div>
          <img
            src="/assets/assetsStaff/back.svg"
            alt=""
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{order?.requestId?.requestId}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{order?.customerName}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{order?.phone}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Status:</Col>
          <Col md={3}>

            <Status status={order?.status === 'In_Progress' ? 'In-Progress' :order?.status} />

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

                <td style={{ backgroundColor: product.status === 'Finished' ? "none" : getColorTime(orderDetails[0]?.orderId?.orderDate, product.receivedDate) }}>{formattedDateTime(product.receivedDate)}</td>

                <td>{product.evaluationStaffId}</td>
                <td>{product.size}</td>
                <td>{product.isDiamond ? "Diamond" : "Not a diamond"}</td>
                <td>
                  <Status
                    status={
                      product.status === "In_Progress"
                        ? "In-Progress"
                        : product.status
                    }
                  />
                </td>
                <td>{product.unitPrice}</td>
                <td>
                  <Button
                    onClick={() => viewCertificate(product.orderDetailId)}

                    disabled={product.status !== "Finished" || !product.isDiamond}

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

            disabled={order?.status === 'Finished'}
          >
            Finish Order
          </Button>
          <Button
            style={{ margin: "0px 13px" }}
            onClick={createCommitment}
          >

            Create Commitment
          </Button>
        </div>
      </Container>
    </div>
  );
};