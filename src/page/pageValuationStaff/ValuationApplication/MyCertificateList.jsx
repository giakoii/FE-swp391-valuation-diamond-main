import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { Pagination } from "../../../component/Pagination/Pagination";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../utils/hook/useAuth";
import { API_BASE_URL } from "../../../utils/constants/url";
import dayjs from "dayjs";

export const MyCertificateList = () => {
  //get certificate list
  const [certificateList, setCertificateList] = useState([]);
  const [filter, setFilter] = useState([])
  const navigate = useNavigate();
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current requests
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCertificate = filter.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const viewCertificateDetail = (result) => {
    navigate(`/valuation-staff/certificate-list/${result.evaluationResultId}`, { state: { result } })
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/evaluation_results/getEvaluationResultsByUserId/${user.userId}`
        );
        const data = await response.json();
        const sortedData = data.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate));
        setCertificateList(sortedData);
        setFilter(sortedData)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4" style={{ minHeight: "500px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  const handleSearch = ()=>{
    const filtered = certificateList.filter(
      (sample)=> sample.evaluationResultId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.orderDetailId.orderDetailId.toString().toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
      // search by date
      dayjs(sample.createDate).format("DD/MM/YYYY").includes(searchTerm.trim())
    );
    setFilter(filtered)
    setCurrentPage(1)
  }
  return (
    <div>

      <Container>
        <div>
          <h1 className="text-center my-4">Certificate List</h1>
        </div>
        <div style={{ width: "80%", margin: "0 auto" }}>
            <Form className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search by Certificate ID or Date "
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
        <Table>
          <thead>
            <tr>
              <th>Certificate Id</th>
              <th>Sample Image</th>
              <th>Create Date</th>
              <th>Sample Id</th>
              <th>View Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentCertificate.map((result) => (
              <tr key={result.evaluationResultId}>
                <td>{result.evaluationResultId}</td>

                <td>
                  <img src={result.img} alt="" width="100px" height="100px" />
                </td>
                <td>{formattedDate(result.createDate)}</td>
                <td>{result.orderDetailId.orderDetailId}</td>
                <td>
                  <Button
                    style={{ backgroundColor: "#7CF4DE", color: "#333" }}
                    size="md"
                    onClick={() => viewCertificateDetail(result)}
                  >
                    <i className="bi bi-pencil"
                      style={{ height: 20, width: 20 }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filter.length}
          paginate={paginate}
        />
      </Container>
    </div>
  );
};
