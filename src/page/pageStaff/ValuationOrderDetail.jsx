import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formattedDateTime from "../../utils/formattedDate/formattedDateTime";
import useAuth from "../../utils/hook/useAuth";
import { Status } from "../../component/Status";
import { Pagination } from "../../component/Pagination/Pagination";
import getColorTime from "../../utils/hook/getTimeColor";
import { API_BASE_URL } from "../../utils/constants/url";

// ROLE: VALUATION STAFF

export const ValuationOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current requests
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrderDetails = orderDetails.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order_detail_request/getOrderDetailByEvaluationStaffId/${user.userId}`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => Date.parse(b.orderId.orderDate) - Date.parse(a.orderId.orderDate));
        setOrderDetails(sortedData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user.userId]);

  const handleCreateForm = (product) => {
    // check update isDiamond and image
    if(product.img === null){
      toast.error('Your sample must include image')
      return;
    }
    navigate(`/valuation-staff/valuation/${product.orderDetailId}`);
  };

  if (isLoading) {
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }

  return (
    <Container>
      <ToastContainer />
      <div className="text-center my-4">
        <h1>Valuation's Staff Product</h1>
      </div>
      <Table>
        <thead>
          <tr className="text-center">
            <th>Sample Id</th>
            <th>Image</th>
            <th>Service</th>
            <th>Dealine</th>
            <th>Size</th>
            <th>Diamond</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrderDetails.map((product) => (
            <tr key={product.orderDetailId} className="text-center">
              <td>{product.orderDetailId}</td>
              <td>
                <div>
                  {product.img ? (
                    <div>
                      <img src={product.img} alt="clarity-characteristics-upload" height='80' width='80' className='border border-dark' />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="upload-img">
                        <img
                          src="/src/assets/assetsStaff/upload.svg"
                          alt="Upload Icon"
                          height='40px'
                          width='40px'
                        />
                      </label>
                    </div>
                  )}
                </div>
              </td>
              <td>{product.serviceId.serviceType}</td>
              <td style={{ backgroundColor: getColorTime(product.orderId.orderDate, product.receivedDate) }}>{formattedDateTime(product.receivedDate)}</td>
              <td>{product.size}</td>
              <td>
                <div className="text-center">{product.isDiamond ? "Diamond" : "Not a diamond"}</div>   
                  {/* <div style={{ alignItems: "center" }}>
                    {(product.isDiamond === null || product.isDiamond === "") ? "Unknown" : (product.isDiamond ? "Diamond" : "Not a diamond")}
                  </div> */}
                
              </td>
              <td>
                <div><Status status={product.status} /></div>
              </td>
              <td>
                <Button onClick={() => handleCreateForm(product)} disabled={!product.isDiamond}>Create Certificate</Button>
              </td>
              <td>
                <img
                  src="/src/assets/assetsStaff/editStatus.svg"
                  alt="Upload Icon"
                  height='20'
                  width='20'
                  onClick={() => {
                    navigate(`/valuation-staff/valuation-order/${product.orderDetailId}`, { state: { product } })
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={orderDetails.length}
        paginate={paginate}
      />
    </Container>
  );
};
