import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants/url';

export const OTPConfirm = ({ userId }) => {
    const [otpConfirm, setOtpConfirm] = useState({
        userId: userId,
        newPassword: '',
        otp: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === 0) {
            setError('Time is up. Please request a new OTP.');
            setTimeout(() => {
                navigate('/change-password');
            }, 3000); // 3 seconds delay before redirect
        }
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setOtpConfirm((currentState) => ({ ...currentState, [name]: value }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user_request/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(otpConfirm),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSuccess(true);
            setError('');
        } catch (error) {
            setError('Invalid OTP');
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col>
                    <div className="border border-dark p-5">
                        <h1 className="text-center mb-4">OTP Confirmation</h1>
                        {!success ? (
                            <Form onSubmit={handleOnSubmit}>
                                <Form.Group className="mb-3" controlId="formUserId">
                                    <Form.Label>UserId</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userId"
                                        value={otpConfirm.userId}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formOtp">
                                    <Form.Label>Email OTP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="otp"
                                        value={otpConfirm.otp}
                                        onChange={handleOnChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        value={otpConfirm.newPassword}
                                        onChange={handleOnChange}
                                    />
                                </Form.Group>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Button type="submit" className="w-100" style={{ backgroundColor: '#CCFBF0' }}>
                                    Send
                                </Button>
                                <div className="text-center mt-3">
                                    Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                                </div>
                            </Form>
                        ) : (
                            <div className="text-center">
                                <Alert variant="success">
                                    Password reset request sent successfully!
                                </Alert>
                                <Button onClick={handleBackToLogin} className="w-100" style={{ backgroundColor: '#CCFBF0' ,color:"black" }}>
                                    Back to Login
                                </Button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};