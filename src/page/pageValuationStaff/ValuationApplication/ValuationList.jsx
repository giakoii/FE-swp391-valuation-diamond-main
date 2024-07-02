import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import formattedDate from '../../../utils/formattedDate/formattedDate';
import { Pagination } from '../../../component/Pagination/Pagination';
import { RemakeGenerate } from '../RemakeValution/RemakeGenerate';
import { API_BASE_URL } from '../../../utils/constants/url';
// ROLE: CONSULTANT_STAFF
export const ValuationList = () => {
  const [valuationResult, setValuationRequest] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [filteredSelection, setFilteredSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentCertificate = filteredSelection.slice(indexOfFirstPost, indexOfLastPost);
  // change paginate
  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/evaluation_results/getEvaluationResults`);
        const data = await response.json();
        setValuationRequest(data);
        setFilteredSelection(data)
        setLoading(true)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  if (!loading) {
    return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  }

  const handleSearch = () => {
    const filteredData = valuationResult.filter(item => item.evaluationResultId.toString().includes(searchTerm)
    );
    setFilteredSelection(filteredData);
  }
  const handleOnPrint = (result) => {
    setSelectedResult(result);
    setIsPrint(true);
  };

  const handleGoBack = () => {
    setIsPrint(false);
    setSelectedResult(null);
  };

  return (
    <Container>
      {!isPrint ? (
        <>
          <h2 className="text-center my-4">Valuation Report List</h2>
          <div className='justify-content-center' style={{ width: '80%', margin: '0 auto' }}>
            <Form className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search by ID"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
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
          <Table striped bordered hover responsive className="text-center">
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Valuation ID</th>
                <th>Sample ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Valuation Staff</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {currentCertificate.map((result) => (
                <tr key={result.evaluationResultId}>
                  <td>{result.evaluationResultId}</td>
                  <td>{result.orderDetailId.orderDetailId}</td>
                  <td>{result.orderDetailId.orderId.customerName}</td>
                  <td>{formattedDate(result.orderDetailId.expiredReceivedDate)}</td>
                  <td>{result.userId.firstName + ' ' + result.userId.lastName}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleOnPrint(result)}
                    >
                      <img
                        src="/assets/assetsStaff/print.svg"
                        alt="Print"
                        width="20"
                        height="20"
                      />
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
        </>
      ) : (
        <div>
          <Row className="mt-3">
            <Col>
              <Button variant="secondary" onClick={handleGoBack}>
              <i className="bi bi-arrow-90deg-left"></i>
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <RemakeGenerate result={selectedResult} />
            </Col>
          </Row>
        </div>
      )}

    </Container>
  );
};

export default ValuationList;
