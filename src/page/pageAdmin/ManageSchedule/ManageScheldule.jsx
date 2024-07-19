import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import formattedDateTime from '../../../utils/formattedDate/formattedDateTime';
import './ManageSchedule.css';
import { Badge, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
import {Status} from '../../../component/Status.jsx'

export const ManageSchedule = () => {
  const [dataManage, setDataManage] = useState([]);
  const [evaluationStaffIds, setEvaluationStaffIds] = useState([]);
  const [selectedEvaluationStaff, setSelectedEvaluationStaff] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch orderDetail data
  const fetchData = async () => {
    try {
      const response = await fetch('https://valuation.techtheworld.id.vn/order_detail_request/getOrderDetailByEvaluationStaffIsNull');
      const data = await response.json();
      setDataManage(data);
    } catch (error) {
      console.error('Error fetching data:', error);  
    }
  };

  // Fetch evaluation staff IDs
  const fetchStaffIds = async () => {
    try {
      const response = await fetch('https://valuation.techtheworld.id.vn/user_request/countOrderDetailByEvaluationStaffId');
      const data = await response.json();
      setEvaluationStaffIds(data);
    } catch (error) {
      console.error('Error fetching staff IDs:', error);
    }
  };

  useEffect(() => {
    fetchStaffIds();
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
      const response = await fetch(`https://valuation.techtheworld.id.vn/order_detail_request/updateAllOD/${orderDetailId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetailId, evaluationStaffId, status: 'Assigned' }),
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
        fetchStaffIds();
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
      {dataManage.length === 0 ? (
        <p className="text-center">No data available</p>
      ) : (
        <Table striped bordered className="fs-5">
          <thead>
            <tr>
              <th>OrderDetailId</th>
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
                <td>{formattedDateTime(data.orderId.orderDate)}</td>
                <td>{data.serviceId.serviceType}</td>
                <td>
                  
                  <Status status={data.status === 'In_Progress' ? 'In-Progress' : data.status } /></td>
                <td>
                <DropdownButton
                    title={selectedEvaluationStaff[data.orderDetailId] ? selectedEvaluationStaff[data.orderDetailId] : 'Select Staff'}
                    onSelect={(value) => handleOnChangeValuationStaff(data.orderDetailId, value)}
                 variant="outline-secondary"
                    className="w-100 mx-3 "
                    size="md"
                  >
                    {evaluationStaffIds.map((staff) => (
                      <Dropdown.Item eventKey={staff.userId} key={staff.userId} className='w-100'>
                        <span className="select-option">
                          {staff.userId} <Badge bg="warning">{staff.count}</Badge>
                        </span>
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
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
      )}
      <Pagination className='d-flex justify-content-center'>{items}</Pagination>
    </>
  );
};
