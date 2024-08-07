import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import formattedDate from '../../../utils/formattedDate/formattedDate';
import formattedDateTime from '../../../utils/formattedDate/formattedDateTime';
import { Pagination } from '../../../component/Pagination/Pagination';
import { API_BASE_URL } from '../../../utils/constants/url';

export const CommitmentList = () => {
  const [commitment, setCommitment] = useState([]);  
// search
  const [filteredCommitment, setFilteredCommitment] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
// 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(6); 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await fetch(`${API_BASE_URL}/committed_Paper/getCommittedPaper`); 
        const data = await response.json();  
        setCommitment(data.reverse());
        setFilteredCommitment(data); 
        setLoading(false); 
      } catch (error) { 
        console.error('Error fetching data:', error); 
        setError('Error fetching data'); 
        setLoading(false); 
      } 
    }; 
    fetchData(); 
  }, []); 

  const handleSearch = () => { 
    const filtered = commitment.filter((item) => 
      item.committedId.toString().includes(searchTerm)|| 
      item.civilId.toString().includes(searchTerm)||  
      item.orderId.toString().includes(searchTerm) 
    ); 
    setFilteredCommitment(filtered); 
    setCurrentPage(1); 
  }; 

  const viewCommitmentDetail = (committedId) => { 
    navigate(`/staff/commitment-list/${committedId}`); 
  }; 

  if (loading) { 
     return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  } 

  if (error) {  
     return <div className="text-center my-4" style={{ minHeight: '500px' }}><Alert variant="danger">{error}</Alert></div>;
  } 
  const indexOfLastPost = currentPage * postsPerPage; 
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentCommitment = filteredCommitment.slice(indexOfFirstPost, indexOfLastPost );
 
   const paginate = (number) => setCurrentPage(number);
 
   return (
     <Container>
       <h2 className="text-center my-4">Valuation Report List</h2>
       <div className="justify-content-center" style={{ width: '80%', margin: '0 auto' }}>
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
               <Button variant="primary" 
               style={{
                backgroundColor: "blue",
                color: "white",
                transition: "background-color 0.3s ease, color 0.3s ease", // Hiệu ứng chuyển đổi màu
                border: "none", // Xóa đường viền
               }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "green"; // Màu nền khi hover
                e.target.style.color = "white"; // Màu chữ khi hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "blue"; // Reset màu nền khi không hover
                e.target.style.color = "white"; // Reset màu chữ khi không hover
              }}
              onClick={handleSearch}>
                Search 
              </Button> 
            </Col> 
          </Row>
        </Form> 
      </div> 
      <Table striped bordered hover responsive className="text-center"> 
        <thead style={{ backgroundColor: '#E2FBF5' }}> 
          <tr> 
            <th>Commitment ID</th> 
            <th>Customer Name</th> 
            <th>Date</th> 
            
             <th></th>
          </tr> 
        </thead>
         <tbody>
           {currentCommitment.map((result) => (
             <tr key={result.committedId}>
               <td>{result.committedId}</td>
              <td>{result.committedName}</td>
               <td>{formattedDate(result.committedDate)}</td>
               <td>
                 <Button
                   style={{
                     backgroundColor: "blue",
                     color: "white",
                    transition: "background-color 0.3s ease, color 0.3s ease", // Hiệu ứng chuyển đổi màu
                     border: "none", // Xóa đường viền
                   }}
                   variant="info"
                   onMouseOver={(e) => {
                     e.target.style.backgroundColor = "green"; // Màu nền khi hover
                     e.target.style.color = "white"; // Màu chữ khi hover
                   }}
                   onMouseOut={(e) => {
                     e.target.style.backgroundColor = "blue"; // Reset màu nền khi không hover
                     e.target.style.color = "white"; // Reset màu chữ khi không hover
                   }}
                   onClick={() => viewCommitmentDetail(result.committedId)}
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
        totalPosts={filteredCommitment.length} 
        paginate={paginate} 
      /> 
    </Container> 
  ); 
};  
 
export default CommitmentList; 
