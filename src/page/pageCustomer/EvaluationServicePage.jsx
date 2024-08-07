import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import useAuth from '../../utils/hook/useAuth';
import { formValidRequest } from '../../utils/validation/valAdd';
dayjs.extend(utc); // Kích hoạt plugin utc

function EvaluationServicePage() {
  const { user } = useAuth();
  const initialFormState = {
    service: '',
    phoneNumber: '',
    guestName: '',
    requestEmail: '',
    requestDescription: '',
    userId: '',
    requestDate: '' // This will hold the formatted date
  };
  
  const [formRequest, setFormRequest] = useState(initialFormState);

  useEffect(() => {
    if (user) {
      setFormRequest(prevState => ({
        ...prevState,
        guestName: user.firstName + ' ' + user.lastName,
        requestEmail: user.email,
        phoneNumber: user.phoneNumber,
        userId: user.userId,
      }));
    }
  }, [user]);

  const getCurrentDate = () => {
    return dayjs().utc(true).format('MM/DD/YYYY, HH:mm');
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(!formValidRequest(formRequest.guestName,formRequest.phoneNumber,formRequest.requestDescription)){
      return;
    }
    const requestData = {
      ...formRequest,
      requestDate: getCurrentDate() 
    };
    console.log(requestData);
    try {
      const response = await fetch('https://valuation.techtheworld.id.vn/evaluation-request/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      Swal.fire({
        title: "Success!",
        text: "Your request has been sent successfully.",
        icon: "success",
        button: "OK"
      });
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        title: "Error!",
        text: "There was an error sending your request. Please try again.",
        icon: "error",
        button: "OK"
      });
    }
  };

  const handleOnClear = () => {
    setFormRequest( prevState => ({
      ...initialFormState,
      userId: prevState.userId
    })
    );
  };

  return (
    <div className="form-container justify-content-center align-items-center">
      <div className='justify-content-center d-flex my-2 p-4'>
        <h1>Valuation Request Service</h1>
      </div>
      <div
        className="custom-hr"
        style={{
          width: "1000px",
          height: "2px",
          backgroundColor: "#A9A9A9",
          margin: "0 auto",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"
        }}
      ></div>
      <div className="d-flex justify-content-center align-items-center">
        <form
          className="form-row my-5 p-5"
          style={{ width: "1000px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
          onSubmit={handleOnSubmit}
        >
          <div className="form-group mt-1">
            <label htmlFor="service" className='px-1'> Type Service: </label>
            <select
              id="service"
              name="service"
              className="custom-select"
              value={formRequest.service}
              onChange={handleOnChange}
              required
            >
              <option value="">Select Service</option>
              <option value="Evaluation Diamond">Evaluation Diamond</option>
              <option value="Remake Evaluation Diamond">Remake Evaluation Diamond</option>
            </select>
          </div>

          <div className="form-row d-flex justify-content-between">
            <div className="form-group mt-4 col-md-6">
              <img
                src='/assets/assetsCustomer/user.svg'
                alt='User icon'
                width='15'
                height='15'
                className="mx-1"
              />
              <label htmlFor="guestName" className='px-1'> Full name: </label>
              <input
                id="guestName"
                type="text"
                name="guestName"
                value={formRequest.guestName}
                className="mt-1 px-2"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-4 col-md-6 ">
              <img
                src='/assets/assetsCustomer/email.svg'
                alt='email icon'
                width='15'
                height='15'
                className="mx-1"
              />
              <label htmlFor="requestEmail" className='px-1'> Email: </label>
              <input
                id="requestEmail"
                type="email"
                name="requestEmail"
                value={formRequest.requestEmail}
                className="mt-1 px-2"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="form-group mt-4 col-md-6">
            <img
              src='/assets/assetsCustomer/phone.svg'
              alt='Phone icon'
              width='15'
              height='15'
              className="mx-1"
            />
            <label htmlFor="phoneNumber" className='px-3'>Phone:</label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={formRequest.phoneNumber}
              className="mt-1 px-2"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="requestDescription" className='px-3'>Description:</label>
            <textarea
              id="requestDescription"
              type="text"
              name="requestDescription"
              value={formRequest.requestDescription}
              className="form-control mt-1 px-2"
              style={{ width: "100%", height: "350px", borderColor: "black" }}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-button text-center">
            <button type="button" className="btn fw-bold py-3 px-3 my-3" style={{ backgroundColor: "#CCFBF0", borderColor: "black", marginRight: "10px",marginLeft:'60%' }} onClick={handleOnClear}>CLEAR</button>
              <button type="submit" className="btn fw-bold py-3 px-3 my-3" style={{ backgroundColor: "#CCFBF0", borderColor: "black" }}>SEND</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default EvaluationServicePage;
