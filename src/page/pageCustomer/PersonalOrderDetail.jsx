import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Stack, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import formattedDate from '../../utils/formattedDate/formattedDate';
import formattedDateTime from '../../utils/formattedDate/formattedDateTime';
import { Status } from '../../component/Status';
import { API_BASE_URL } from '../../utils/constants/url';
import useAuth from '../../utils/hook/useAuth';
export const PersonalOrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isOrder, setIsOrder] = useState(false);
    const [order, setOrder] = useState({});
    const { user } = useAuth()
    const [orderDetails, setOrderDetails] = useState([]);

    // get order detail by order id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/order_detail_request/orderDetail/${orderId}`
                );
                const data = await response.json();
                setOrderDetails(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [orderId]);
    // get order by order id 
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/order_request/getOrder/${orderId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                if (data != null) {
                    setOrder(data);
                    
                    setIsOrder(true);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
        return () => {
            setLoading(false);
        };
    }, [orderId]);
    
    if (loading) {
        return <div className="text-center my-4" style={{ minHeight: '500px' }}><Spinner animation="border" /></div>;
    }
    return (
        <div style={{minHeight:700}} >
            <div className=" mx-4">
                <i className="bi bi-arrow-90deg-left"
                    onClick={() => {
                        navigate("/my-order");
                    }}
                    style={{ cursor: "pointer" }}
                ></i>
            </div>
            <div style={{ minHeight: "400px" }} className='my-5'>
                <Container>
                    {/* List of order */}
                    <Row >
                        <Col md={7} className='border border-dark rounded  m-4'>
                            <div >
                                {/* content */}
                                <div className='my-3'>
                                    <h3 style={{ backgroundColor: "#CCFBF0", padding: "10px 10px " }}>
                                        Your sample
                                    </h3>
                                </div>
                                {/* list order details */}
                                <div>
                                    {orderDetails.map((orderDetail) => {
                                        return <div key={orderDetail.orderDetailId} className='mb-3 p-2' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                                            <Row direction='row'>
                                                <Col md={2} className='d-flex align-items-center justify-content-center'>
                                                    <img src={orderDetail?.img} alt="" width="70" height="70" className='' />
                                                </Col>
                                                <Col md={2}>
                                                    <div className='fw-bold'>Service:</div>
                                                    <div>{orderDetail?.serviceId?.serviceType}</div>
                                                </Col>
                                                <Col md={2} >
                                                    <div className='fw-bold'>Receive Date:</div>
                                                    <div>{formattedDate(orderDetail.receivedDate)}</div>
                                                    <div className='fw-bold'>Expired Date:</div>
                                                    <div>{formattedDate(orderDetail.expiredReceivedDate)}</div>
                                                </Col>
                                                <Col md={2} className='d-flex align-items-center'>
                                                <Status status={orderDetail.status === 'In_Progress' ? 'In-Progress' : orderDetail.status} />
                                                </Col>
                                                <Col md={2}>
                                                    <div className='fw-bold'>Is Diamond:</div>
                                                    <div style={{ alignItems: "center" }}>
                                                        {(orderDetail.isDiamond ? "Diamond" : "Not a diamond")}
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='fw-bold'>Unit Price</div>
                                                    <div style={{ alignItems: "center", marginBottom:"10px" }}>{orderDetail.unitPrice}</div>
                                                    <Button variant='info' disabled={(orderDetail.status !== 'Finished' ||orderDetail.status !== 'Sealed') && !orderDetail.isDiamond } onClick={()=>{
                                                        navigate(`/my-certificate/${orderDetail.orderDetailId}`)
                                                        
                                                    }}>
                                                        Certificate
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className='border border-dark rounded m-4' style={{ maxHeight: 300 }}>
                            <div >
                                <div className='mt-3'>
                                    <h3 style={{ backgroundColor: "#CCFBF0", padding: "10px 10px " }}>
                                        Your Order
                                    </h3>
                                </div>
                                <div>
                                    <Row className='my-4'>
                                        {/* User */}
                                        <Col>
                                            <Stack >
                                                <div className='mb-3'>
                                                    <div className='fw-bold'>Customer Name</div>
                                                    <div>{order.customerName}</div>
                                                </div>
                                                <div className='mb-3'>
                                                    <div className='fw-bold'>Phone Number</div>
                                                    <div>{order.phone}</div>
                                                </div>
                                                <div className='mb-3'>
                                                    <div className='fw-bold'>Address</div>
                                                    <div>{user.address}</div>
                                                </div>
                                            </Stack>
                                        </Col>
                                        {/* Order */}
                                        <Col>
                                            <Stack>
                                                <div className='mb-3'>
                                                    <div className='fw-bold'>Order ID</div>
                                                    {isOrder && <div>{order.orderId}</div>}
                                                </div>
                                                <div className='mb-3'>
                                                    <div className='fw-bold mb-1'>Status</div>
                                                    {isOrder &&  <Status status={order.status === 'In_Progress' ? 'In-Progress' : order.status} />}
                                                </div>
                                                <div className='mb-3'>
                                                    <div className='fw-bold'>Created Order Date</div>
                                                    {isOrder && <div>{formattedDateTime(order.orderDate)}</div>}
                                                </div>
                                            </Stack>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            {/* Button */}
                            
                        </Col>
                    </Row>



                </Container>
            </div>

        </div>
    )
}
