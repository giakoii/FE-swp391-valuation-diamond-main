import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import formattedDateTime from '../../../utils/formattedDate/formattedDateTime';
import './ManageSchedule.css';
import { Pagination } from 'react-bootstrap';
import { useSchedule } from '../../../contexts/AuthContext/ScheduleContext.jsx';

export const ManageSchedule = () => {
  const [dataManage, setDataManage] = useState([]);
  const [evaluationStaffIds, setEvaluationStaffIds] = useState([]);
  const [selectedEvaluationStaff, setSelectedEvaluationStaff] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { setManageScheduleCount } = useSchedule();

  // Fetch orderDetail data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/order_detail_request/getOrderDetailByEvaluationStaffIsNull');
      const data = await response.json();
      setDataManage(data);
      setManageScheduleCount(data.length);
    } catch (error) {
      console.error('Error fetching data:', error);  
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChangeValuationStaff = (orderDetailId, value) => {
    setSelectedEvaluationStaff((prevState) => ({
      ...prevState,
      [orderDetailId]: value,
    }));
  };

  const handleSendClick = async (orderDetailId) => {
    const evaluationStaffId = selectedEvaluationStaff[orderDetailId];

    if (!evaluationStaffId) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select Evaluation Staff',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/order_detail_request/updateAllOD/${orderDetailId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetailId, evaluationStaffId, status: 'assigned' }),
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
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = dataManage.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination handling
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination items
  let items = [];
  for (let number = 1; number <= Math.ceil(dataManage.length / itemsPerPage); number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
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
              <td>{data.status}</td>
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
