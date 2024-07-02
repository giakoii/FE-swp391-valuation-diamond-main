import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/constants/url';
import { useNavigate } from 'react-router-dom';
export const ChangePassword = () => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    console.log('User Id', userId)
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user_request/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Response data:', data);
            setSuccessMessage('Password reset request sent successfully!');
            navigate('/otp-confirmation', {state: {userId:userId}})
            setError('');
        } catch (error) {
            console.error('Invalid username ', error);
            setError('Invalid username ');
            setSuccessMessage('');
        }
    };
    return (
        <div>
            <div className='d-flex justify-content-center my-5'>
                <div className='border border-dark p-5'>
                    <form onSubmit={handleOnSubmit}>
                        <h1 className='text-center mb-5'>Enter Your Account ID</h1>
                        <div className='d-flex justify-content-center'>
                        <input
                            type="text"
                            name="userId"
                            value={userId}
                            className='rounded p-3 w-100'
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        </div>

                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                        <div className="form-button d-grid mt-4 text-center mt-5">
                            <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
