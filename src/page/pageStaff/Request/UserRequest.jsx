import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Row, Col, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { UserRequestDetails1 } from "./UserRequestDetails";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import { Pagination } from "../../../component/Pagination/Pagination";
import { Status } from "../../../component/Status";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../../utils/constants/url";
import updateById from "../../../utils/updateAPI/updateById";
import dayjs from "dayjs";

export const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const [editRowId, setEditRowId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/evaluation-request/gett_all`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => Date.parse(b.requestDate) - Date.parse(a.requestDate)
        );
         for (let request of sortedData) {
          if (request.status === "Requesting" && dayjs().diff(request.requestDate, 'day') > 1) {
            const res = await updateById(`${API_BASE_URL}/evaluation-request/update`, request.requestId, 'status', 'Canceled');
            if (res && res.status === 'Canceled') {
              request.status = 'Canceled';
            } else {
              toast.error("Failed to auto-cancel request");
            }
          }
        }
        setUserRequest(sortedData);
        setFilteredRequests(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  //get order by request id
  const APIOrderById = `${API_BASE_URL}/order_request/getOrderByRequestId`;
  const checkExistId = async (requestId) => {
    try {
      const response = await fetch(`${APIOrderById}/${requestId}`);
      if (!response.ok) {
        return false;
      }
      // Check if the response body is empty
      const text = await response.text();
      if (!text) {
        return false;
      }
      const data = JSON.parse(text);
      console.log(data);
      if (data[0]?.requestId?.requestId === requestId) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking ID existence:", error);
      return false;
    }
  };

  // Update status
  const handleOnChangeStatus = async (user) => {
    const exists = await checkExistId(user.requestId);
    if (exists) {
      toast.error(
        "You have had an order, so you cannot update status at this time"
      );
      setEditRowId(null);
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluation-request/update/${user.requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: editStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequests = userRequest.map((request) =>
        request.requestId === user.requestId
          ? { ...request, status: editStatus }
          : request
      );
      setUserRequest(updatedRequests);
      setFilteredRequests(updatedRequests);
      setEditRowId(null);
      toast.success("Update status successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Search functionality
  const handleSearch = () => {
    const filtered = userRequest.filter(
      (request) =>
        request.requestId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.guestName.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm.toLowerCase().trim().replace(/\s+/g, ' '))||
        request.status.toString().toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  };
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // View details
  const viewDetails = (userRequestDetail) => {
    setCurrentDetail(userRequestDetail);
    setIsViewDetail(true);
  };

  if (loading) {
    return (
      <div className="text-center my-4" style={{ minHeight: "500px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <ToastContainer />
      {!isViewDetail ? (
        <>
          <h2 className="text-center my-4">USER REQUEST</h2>
          <div style={{ width: "80%", margin: "0 auto" }}>
            <Form className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search by ID or Guest Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="primary" onClick={handleSearch}>
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <Table striped bordered style={{ textAlign: "center" }}>
            <thead style={{ backgroundColor: "#E2FBF5" }}>
              <tr>
                <th>Request ID</th>
                <th>Customer Name</th>
                <th>Send Date</th>
                <th>Status</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((user) => (
                <tr key={user.requestId}>
                  <td>{user.requestId}</td>
                  <td>{user.guestName}</td>
                  <td>{formattedDate(user.requestDate)}</td>
                  <td className="d-flex">
                    {editRowId === user.requestId ? (
                      <>
                        <Form.Select
                          aria-label="Requested"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)} // Cập nhật editStatus khi thay đổi
                        >
                          <option value="Requesting" disabled>Requesting</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Canceled">Canceled</option>
                        </Form.Select>
                        <Button onClick={() => handleOnChangeStatus(user)}>
                          Save
                        </Button>
                      </>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <div>
                          <Status status={user.status} />
                        </div>
                        <i
                          className="bi bi-pencil"
                          style={{ height: 20, width: 20 }}
                          onClick={() => {
                            setEditRowId(user.requestId);
                            setEditStatus(user.status); // Cài đặt editStatus ban đầu
                          }}
                        ></i>
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      <Button
                        onClick={() => viewDetails(user)}
                        className=""
                        style={{ backgroundColor: "blue", color:'white' }}
                      >
                        View Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredRequests.length}
            paginate={paginate}
          />
        </>
      ) : (
        currentDetail && (
          <div>
            <i
              className="bi bi-arrow-90deg-left mt-3"
              onClick={() => setIsViewDetail(false)}
              style={{ cursor: "pointer", height: 40, width: 40 }}
            ></i>
            <UserRequestDetails1
              key={currentDetail.requestId}
              userRequestDetail={currentDetail}
              navigate={navigate}
            />
          </div>
        )
      )}
    </Container>
  );
};
