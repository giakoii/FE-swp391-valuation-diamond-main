import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Pagination } from "../../../component/Pagination/Pagination";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../utils/hook/useAuth";

export const MyCertificateList = () => {
  //get certificate list
  const [certificateList, setCertificateList] = useState([]);
  const navigate = useNavigate();
  const {user} = useAuth()
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current requests
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCertificate = certificateList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const viewCertificateDetail = (result)=>{
    navigate(`/valuation-staff/certificate-list/${result.evaluationResultId}`, {state:{result}} )
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/evaluation_results/getEvaluationResultsByUserId/${user.userId}`
        );
        const data = await response.json();
        setCertificateList(data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (!loading) {
    return (
      <div className="text-center my-4" style={{ minHeight: "500px" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>

      <Container>
        <div>
          <h1 className="text-center my-4">Certificate List</h1>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Certificate Id</th>
              <th>Sample Image</th>
              <th>Create Date</th>
              <th>Product Id</th>
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
                <td>{formattedDate(result.orderDetailId.expiredReceivedDate)}</td>
                <td>{result.orderDetailId.orderDetailId}</td>
                <td>
                  <Button 
                  style={{backgroundColor:"#7CF4DE" , color:"#333" }} 
                  size="md"
                  onClick={()=>viewCertificateDetail(result)}
                  >
                    <img 
                     src="/src/assets/assetsStaff/editStatus.svg"
                     alt="Upload Icon"
                     height='20'
                     width='20'
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={certificateList.length}
          paginate={paginate}
        />
      </Container>
    </div>
  );
};
