import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import formattedDateTime from '../../../utils/formattedDate/formattedDateTime';

import './ManageSchedule.css';
import { Pagination } from 'react-bootstrap';

export const ManageSchedule = () => {
  const [dataManage, setDataManage] = useState([]);
  const [evaluationStaffIds, setEvaluationStaffIds] = useState([]);
  const [selectedEvaluationStaff, setSelectedEvaluationStaff] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch orderDetail data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/order_detail_request/getOrderDetailByEvaluationStaffIsNull');
      const data = await response.json();
      setDataManage(data);
    } catch (error) {
      console.error('Error fetching data:', error);  
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Fetch evaluation staff IDs
  useEffect(() => {
    const fetchStaffIds = async () => {
      try {
        const response = await fetch('http://localhost:8080/user_request/getStaff');
        const data = await response.json();
        setEvaluationStaffIds(data);
      } catch (error) {
        console.error('Error fetching staff IDs:', error);
      }
    };

    fetchStaffIds();
  }, []);

  const handleOnChangeValuationStaff = (orderDetailId, value) => {
    setSelectedEvaluationStaff((prevState) => ({
      ...prevState,
      [orderDetailId]: value,
    }));
  };

  const handleOnChangeStatus = (orderDetailId, value) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [orderDetailId]: value,
    }));
  };

  const handleSendClick = async (orderDetailId) => {
    const evaluationStaffId = selectedEvaluationStaff[orderDetailId];
    const status = selectedStatus[orderDetailId];
    if (!evaluationStaffId || !status) return;

    try {
      const response = await fetch(`http://localhost:8080/order_detail_request/updateAllOD/${orderDetailId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetailId, evaluationStaffId, status }),
      });
      const data = await response.json();
      console.log(data);

      Swal.fire({
        title: 'Success!',
        text: 'Update successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        fetchData();
      });
    } catch (error) {
      console.error('Error updating evaluation ID:', error);
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = dataManage.slice(indexOfFirstPost, indexOfLastPost);       

  // Change page
const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= Math.ceil(dataManage.length / itemsPerPage); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={(event) => paginate(event, number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <h2 className="text-center p-4 my-4">Schedule Valuation Diamond</h2>

      <Table striped bordered className="fs-5">
        <thead>
          <tr>
            
            <th>OrderDetailId</th>
            <th>Image</th>
            <th>Order Date</th>
            
            <th>Type Service</th>
            <th>Status</th>
            <th>Evaluation Staff</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((data) => (
            <tr key={data.orderDetailId}>
            
              <td>{data.orderDetailId}</td>
              <td>{data.img}</td>
              <td>{formattedDateTime(data.orderId.orderDate)}</td>
             
              <td>{data.serviceId.serviceType}</td>
             
           
              <td>
                <Form.Select
                  onChange={(e) => handleOnChangeStatus(data.orderDetailId, e.target.value)}
                  value={selectedStatus[data.orderDetailId] || ''}
                >
                  <option value="">Select Status</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  onChange={(e) => handleOnChangeValuationStaff(data.orderDetailId, e.target.value)}
                  value={selectedEvaluationStaff[data.orderDetailId] || ''}
                >
                  <option value="">Select Staff</option>
                  {evaluationStaffIds.map((staff) => (
                    <option key={staff.userId} value={staff.userId}>
                      {staff.firstName + " " + staff.lastName}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button onClick={() => handleSendClick(data.orderDetailId)} className='btn text-light'>
                  SEND
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className='d-flex justify-content-center'>{items}</Pagination>
    </>
  );
};