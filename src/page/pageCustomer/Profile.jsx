import { useState } from "react";
import useAuth from "../../utils/hook/useAuth";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import formattedDate from "../../utils/formattedDate/formattedDate";

import { validChangePasswordForm, showAlert ,validateEditForm2 } from "../../utils/validation/valAdd.js";

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    userId: user.userId ,
    oldPassword : '',
    newPassword:'',
    confirmNewPassword:'',

  })
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    birthday: formattedDate(user.birthday),
  });
  const handleCloseEditProfileModal = () => setShowEditProfileModal(false);
  const handleShowEditProfileModal = () => setShowEditProfileModal(true);

  const backList = () => {
    navigate('/');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleOnSubmit = async (event) => {
    event.preventDefault();
        
    const passwordHavedTrim = data.oldPassword.trim();
    const newPasswordHavedTrim = data.newPassword.trim();

    if (!validChangePasswordForm(passwordHavedTrim,newPasswordHavedTrim,data.confirmNewPassword)) {
      return;
    }

    const formSendData  = {
      userId: user.userId,
      oldPassword: passwordHavedTrim,
      newPassword:newPasswordHavedTrim,
      
    };
    console.log(formSendData);
    try {
      const response = await fetch('https://valuation.techtheworld.id.vn/user_request/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSendData),
      });

      if (response.ok) {
        showAlert('Success!', 'Password changed successfully.', 'success');
        handleClose(); 
      } else {
        showAlert('Password Wrong  !',  'Please Try Again !!!!!.', 'error');
      }
    } catch (error) {
      showAlert('Error!', 'Network error. Please try again.', 'error');
    }
  };
  const handleEditProfileChange = (event) => {
    setEditProfileData({
      ...editProfileData,
      [event.target.name]: event.target.value,
    });
  };
  const handleEditProfileSubmit = async (event) => {
    event.preventDefault();

    const changedData = {};
    Object.keys(editProfileData).forEach(key => {
      if (editProfileData[key] !== user[key]) {
        changedData[key] = editProfileData[key];
      }
    });

    if (Object.keys(changedData).length === 0) {
      showAlert('Info', 'No changes detected.', 'info');
      return;
    }

    if (!validateEditForm2(editProfileData.firstName, editProfileData.lastName, editProfileData.phoneNumber, editProfileData.address, editProfileData.birthday)) {
      return;
    }

    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/updateUser/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedData),
      });

      if (response.ok) {
        showAlert('Success!', 'Profile updated successfully.', 'success');
        handleCloseEditProfileModal();
      } else {
        showAlert('Error!', 'Failed to update profile. Please try again.', 'error');
      }
    } catch (error) {
      showAlert('Error!', 'Network error. Please try again.', 'error');
    }
  };
  return (
    <Container fluid >
      <img className="mx-3" src="/assets/assetsCustomer/back.svg" width='30px' height='30px' alt="back" onClick={backList} />

      <Row className="my-4">
        <Col md={6} className="d-flex justify-content-center">
          <img
            src="https://www.beelancer.vn/storage/2022/10/casemiro-365x405.jpg"
            alt="customer"
            width='200'
            height='200'
            className="d-flex justify-content-center align-item-center"
          />
        </Col>
        <Col md={6}  style={{ width: "800px ", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }} >
          <Row>
            <Col md={2}>
              <img
                src='/assets/assetsAdmin/logo.png'
                width='100'
                height='100'
                alt='Logo'
                className=''
              />
            </Col>
            <Col >
              <h1 className="my-4">Customer Profile</h1>
            </Col>
          </Row>
          <h5 className="p-4">- Customer Name: {user.firstName + ' ' + user.lastName}</h5>
          <h5 className="p-4">- Phone: {user.phoneNumber}</h5>
          <h5 className="p-4">- Email: {user.email}</h5>
          <h5 className="p-4">- Birthday: {formattedDate(user.birthday)}</h5>
          <h5 className="p-4">- Address: {user.address}</h5>
          <div className="d-flex justify-content-end p-5">
            <Button variant="primary" onClick={handleShowEditProfileModal} >
                Edit Profile
              </Button>
            <Button variant="primary" onClick={handleShow} className="mx-2">Change Password</Button>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img
              src='/assets/assetsAdmin/logo.png'
              width='100'
              height='100'
              alt='Logo'
              className='mx-4'
            />
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter current password"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={data.newPassword}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={data.confirmNewPassword}
                onChange={handleOnChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleOnSubmit}>Change Password</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditProfileModal} onHide={handleCloseEditProfileModal}>
        <Modal.Header closeButton>
        <img
              src='/assets/assetsAdmin/logo.png'
              width='100'
              height='100'
              alt='Logo'
              className='mx-5'
            />
            
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProfileSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editProfileData.firstName}
                onChange={handleEditProfileChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editProfileData.lastName}
                onChange={handleEditProfileChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={editProfileData.phoneNumber}
                onChange={handleEditProfileChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editProfileData.address}
                onChange={handleEditProfileChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="text"
                name="birthday"
                value={editProfileData.birthday}
                onChange={handleEditProfileChange}
                required
                placeholder="dd/mm/yyyy"
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
