import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import { Pagination } from "../../../component/Pagination/Pagination";
import { Status } from "../../../component/Status";
import { Spinner } from "react-bootstrap";
import updateById from "../../../utils/updateAPI/updateById";
import { API_BASE_URL } from "../../../utils/constants/url";
import getExpiredDateMax from "../../../utils/hook/getExpiredDateMax";


export const ViewReciptList = () => {
  const [selection, setSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSelection, setFilteredSelection] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current requests
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = filteredSelection.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch order details
  const fetchOrderDetails = async (orderId) => {
    const response = await fetch(
      `${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`
    );
    const data = await response.json();
    return data;
  };


  // Determine row color based on expired date
  
 
  // Update order details 
  const checkAndUpdateOrderStatus = async (orders) => { 
    for (const order of orders) { 
      const orderDetails = await fetchOrderDetails(order.orderId); 
      const maxDate = getExpiredDateMax(orderDetails);
      console.log("maxDate:", order.orderId, maxDate);
      const now = new Date();
      const allFinished = orderDetails.every( 
        (detail) => detail.status === "Finished" 
      ); 
      if ( 
        allFinished &&
        order.status !== "Finished" &&
        order.status !== "Sealed"
      ) {
        await updateById(
          `${API_BASE_URL}/order_request/updateStatus`,
          order.orderId,
          "status",
          "Completed"
          
        );
        order.status = "Completed";
      }
       if (maxDate && maxDate < now && order.status === "Completed"){
        await updateById(
          `${API_BASE_URL}/order_request/updateStatus`,
          order.orderId,
          "status",
          "Sealed"
        );
        order.status = "Sealed";

      }
    }

    return orders;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order_request/getOrders`);
        let data = await response.json();
        data = await checkAndUpdateOrderStatus(data);
        const sortedData = data.sort(
          (a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate)
        );
        setSelection(sortedData);
        setFilteredSelection(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = selection.filter(
      (item) =>
        item.orderId.toString().trim().includes(searchTerm.trim()) ||
        item.status
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
    );
    setFilteredSelection(filteredData);
    setCurrentPage(1);
  };

  
  const viewDetail = (item) => {
    navigate(`/staff/view-receipt/${item.orderId}`, { state: { item } });
  };

  if (loading) {
    return (
      <div className="text-center my-4" style={{ minHeight: "500px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return ( 
    <div className="container"> 
      <div 
        className="d-flex justify-content-center" 
        style={{ marginBottom: "50px", marginTop: "50px" }} 
      >
        <h1>View All Orders List</h1>
      </div>
      <div
        className="justify-content-center"
        style={{ width: "80%", margin: "0 auto" }}
      >
        <Form className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  border: "none",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "green";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "blue";
                  e.target.style.color = "white";
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <style>
        {`
          .centered-table th,
          .centered-table td {
            text-align: center;
            vertical-align: middle;
          }
        `}
      </style>
      <div>
        <Table striped bordered hover className="centered-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Created Date</th>
              <th>Product Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item) => (
              <tr key={item.orderId}>
                <td>
                  {item.orderId}
                </td>
                <td>{formattedDate(item.orderDate)}</td>
                <td>{item.diamondQuantity}</td>
                <td>
                  <Status status={item.status === 'In_Progress' ? 'In-Progress' : item.status} />
                </td>
                <td>
                  <Button
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      border: "none",
                    }}
                    variant="info"
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "green";
                      e.target.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "blue";
                      e.target.style.color = "white";
                    }}
                    onClick={() => viewDetail(item)}
                  >
                    View Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredSelection.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
export default ViewReciptList;