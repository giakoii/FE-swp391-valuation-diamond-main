import React, { useEffect, useState } from 'react';
import './ManageCustomer.css';
import { Modal, Button, Form, Pagination, Row, Col } from 'react-bootstrap';
import { validateForm, showAlert, validateEditForm ,validatePasswordChange} from '../../../utils/validation/valAdd';
import formattedDate from '../../../utils/formattedDate/formattedDate.js';
import Swal from 'sweetalert2';

export const ManageCustomer = () => {
  const [dataCust, setDataCust] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formContainCustById, setFormContainCustById] = useState(null);
  const [showFormInfor, setShowFormInfor] = useState(false);
  const [formAddCust, setFormAddCust] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: 'customer',
  });
  const [formEditCust, setFormEditCust] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordChange, setPasswordChange] = useState({ password: '', confirmPassword: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredSelection, setFilteredSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAddCust({
      ...formAddCust,
      [name]: value,
    });
  };

  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setFormEditCust({
      ...formEditCust,
      [name]: value,
    });
  };

  // Save new cust
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usernameHavedTrim = formAddCust.userId.trim();
    const passwordHavedTrim = formAddCust.password.trim();
    
    if (!validateForm(usernameHavedTrim, passwordHavedTrim, formAddCust.confirmPassword, formAddCust.firstName, formAddCust.lastName)) {
      return;
    }

    const formSendAddNewCustomer = {
      userId: usernameHavedTrim,
      password: passwordHavedTrim,
      firstName: formAddCust.firstName,
      lastName: formAddCust.lastName,
      role: formAddCust.role,
    };
    console.log(formSendAddNewCustomer);
    try {
      const response = await fetch('https://valuation.techtheworld.id.vn/user_request/createStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSendAddNewCustomer),
      });
      if (response.ok) {
        const newStaff = await response.json();
        setDataCust([...dataCust, newStaff]);
        setFilteredSelection([...dataCust, newStaff]);
        showAlert('Success!', 'Add new Customer successfully.', 'success');
        handleClose();
      } else if (response.status === 400) { 
        showAlert('Error!', 'Username is already existed.', 'error');
      } else {
        console.log('Save failed');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  // Fetch customer data
  useEffect(() => {
    const fetchDataStaff = async () => {
      try {
        const response = await fetch('https://valuation.techtheworld.id.vn/user_request/getCustomer');
        const data = await response.json();
        setDataCust(data);
        setFilteredSelection(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataStaff();
  }, []);

  // Show customer information
  const handleShowCustInfor = async (userId) => {
    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/getAUser/${userId}`);
      const customer = await response.json();
      setFormContainCustById(customer);
      setShowFormInfor(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseCustInfor = () => {
    setShowFormInfor(false);
    setFormContainCustById(null);
  };

  // Show edit customer form
  const handleShowEditCust = async (custId) => {
    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/getAUser/${custId}`);
      const customer = await response.json();
      setFormEditCust(customer);
      setOriginalData(customer); // Store the original data
      setShowEditForm(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseEditCust = () => {
    setShowEditForm(false);
    setFormEditCust(null);
    setOriginalData(null);
  };

  // Handle edit customer form submit
  const handleEditOnSubmit = async (e) => {
    e.preventDefault();
    if (!formEditCust) return;
    const passwordHavedTrim = formEditCust.password.trim();
    if (!validateEditForm( formEditCust.firstName, formEditCust.lastName, formEditCust.phoneNumber, formEditCust.address)) {
      return;
    }
  
    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/updateUser/${formEditCust.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEditCust),
      });
  
      if (response.ok) {
        const updatedStaff = await response.json();
        setDataCust((prevData) =>
          prevData.map((cust) => (cust.userId === updatedStaff.userId ? updatedStaff : cust))
        );
        setFilteredSelection((prevData) =>
          prevData.map((cust) => (cust.userId === updatedStaff.userId ? updatedStaff : cust))
        );
        showAlert('Success!', 'Staff updated successfully.', 'success');
        handleCloseEditCust();
      } else {
        console.log('Update failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Delete Customer
  const handleDeleteCust = async (userId) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/deleteUser/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setDataCust(prevData => prevData.filter(cust => cust.userId !== userId));
          setFilteredSelection(prevData => prevData.filter(cust => cust.userId !== userId));
          Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Delete failed.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error!', 'An error occurred while deleting the customer.', 'error');
      }
    }
  };
  //
  const handleOpenPasswordModal = () => {
    setShowEditForm(false); // Đóng modal chỉnh sửa
    setShowPasswordModal(true); // Mở modal đổi mật khẩu
  };
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setShowEditForm(true); // Mở lại modal chỉnh sửa nếu cần
  };
  const handlePasswordChangeOnChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({
      ...passwordChange,
      [name]: value,
    });
  };
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordChange(passwordChange.password, passwordChange.confirmPassword)) {
      return;
    }

    try {
      const response = await fetch(`https://valuation.techtheworld.id.vn/user_request/updateUser/${formEditCust.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordChange.password }),
      });

      if (response.ok) {
        showAlert('Success!', 'Password changed successfully.', 'success');
        setShowPasswordModal(false);
        setPasswordChange({ password: '', confirmPassword: '' });
      } else {
        showAlert('Failed!', 'Password Chang Failed !!! ', 'error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  //------------------------------------
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredSelection.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= Math.ceil(filteredSelection.length / itemsPerPage); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={(event) => paginate(event, number)}>
        {number}
      </Pagination.Item>
    );
  }

  // Handle search
  const handleSearch = () => {
    const filteredData = dataCust.filter((item) => item.userId.toString().includes(searchTerm));
    setFilteredSelection(filteredData);
  };

    return (
      <div className='container'>
        <div className='justify-content-first d-flex my-2 p-4'>
          <img
            src='/assets/assetsAdmin/person.svg'
            width='40'
            height='40'
            className='my-3'
            alt='Logo'
          />
          <h4 className='p-4'>Manage Customer</h4>
          <Button onClick={handleShow} className="nav-link h-100 my-4" >
            <img
              src='/assets/assetsAdmin/plus.svg'
              width='40'
              height='40'
              alt='Add'
            />
          </Button>
        </div>
        <div className='justify-content-center' style={{ width: '80%', margin: '0 auto' }}>
        <Form className='mb-3'>
          <Row>
            <Col>
              <Form.Control
                type='text'
                placeholder='Search by ID'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs='auto'>
              <Button variant='primary' onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <style>
        {`
          .centered-table th,
          .centered-table td {
            text-align: center;
            vertical-align: middle;
          }
        `}
      </style>
        <div className="customer-list fs-5">
          <div>
            <div className='row  mx-2 my-2'>
              <p className='col-md-2'>CustomerID</p>
              <p className='col-md-3'>CustName</p>
              <p className='col-md-3'>Email</p>
              <p className='col-md-2'>Phone</p>
            </div>
          </div>
          {currentPosts.map((dataCust, index) => (
            <div key={`customer_${dataCust.userId}_${index}`} className="customer-card my-4 border hover">
              <div className="row">
                <p className='col-md-2'> {dataCust.userId}</p>
                <p className='col-md-3'>{dataCust.firstName +' '+ dataCust.lastName}</p>
                <p className='col-md-3'> {dataCust.email}</p>
                <p className='col-md-2'>{dataCust.phoneNumber}</p>
                <div className='col-md-2 d-flex justify-content-around'>
                  <Button onClick={() => handleShowCustInfor(dataCust.userId)} className='nav-link'>
                    <img
                      src='/assets/assetsAdmin/eye.svg'
                      width='20'
                      height='20'
                      className='my-3'
                      alt='View'
                    
                    />
                  </Button>
                  <Button onClick={() => handleShowEditCust(dataCust.userId)} className="nav-link">
                    <img
                      src='/assets/assetsAdmin/pen.svg'
                      width='20'
                      height='20'
                      className='my-3'
                      alt='Edit'
                    />
                  </Button>
                  <Button className="nav-link" onClick={() => handleDeleteCust(dataCust.userId)}>
                    <img
                      src='/assets/assetsAdmin/trash.svg'
                      width='20'
                      height='20'
                      className='my-3'
                      alt='Delete'
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          

            <Pagination className='d-flex justify-content-center'>{items}</Pagination>
        </div>
                          {/* Modal Add  New Cust */}
        <Modal show={showForm} onHide={handleClose} className='p-5' size='lg'>
          <Modal.Header closeButton className='mx-4'>
          <img
                    src='/assets/assetsAdmin/logo.png'
                    width='80'
                    height='80'
                    alt='Logo'
                    className=''
                  />
            <Modal.Title className="d-flex justify-content-center w-100">Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className='form-row my-5 p-3 mx-5'
              style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
              onSubmit={handleOnSubmit}
            >
                <div className='justify-content-center d-flex my-2 p-4'>
                          <h3>Form Add New Customer</h3>
                </div>
              <div className='form-row d-flex my-5'>
                <div className='form-group col-md-6'>
                  <label htmlFor='firstName'>FirstName:</label>
                  <input
                    id='firstName'
                    type='text'
                    name='firstName'
                    value={formAddCust.firstName}
                    className='mx-2'
                    onChange={handleOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='lastName'>LastName:</label>
                  <input
                    id='lastName'
                    type='text'
                    name='lastName'
                    value={formAddCust.lastName}
                    className='mx-2'
                    onChange={handleOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='userId'>Username:</label>
                <input
                  id='userId'
                  type='text'
                  name='userId'
                  value={formAddCust.userId}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='password'>Password :</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  value={formAddCust.password}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-10 my-5'>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                  id='confirmPassword'
                  type='password'
                  name='confirmPassword'
                  value={formAddCust.confirmPassword}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "50%", borderRadius: "5px" }}
                  required
                />
              </div>
             
              <div className='form-button text-center d-flex justify-content-end'>
                <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
                  {/* Modal show Infor Customer */}
        {formContainCustById && (
            <Modal show={showFormInfor} onHide={handleCloseCustInfor}  className='p-5' size='lg'>
                <Modal.Header closeButton>
          <img
            src='/assets/assetsAdmin/logo.png'
            width='80'
            height='80'
            alt='Logo'
            className=''
          />
          <Modal.Title className='w-100 d-flex justify-content-center'>INFORMATION OF CUSTOMER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <div className="card p-4" style={{ width: '100%', maxWidth: '700px' }}>
                <div className='container d-flex'>
                    <div>
                          <img src="https://www.beelancer.vn/storage/2022/10/casemiro-365x405.jpg" alt="customer" 
                                width='200'
                              height='200'
                            />
                    </div>
                    <div>
                            <div className='container d-flex'>
                          <h4 className='p-4'> {formContainCustById.firstName+' '+ formContainCustById.lastName}</h4>
                          <p className='p-4 my-1'>
                          <img
                              src='/assets/assetsAdmin/map.svg'
                              width='20'
                              height='20'
                              alt='Logo'
                              className=''
                            />
                              {formContainCustById.address}</p>
                              </div>
                        <div className='container'>
                        <p className='mx-4'><strong>ID:</strong> {formContainCustById.userId} <strong className='mx-5'></strong><strong>Role:</strong> {formContainCustById.role} </p>
                        <p className='mx-4'><strong>Phone:</strong> {formContainCustById.phoneNumber}</p>
                        <p className='mx-4'><strong>Email:</strong> {formContainCustById.email}</p>
                       
                        <p className='mx-4'><strong>Birthday:</strong> {formattedDate(formContainCustById.birthday)}</p>
                        </div>
                </div>
                </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        )}
                  {/* Modal Edit Customer */}
        {formEditCust && (
          <Modal show={showEditForm} onHide={handleCloseEditCust} className='p-5' size='lg'>
            <Modal.Header closeButton>
              <img
                src='/assets/assetsAdmin/logo.png'
                width='80'
                height='80'
                alt='Logo'
                className=''
              />
              <Modal.Title className='w-100 d-flex justify-content-center'>EDIT CUSTOMER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form
                className='form-row my-5 p-3 mx-5'
                style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                onSubmit={handleEditOnSubmit}
              >
                <div className='justify-content-center d-flex my-2 p-4'>
                  <h3>Form Edit Customer</h3>
                </div>
                <div className='form-row d-flex my-5'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='firstName'>FirstName:</label>
                    <input
                      id='firstName'
                      type='text'
                      name='firstName'
                      value={formEditCust.firstName}
                      className='mx-2'
                      onChange={handleEditOnChange}
                      style={{ width: "70%", borderRadius: "5px" }}
                      required
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label htmlFor='lastName'>LastName:</label>
                    <input
                      id='lastName'
                      type='text'
                      name='lastName'
                      value={formEditCust.lastName}
                      className='mx-2'
                      onChange={handleEditOnChange}
                      style={{ width: "70%", borderRadius: "5px" }}
                      required
                    />
                  </div>
                </div>
                
               
               
                <div className='form-group col-md-7 my-5'>
                  <label htmlFor='email' className='mx-2'>Email:</label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formEditCust.email}
                    className='mx-3 '
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px",marginLeft:"20px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-7 my-5'>
                  <label htmlFor='phoneNumber' className='mx-1'>Phone:</label>
                  <input
                    id='phoneNumber'
                    type='text'
                    name='phoneNumber'
                    value={formEditCust.phoneNumber}
                    className='mx-3'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-7 my-5'>
                  <label htmlFor='address'>Address:</label>
                  <input
                    id='address'
                    type='text'
                    name='address'
                    value={formEditCust.address}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
               
              
                <div className='form-button text-center d-flex justify-content-end'>
                <button type="button"className='p-2 mx-2'style={{backgroundColor: "#CCFBF0" }} onClick={(e) => {e.preventDefault(); handleOpenPasswordModal();}}>
                      Change Password
                    </button>
                  <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        )}
           <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
            <Modal.Header>
              <Modal.Title>
                 <img
              src='/assets/assetsAdmin/logo.png'
              width='100'
              height='100'
              alt='Logo'
              className='mx-4'
            />
           Update Change Password  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter new password"
                value={passwordChange.password}
                onChange={handlePasswordChangeOnChange}
                required
              />
            </div>
          
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordChange.confirmPassword}
                onChange={handlePasswordChangeOnChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>Close</Button>
          <Button variant="primary" onClick={handlePasswordChangeSubmit}>Change Password</Button>
        </Modal.Footer>
          </Modal>
      </div>
    );
  };
