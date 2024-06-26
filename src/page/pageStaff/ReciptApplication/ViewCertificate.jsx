import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image, Spinner } from 'react-bootstrap';
import { GeneratePDF } from '../../pageValuationStaff/ValuationApplication/GeneratePDF';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const ViewCertificate = () => {
    const [isPrint, setIsPrint] = useState(false);
    const { orderDetailId } = useParams();
    const [certificate, setCertificate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/evaluation_results/getEvaluationResultsByOrderDetailId/${orderDetailId}`);
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
            {!isPrint ? (
                <Form>
                    <Row className="mb-4">
                        <Col md={2}>
                            <Image
                                src="/src/assets/assetsCustomer/logo.png"
                                alt="Logo"
                                className='mt-3'
                                fluid
                            />
                        </Col>
                        <Col md={8} className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-center my-3">Diamond Valuation Report</h1>
                            <Row className="justify-content-center">
                                <Col md={6} className="text-center w-100 fw-bold">
                                    <Form.Label className="mb-2">Certificate ID:</Form.Label>
                                </Col>
                                <Col md={6} className="text-center w-100 fw-bold">
                                    <p>{certificate[0]?.evaluationResultId}</p>
                                </Col>
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
                                        <p>{certificate[0]?.diamondOrigin}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Measurements</Form.Label>
                                    </Col>
                                    <Col md={6} >
                                        <p>{certificate[0]?.measurements}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Shape Cut</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.shapeCut}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Description</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.description}</p>
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
                                        <p>{certificate[0]?.caratWeight}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Color Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.color}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Clarity Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.clarity}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Cut Grade</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.cut}</p>
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
                                        <p>{certificate[0]?.polish}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Symmetry</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.symmetry}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Fluorescence</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.fluorescence}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Proportion</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.proportions}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <Form.Label>Estimate Price</Form.Label>
                                    </Col>
                                    <Col md={6}>
                                        <p>{certificate[0]?.price}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className='my-4' style={{ width: '100%' }}>
                                <h4 className='text-center py-2' style={{ backgroundColor: '#7CF4DE' }}>Product Image</h4>
                                <div className='d-flex justify-content-center'>
                                    {certificate[0]?.img && (
                                        <img
                                            src={certificate[0].img}
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
                    <img
                        src="/src/assets/assetsStaff/back.svg"
                        alt="go back"
                        className='mt-3'
                        height="20"
                        width="20"
                        onClick={() => setIsPrint(false)}
                    />
                    <GeneratePDF result={certificate} />
                </div>
            )}
        </Container>
    );
};
