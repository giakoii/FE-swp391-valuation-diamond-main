import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import formattedDate from '../../../utils/formattedDate/formattedDate';
import { Pagination } from '../../../component/Pagination/Pagination';
import { Status } from '../../../component/Status';
import { Spinner } from 'react-bootstrap';
import updateById from '../../../utils/updateAPI/updateById';
import { API_BASE_URL } from '../../../utils/constants/url';


export const ViewReciptList = () => {
  const [selection, setSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSelection, setFilteredSelection] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current requests
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = filteredSelection.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //update order status is completed when order all finished is completed
  // get order details
  const fetchOrderDetails = async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`);
    const data = await response.json();
    return data;
  };
  // update order details
  const checkAndUpdateOrderStatus = async (orders) => {
    for (const order of orders) {
      const orderDetails = await fetchOrderDetails(order.orderId);
      const allFinished = orderDetails.every(detail => detail.status === 'Finished');
      if (allFinished && (order.status !== 'Finished' && order.status !== 'Sealed')) {
        await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Completed');
        order.status = 'Completed'; 
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
        const sortedData = data.sort((a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate));
        setSelection(sortedData);
        setFilteredSelection(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = selection.filter(item =>
      item.orderId.toString().includes(searchTerm)
    );
    setFilteredSelection(filteredData);
  };

  const viewDetail = (item) => {
    navigate(`/staff/view-receipt/${item.orderId}`, { state: { item } });
  };

  if (loading) {
    return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
  }

  return (
    <div className="container">
      <div className='d-flex justify-content-center' style={{ marginBottom: '50px', marginTop: '50px' }}>
        <h1>View Order List</h1>
      </div>
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
              <th>Date</th>
              <th>Product Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(item => (
              <tr key={item.orderId}>
                <td>{item.orderId}</td>
                <td>{formattedDate(item.orderDate)}</td>
                <td>{item.diamondQuantity}</td>
                <td><Status status={item.status} /></td>
                <td>
                  <Button variant="info" onClick={() => viewDetail(item)}>
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
