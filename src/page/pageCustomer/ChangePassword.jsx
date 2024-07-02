import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/constants/url';

export const ChangePassword = () => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/user_request/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Chỉ gửi userId trực tiếp
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response data:', data);
            setSuccessMessage('Password reset request sent successfully!');
            setError('');
        } catch (error) {
            console.error('Invalid username ', error);
            setError('Invalid username or password');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <h1>Enter User ID and Email</h1>
                    <input 
                        type="text" 
                        name="userId"  
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)} 
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                    <div className="form-button d-grid mt-4 text-center">
                        <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
