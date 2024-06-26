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
  const [postsPerPage] = useState(6);
  const navigate = useNavigate();

  // Fetch user requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/evaluation-request/gett_all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserRequest(data.reverse());
        setFilteredRequests(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update status
  const handleOnChangeStatus = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/evaluation-request/update/${requestId}`,
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
        request.requestId === requestId ? { ...request, status: editStatus } : request
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
        request.requestId.toString().includes(searchTerm) ||
        request.guestName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-center my-4">User Request</h2>
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
          <Table striped bordered>
            <thead style={{ backgroundColor: "#E2FBF5" }}>
              <tr>
                <th>Request ID</th>
                <th>Guest Name</th>
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
                          <option value="Requested">Requested</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Canceled">Canceled</option>
                        </Form.Select>
                        <Button
                          onClick={() => handleOnChangeStatus(user.requestId)}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <div>
                          <Status status={user.status} />
                        </div>
                        <img
                          src="/src/assets/assetsAdmin/edit.svg"
                          alt="Edit"
                          height="20"
                          width="20"
                          onClick={() => {
                            setEditRowId(user.requestId);
                            setEditStatus(user.status); // Cài đặt editStatus ban đầu
                          }}
                        />
                      </div>
                    )}
                  </td>

                  <td>
                    <Button
                      onClick={() => viewDetails(user)}
                      className="btn text-dark"
                      style={{ backgroundColor: "#7CF4DE" }}
                    >
                      View Details
                    </Button>
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
            <img
              src="/src/assets/assetsStaff/back.svg"
              alt="go back"
              className="mt-3"
              height="40"
              width="40"
              onClick={() => setIsViewDetail(false)}
            />
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
