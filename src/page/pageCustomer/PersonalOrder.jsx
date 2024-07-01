
import React, { useEffect, useState } from 'react';
import { Row, Col, Stack, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import formattedDateTime from '../../utils/formattedDate/formattedDateTime';
import useAuth from '../../utils/hook/useAuth';
import { Pagination } from '../../component/Pagination/Pagination';
import { API_BASE_URL } from '../../utils/constants/url';
import updateById from '../../utils/updateAPI/updateById';

export const PersonalOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();
    const API = `${API_BASE_URL}/order_request/getOrders`;
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    // Get current requests
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentOrder = myOrder.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //update order status is completed when order all finished is completed
    // get order details
    const fetchOrderDetails = async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`)
        const data = await response.json()
        return data;
    }
    // update order details
    const updateOrderStatus = async (orders) => {
        for (const order of orders) {
            const orderDetails = await fetchOrderDetails(order.orderId);
            const allFinished = orderDetails.every(detail => detail.status === 'Finished');
            if (allFinished && (order.status !== 'Finished' && order.status !== 'Sealed')) {
                await updateById(`${API_BASE_URL}/order_request/updateStatus`, order.orderId, 'status','Completed')
            }
            order.status = 'Completed'
        }
        return orders
    }
    // get order by user id 
    //   tam thoi la get all

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}`);
                let data = await response.json();
                // update order when all details finished
                data = await updateOrderStatus(data)
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

    // get order by user id
    //   useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${API}/${user.userId}`);
    //             const data = await response.json();
    //             const sortedData = data.sort((a, b) => Date.parse(b.requestDate) - Date.parse(a.requestDate));
    //             setMyOrder(sortedData);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, [user.userId]);

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
                    {currentOrder.map((order, index) => (
                        <Row key={order.orderId} className="justify-content-center w-50 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img
                                    src="/src/assets/assetsCustomer/logo.png"
                                    alt="Diamond"
                                    width="100"
                                    height="100"
                                />
                            </Col>
                            <Col mb={2} >
                                <Stack>
                                    <h4>{order.orderId}</h4>
                                    <div className='mb-1'><span className='fw-bold'>Service: </span>{order.requestId.service}</div>
                                    <div className='mb-1'><span className='fw-bold'>Order Date: </span>{formattedDateTime(order.orderDate)}</div>
                                </Stack>
                            </Col>
                            <Col md={2} >
                                <Stack >
                                    <Button style={{ backgroundColor: '#CCFBF0' }} onClick={() => viewMyRequest(order)}>
                                        <span className='text-dark me-1'>View</span>
                                        <img
                                            src="/src/assets/assetsCustomer/seemore.svg"
                                            alt=""
                                            width="20"
                                            height="20"
                                        />
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
