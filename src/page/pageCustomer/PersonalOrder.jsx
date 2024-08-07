import React, { useEffect, useState } from 'react';
import { Row, Col, Stack, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import formattedDateTime from '../../utils/formattedDate/formattedDateTime';
import { Pagination } from '../../component/Pagination/Pagination';
import { Status } from '../../component/Status';
import { API_BASE_URL } from '../../utils/constants/url';
import useAuth from '../../utils/hook/useAuth';
import getExpiredDateMax from '../../utils/hook/getExpiredDateMax';
import updateById from '../../utils/updateAPI/updateById';

export const PersonalOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
   
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentOrder = myOrder.slice(indexOfFirstPost, indexOfFirstPost + postsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchOrderDetails = async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`);
        const data = await response.json();
        return data;
    }
  
    const updateOrderStatus = async (orders) => {
        const orderPromise = orders.map(async (order) => {
            const orderDetails = await fetchOrderDetails(order.orderId);
            const allFinished = orderDetails.every((detail) => detail.status === 'Finished');
            const expiredDateMax = getExpiredDateMax(orderDetails);
            const now = new Date();
  
            if (allFinished && (order.status !== 'Finished' && order.status !== 'Sealed')) {
                await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Completed');
                order.status = 'Completed';
            } 
            if (expiredDateMax && expiredDateMax < now && (order.status === 'Completed')) {
                console.log('Updating status to Sealed for order:', order.orderId);
                await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status', 'Sealed');
                order.status = 'Sealed';
            }
            return order;
        });
  
        return Promise.all(orderPromise);
    }
  
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/order_request/getOrderByUserId/${user.userId}`);
                let data = await response.json();
                data = await updateOrderStatus(data);
                const sortedData = data.sort((a, b) => Date.parse(b.orderDate) - Date.parse(a.orderDate));
                setMyOrder(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-4" style={{ minHeight: '500px' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    const viewMyRequest = (order) => {
        navigate(`/my-order/${order.orderId}`, { state: { order } });
    };

    return (
        <div className='my-5' style={{ minHeight: '500px' }}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Order</h2>
            {currentOrder.length > 0 ? (
                <Stack gap={4}>
                    {currentOrder.map((order) => (
                        <Row key={order.orderId} className="justify-content-center w-50 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img
                                    src="https://res.cloudinary.com/dz2dv8lk4/image/upload/fl_preserve_transparency/v1719856194/logo_fyex4a.jpg?_s=public-apps"
                                    alt="Diamond"
                                    width="100"
                                    height="100"
                                />
                            </Col>
                            <Col mb={2}>
                                <Stack>
                                    <h4>{order.orderId}</h4>
                                    <div className='mb-1'><span className='fw-bold'>Service: </span>{order.requestId.service}</div>
                                    <div className='mb-2'><span className='fw-bold'>Order Date: </span>{formattedDateTime(order.orderDate)}</div>
                                    <div className='mb-1'>
                                        <span className='fw-bold'>Status: </span>
                                        <Status status={order.status === 'In_Progress' ? 'In-Progress' : order.status} />
                                    </div>
                                </Stack>
                            </Col>
                            <Col md={2}>
                                <Stack>
                                    <Button style={{ backgroundColor: '#CCFBF0' }} onClick={() => viewMyRequest(order)}>
                                        <span className='text-dark me-1'>View</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Button>
                                </Stack>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            ) : (
                <div className='text-center fw-bold fs-1'>You don't have request valuation yet</div>
            )}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={myOrder.length}
                paginate={paginate}
            />
        </div>
    );
}
