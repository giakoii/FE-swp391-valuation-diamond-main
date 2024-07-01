import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { validateForm, showAlert } from '../../utils/validation/valAdd.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Signup() {
  const [formState, setForm] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'customer' 
  });
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [countdown, setCountdown] = useState(120); 
  const navigate = useNavigate();

  useEffect(() => {
    if (showOtpModal) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        showAlert('Error!', 'OTP verification timed out. Please try again.', 'error');
        setShowOtpModal(false);
        setCountdown(120); 
      }, 120000);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    }
  }, [showOtpModal]);

  const handleOnChange = (event) => {
    setForm({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const userNameHaveTrim = formState.userId.trim();
    const passwordHavedTrim = formState.password.trim();

    if (!validateForm(userNameHaveTrim, passwordHavedTrim, formState.confirmPassword, formState.firstName, formState.lastName, formState.email)) {
      return;
    }

    const formSendData  = {
      userId: userNameHaveTrim,
      password: passwordHavedTrim,
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      role: formState.role,
    };

    try {
      const response = await fetch('http://localhost:8080/user_request/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSendData),
      });

      if (response.ok) {
        setShowOtpModal(true);
      } else if (response.status === 400) { 
        showAlert('Error!', 'Username is already existed.', 'error');
      } else {
        showAlert('Error!', 'Failed to create account. Please try again.', 'error');
      }
    } catch (error) {
      showAlert('Error!', 'Network error. Please try again.', 'error');
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleOtpSubmit = async () => {
    const otpSendData = {
      userId: formState.userId,
      otp: otp,
    };

    try {
      const response = await fetch('http://localhost:8080/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpSendData),
      });

      if (response.ok) {
        showAlert('Success!', 'Account created successfully!', 'success');
        setShowOtpModal(false);
        navigate('/login');
      } else {
        showAlert('Error!', 'Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      showAlert('Error!', 'Network error. Please try again.', 'error');
    }
  };

  return (
    <div className="form-container d-flex justify-content-center align-items-center">
      <form
        className="form-row my-5 p-5" 
        style={{ width: "800px ", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
        onSubmit={handleOnSubmit}
      >
        <div className="form-title d-flex justify-content-center mb-3 fw-bold">
          <h1>Sign Up</h1>
        </div>
        <div className="form-row d-flex justify-content-between">
          <div className="form-group mt-4 col-md-6">
            <label htmlFor="firstName" className='px-2' style={{ display: "block" }}>First Name :</label>
            <input 
              id="firstName"
              type="text"
              name="firstName"
              value={formState.firstName}
              className="form-control mt-1"
              style={{ width: "200px", height: "37px" }}
              onChange={handleOnChange} 
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="lastName" className='px-2' style={{ display: "block" }}>Last Name :</label>
            <input 
              id="lastName"
              type="text"
              name="lastName"
              value={formState.lastName}
              className="form-control mt-1 px-2"
              style={{ width: "200px", height: "37px" }}
              onChange={handleOnChange} 
              required
            />
          </div>
        </div>

        <div className="form-group mt-4">
          <label htmlFor="userId" className='px-2'> Username :</label>
          <input
            id="userId"
            type="text"
            name="userId"
            value={formState.userId}
            className="form-control mt-1 px-2 my-2"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group mt-3 ">
          <div className="form-password d-flex justify-content-between">
            <label htmlFor="password" className='px-2'>Password</label>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            className="form-control mt-1 py-2"
            onChange={handleOnChange}
            required
          />
        </div>  
        <div className="form-group mt-3 ">
          <div className="form-password d-flex justify-content-between">
            <label htmlFor="confirmPassword" className='px-2'>Confirm Password</label>
          </div>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            className="form-control mt-1 py-2"
            onChange={handleOnChange}
            required
          />
        </div> 
        <div className="form-group mt-4">
          <label htmlFor="email" className='px-2'> Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email}
            className="form-control mt-1 px-2 my-2"
            onChange={handleOnChange}
            required
          />
        </div> 
        <div className="form-button d-grid mt-4 text-center">
          <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
            Create Account
          </button>
        </div>
        <div className="d-flex align-items-center mt-4">
          <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
          <p style={{ margin: "0 10px" }}>Or sign in with</p>
          <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
        </div>
        <div className="form-img text-center mt-4">
          <img
            src="/src/assets/assetsCustomer/Google.png"
            alt="google"
            className="img rounded-circle border border-dark"
            height="40"
            width="40"
          />
        </div>
        <hr style={{ background: "#DDE1DF", height: "2px", marginTop: "1.5em" }} />
        <p className="text-center mt-4">already have account !!!!! <NavLink to="/login" className ="link-secondary">Login</NavLink></p>
      </form>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the OTP sent to your registered email.</p>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            className="form-control"
            placeholder="Enter OTP"
          />
          <p className="mt-2">Time remaining: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOtpSubmit}>
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Signup;
