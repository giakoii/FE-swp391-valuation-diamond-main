import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image, Spinner, Stack } from 'react-bootstrap';
import { GeneratePDF } from '../../pageValuationStaff/ValuationApplication/GeneratePDF';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../utils/constants/url';

export const ViewCertificate = () => {
    const [isPrint, setIsPrint] = useState(false);
    const { orderDetailId } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/evaluation_results/getEvaluationResultsByOrderDetailId/${orderDetailId}`);
                const data = await response.json();
                console.log(data)
                setCertificate(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [orderDetailId]);

    if (isLoading) {
        return <div className="text-center my-4"><Spinner animation="border" /></div>;
    }

    const showConfirmPrint = (e) => {
        e.preventDefault();
        console.log('Certificate:', certificate);
        if (certificate === null) {
            toast.error('Fail to print: certificate is not completed');
            return;
        }

        confirmAlert({
            title: 'Confirm to print',
            message: 'Click ok to print the valuation result',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => printResult()
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                }
            ]
        });
    };
    const printResult = () => {
        setIsPrint(true);
    };

    return (
        <Container>
            <ToastContainer />
            <img
                src="/assets/assetsStaff/back.svg"
                alt="go back"
                className='mt-3'
                height="20"
                width="20"
                onClick={() => {
                    navigate(-1)
                }}
            />
            {!isPrint ? (
                <Form>
                    <Row className="mb-4">
                        <Col md={2}>
                            <Image
                                src="https://res.cloudinary.com/dz2dv8lk4/image/upload/fl_preserve_transparency/v1719856194/logo_fyex4a.jpg?_s=public-apps"
                                alt="Logo"
                                className='mt-3'
                                fluid
                            />
                        </Col>
                        <Col md={8} className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-center my-3">Diamond Valuation Report</h1>
                            <Row className=" w-100" >
                                <Stack direction="horizontal" className='justify-content-center'>
                                    <Col md={6} className="text-center w-25 fw-bold">
                                        <div>Certificate Number</div>
                                    </Col>
                                    <Col md={6} className="text-center w-25 fw-bold">
                                        <div>{certificate?.evaluationResultId}</div>
                                    </Col>
                                </Stack>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} >
                            <div className='my-4 fs-5' style={{ width: '100%' }}>
                                <h4 className='text-center py-2' style={{ backgroundColor: '#7CF4DE' }}>Diamond Valuation Report</h4>
                                <Row className="mb-2 ">
                                    <Col md={6}>
                                        <Form.Label>Diamond Origin</Form.Label>
                                    </Col>
                                    <Col md={6} >
                                        <p>{certificate?.diamondOrigin}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Measurements</Form.Label>
                                    </Col>
                                    <Col md={6} >
                                        <p>{certificate?.measurements}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Shape Cut</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.shapeCut}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Description</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <div style={{ maxWidth: 260, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{certificate?.description}</div>
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4 fs-5' style={{ width: '100%' }}>
                                <h4 className='text-center py-2' style={{ backgroundColor: '#7CF4DE' }}>Grading Results</h4>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Carat Weight</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.caratWeight}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Color Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.color}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Clarity Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.clarity}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Cut Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.cut}</p>
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-4 fs-5' style={{ width: '100%' }}>
                                <h4 className='text-center py-2' style={{ backgroundColor: '#7CF4DE' }}>Additional Grading Information</h4>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Polish</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.polish}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Symmetry</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.symmetry}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Fluorescence</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.fluorescence}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Proportion</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.proportions}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Estimate Price</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate?.price}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className='my-4' style={{ width: '100%' }}>
                                <h4 className='text-center py-2' style={{ backgroundColor: '#7CF4DE' }}>Product Image</h4>
                                <div className='d-flex justify-content-center'>
                                    {certificate?.img && (
                                        <img
                                            src={certificate.img}
                                            alt="product-img"
                                            height='300'
                                            className='border border-dark w-75'
                                        />
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col className='d-flex justify-content-end'>
                            <Button className='btn btn-danger me-2' type='button' onClick={showConfirmPrint}>
                                Print
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <div>
                    <GeneratePDF result={certificate} />
                </div>
            )}
        </Container>
    );
};
