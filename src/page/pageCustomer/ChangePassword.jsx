import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/constants/url';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { OTPConfirm } from './OTPConfirm';

export const ChangePassword = () => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user_request/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setShowModal(true);
            setError('');
        } catch (error) {
            setError('Invalid username');
        }
    };
    return (
        <div style={{ minHeight: 700 }}>
            <div className='d-flex justify-content-center my-5'>
                <div className='border border-dark p-5 my-3 w-50'>
                    <form onSubmit={handleOnSubmit}>
                        <h1 className='text-center mb-5 fw-bold'>Forget Password</h1>
                        <h4 className='text-center mb-5'>
                            Enter your email address and we'll send you an email OTP to create a new password
                        </h4>
                        <div className='d-flex justify-content-center'>
                            <input
                                type="text"
                                name="userId"
                                value={userId}
                                className='rounded p-3 w-100'
                                placeholder='Your Account'
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className="form-button d-grid mt-4 text-center mt-4">
                            <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
                                Send An OTP Confirmation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>OTP Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OTPConfirm userId={userId} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
