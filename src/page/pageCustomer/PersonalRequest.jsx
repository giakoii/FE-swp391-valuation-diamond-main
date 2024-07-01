import React, { useEffect, useState } from 'react';
import { Row, Col, Stack, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import formattedDate from '../../utils/formattedDate/formattedDate';
import useAuth from '../../utils/hook/useAuth';
import { Pagination } from '../../component/Pagination/Pagination';
import { Status } from '../../component/Status';
import formattedDateTime from '../../utils/formattedDate/formattedDateTime';
import { API_BASE_URL } from '../../utils/constants/url';

export const PersonalRequest = () => {
    const [myRequest, setMyRequest] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();
    const API = `${API_BASE_URL}/evaluation-request/get_by_user`;

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current requests
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentRequest = myRequest.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/${user.userId}`);
                const data = await response.json();
                const sortedData = data.sort((a, b) => Date.parse(b.requestDate) - Date.parse(a.requestDate));
                setMyRequest(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.userId]);

    if (loading) {
        return (
            <div className="text-center my-4" style={{ minHeight: '500px' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    const viewMyRequest = (request) => {
        navigate(`/my-request/${request.requestId}`, { state: { request } });
    };

    return (
        <div className='my-5' style={{ minHeight: '500px' }}>
            <h2 className='text-center' style={{ margin: "30px 0" }}>My Request</h2>
            {currentRequest.length > 0 ? (
                <Stack gap={4}>
                    {currentRequest.map((request) => (
                        <Row key={request.requestId} className="justify-content-center w-75 mx-auto p-3" style={{ boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}>
                            <Col md={2} className="d-flex justify-content-center align-items-center">
                                {request.requestId}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img
                                    src="/src/assets/assetsCustomer/diamond-svgrepo-com.svg"
                                    alt="Diamond"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col mb={2}>
                                <Stack>
                                    <div className='mb-1 fw-bold'>{request.service}</div>
                                    <div className='mb-1'>Request Date: {formattedDate(request.requestDate)}</div>
                                    <div className='mb-1'>Status: <Status status={request.status} /> </div>
                                </Stack>
                            </Col>
                            <Col md={2} className="d-flex">
                                <Stack>
                                    <Button style={{ backgroundColor: '#CCFBF0' }} onClick={() => viewMyRequest(request)}>
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
                totalPosts={myRequest.length}
                paginate={paginate}
            />
        </div>
    );
};
