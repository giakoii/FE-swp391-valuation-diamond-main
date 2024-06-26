import React, { useEffect, useState } from 'react';
import './ManageStaff.css';
import { Modal, Button, Form, Pagination, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import formattedDate from '../../../utils/formattedDate/formattedDate';

export const ManageStaff = () => {
  const [dataStaff, setDataStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formContainStaffById, setFormContainStaffById] = useState(null);
  const [showFormInfor, setShowFormInfor] = useState(false);
  const [formAddStaff, setFormAddStaff] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: '',
  });
  const [formEditStaff, setFormEditStaff] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredSelection, setFilteredSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAddStaff({
      ...formAddStaff,
      [name]: value,
    });
  };

  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setFormEditStaff({
      ...formEditStaff,
      [name]: value,
    });
  };

  // Save new staff
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usernameHavedTrim = formAddStaff.userId.trim();
    const passwordHavedTrim = formAddStaff.password.trim();
    
    if (formAddStaff.password !== formAddStaff.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Confirm Password failed.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    
    if (usernameHavedTrim.length < 8 || passwordHavedTrim.length < 8) {
      Swal.fire({
        title: 'Error!',
        text: 'Username or password must be greater than 8 characters.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const formSendAddNewStaff = {
      userId: usernameHavedTrim,
      password: passwordHavedTrim,
      firstName: formAddStaff.firstName,
      lastName: formAddStaff.lastName,
      role: formAddStaff.role,
    };
      console.log(formSendAddNewStaff);
    try {
      const response = await fetch('http://localhost:8080/user_request/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSendAddNewStaff),
    
      });
      if (response.ok) {
        const newStaff = await response.json();
        setDataStaff([...dataStaff, newStaff]);
        setFilteredSelection([...dataStaff, newStaff]);
        Swal.fire({
          title: 'Success!',
          text: 'Add new staff successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

       
        handleClose();
      } else if (response.status === 400) { 
        Swal.fire({
          title: 'Error!',
          text: 'Username is already existed.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        console.log('Save failed');
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  // Fetch staff data
  useEffect(() => {
    const fetchDataStaff = async () => {
      try {
        const response = await fetch('http://localhost:8080/user_request/getAllStaff');
        const data = await response.json();
        setDataStaff(data);
        setFilteredSelection(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataStaff();
  }, []);

  // Show staff information
  const handleShowStaffInfor = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user_request/getAUser/${userId}`);
      const staff = await response.json();
      setFormContainStaffById(staff);
      setShowFormInfor(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseStaffInfor = () => {
    setShowFormInfor(false);
    setFormContainStaffById(null);
  };

  // Show edit staff form
  const handleShowEditStaff = async (staffId) => {
    try {
      const response = await fetch(`http://localhost:8080/user_request/getAUser/${staffId}`);
      const staff = await response.json();
      setFormEditStaff(staff);
      setOriginalData(staff); // Store the original data
      setShowEditForm(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseEditStaff = () => {
    setShowEditForm(false);
    setFormEditStaff(null);
    setOriginalData(null);
  };

  // Handle edit staff form submit
  const handleEditOnSubmit = async (e) => {
    e.preventDefault();
    if (!formEditStaff) return;
  
    const passwordHavedTrim = formEditStaff.password.trim();
  
    if (passwordHavedTrim.length < 8) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be greater than 8 characters.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/user_request/updateUser/${formEditStaff.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formEditStaff),
      });
  
      if (response.ok) {
        const updatedStaff = await response.json();
        setDataStaff((prevData) =>
          prevData.map((staff) => (staff.userId === updatedStaff.userId ? updatedStaff : staff))
        );
        setFilteredSelection((prevData) =>
          prevData.map((staff) => (staff.userId === updatedStaff.userId ? updatedStaff : staff))
        );
        Swal.fire({
          title: 'Success!',
          text: 'Staff updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        handleCloseEditStaff();
      } else {
        console.log('Update failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  //delete staff
  const handleDeleteStaff = async (userId) => {
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
        const response = await fetch(`http://localhost:8080/user_request/deleteUser/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setDataStaff(dataStaff.filter(staff => staff.userId !== userId));
          setFilteredSelection(filteredSelection.filter(staff => staff.userId !== userId));
          Swal.fire(
            'Deleted!',
            'Staff has been deleted.',
            'success'
          );
        } else {
          console.log('Delete failed');
        }
      } catch (error) {
        console.log('Error:', error);
      }
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
    const filteredData = dataStaff.filter((item) => item.userId.toString().includes(searchTerm));
    setFilteredSelection(filteredData);
  };
    return (
      <div className='container'>
        <div className='justify-content-first d-flex my-2 p-4'>
          <img
            src='/src/assets/assetsAdmin/person.svg'
            width='40'
            height='40'
            className='my-3'
            alt='Logo'
          />
          <h4 className='p-4'>Manage Staff</h4>
          <Button onClick={handleShow} className="nav-link h-100 my-4" >
            <img
              src='/src/assets/assetsAdmin/plus.svg'
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
        <div className="staff-list fs-5">
          <div>
            <div className='row  mx-2 my-2'>
              <p className='col-md-2'>StaffID</p>
              <p className='col-md-3'>StaffName</p>
              <p className='col-md-3'>Phone</p>
              <p className='col-md-2'>Email</p>
            </div>
          </div>
          {currentPosts.map((dataStaff, index) => (
            <div key={`staff_${dataStaff.userId}_${index}`} className="staff-card my-4 border hover">
              <div className="row">
                <p className='col-md-2'> {dataStaff.userId}</p>
                <p className='col-md-3'>{dataStaff.firstName +' '+ dataStaff.lastName}</p>
                <p className='col-md-3'> {dataStaff.email}</p>
                <p className='col-md-2'>{dataStaff.phoneNumber}</p>
                <div className='col-md-2 d-flex justify-content-around'>
                  <Button onClick={() => handleShowStaffInfor(dataStaff.userId)} className='nav-link'>
                    <img
                      src='/src/assets/assetsAdmin/eye.svg'
                      width='20'
                      height='20'
                      className='my-3'
                      alt='View'
                    
                    />
                  </Button>
                  <Button onClick={() => handleShowEditStaff(dataStaff.userId)} className="nav-link">
                    <img
                      src='/src/assets/assetsAdmin/pen.svg'
                      width='20'
                      height='20'
                      className='my-3'
                      alt='Edit'
                    />
                  </Button>
                  <Button className="nav-link" onClick={() => handleDeleteStaff(dataStaff.userId)}>
                    <img
                      src='/src/assets/assetsAdmin/trash.svg'
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
                         
        <Modal show={showForm} onHide={handleClose} className='p-5' size='lg'>
          <Modal.Header closeButton className='mx-4'>
          <img
                    src='/src/assets/assetsAdmin/logo.png'
                    width='80'
                    height='80'
                    alt='Logo'
                    className=''
                  />
            <Modal.Title className="d-flex justify-content-center w-100">Add New Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className='form-row my-5 p-3 mx-5'
              style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
              onSubmit={handleOnSubmit}
            >
                <div className='justify-content-center d-flex my-2 p-4'>
                          <h3>Form Add New Staff</h3>
                </div>
              <div className='form-row d-flex my-5'>
                <div className='form-group col-md-6'>
                  <label htmlFor='firstName'>FirstName:</label>
                  <input
                    id='firstName'
                    type='text'
                    name='firstName'
                    value={formAddStaff.firstName}
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
                    value={formAddStaff.lastName}
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
                  value={formAddStaff.userId}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "70%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group col-md-6 my-5'>
                <label htmlFor='password'>Password:</label>
                <input
                  id='password'
                  type='password'
                  name='password'
                  value={formAddStaff.password}
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
                  value={formAddStaff.confirmPassword}
                  className='mx-2'
                  onChange={handleOnChange}
                  style={{ width: "50%", borderRadius: "5px" }}
                  required
                />
              </div>
              <div className='form-group d-flex'>
                    <Form.Label className='my-2'> Role : </Form.Label>
                    <Form.Select name='role' 
                                  value={formAddStaff.role}
                                  onChange={handleOnChange}
                                  className='w-50 mx-3'
                                  required >
                                <option value=''>Select Role</option>
                                <option value='evaluation_staff'>Evaluation Staff</option>
                                <option value='consultant_staff'>Consultant Staff</option>    

                    </Form.Select>
              </div>
              <div className='form-button text-center d-flex justify-content-end'>
                <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
                  {/* Modal show Infor Customer */}
        {formContainStaffById && (
            <Modal show={showFormInfor} onHide={handleCloseStaffInfor}  className='p-5' size='lg'>
                <Modal.Header closeButton>
          <img
            src='/src/assets/assetsAdmin/logo.png'
            width='80'
            height='80'
            alt='Logo'
            className=''
          />
          <Modal.Title className='w-100 d-flex justify-content-center'>INFORMATION OF Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <div className="card p-4" style={{ width: '100%', maxWidth: '700px' }}>
                <div className='container d-flex'>
                    <div>
                          <img src="https://www.beelancer.vn/storage/2022/10/casemiro-365x405.jpg" alt="staff" 
                                width='200'
                              height='200'
                            />
                    </div>
                    <div>
                            <div className='container d-flex'>
                          <h4 className='p-4'> {formContainStaffById.firstName+' '+ formContainStaffById.lastName}</h4>
                          <p className='p-4 my-1'>
                          <img
                              src='/src/assets/assetsAdmin/map.svg'
                              width='20'
                              height='20'
                              alt='Logo'
                              className=''
                            />
                              {formContainStaffById.address}</p>
                              </div>
                        <div className='container'>
                        <p className='mx-4'><strong>ID:</strong> {formContainStaffById.userId} <strong className='mx-4'></strong><strong>Role:</strong> {formContainStaffById.role} </p>
                        <p className='mx-4'><strong>Phone:</strong> {formContainStaffById.phoneNumber}</p>
                        <p className='mx-4'><strong>Email:</strong> {formContainStaffById.email}</p>
                        <p className='mx-4'><strong>Password:</strong> {formContainStaffById.password}</p>
                        <p className='mx-4'><strong>Birthday:</strong> {formattedDate(formContainStaffById.birthday)}</p>
                        </div>
                </div>
                </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        )}
                  {/* Modal Edit Staff */}
        {formEditStaff && (
          <Modal show={showEditForm} onHide={handleCloseStaffInfor} className='p-5' size='lg'>
            <Modal.Header closeButton>
              <img
                src='/src/assets/assetsAdmin/logo.png'
                width='80'
                height='80'
                alt='Logo'
                className=''
              />
              <Modal.Title className='w-100 d-flex justify-content-center'>EDIT Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                className='form-row my-5 p-3 mx-5'
                style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                onSubmit={handleEditOnSubmit}
              >
                <div className='justify-content-center d-flex my-2 p-4'>
                  <h3>Form Edit Staff</h3>
                </div>
                <div className='form-row d-flex my-5'>
                  <div className='form-group col-md-6'>
                    <label htmlFor='firstName'>FirstName:</label>
                    <input
                      id='firstName'
                      type='text'
                      name='firstName'
                      value={formEditStaff.firstName}
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
                      value={formEditStaff.lastName}
                      className='mx-2'
                      onChange={handleEditOnChange}
                      style={{ width: "70%", borderRadius: "5px" }}
                      required
                    />
                  </div>
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='role'>Role:</label>
                  <input
                    id='role'
                    type='text'
                    name='role'
                    value={formEditStaff.role}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='password'>Password:</label>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    value={formEditStaff.password}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='email'>Email:</label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formEditStaff.email}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='phoneNumber'>Phone:</label>
                  <input
                    id='phoneNumber'
                    type='text'
                    name='phoneNumber'
                    value={formEditStaff.phoneNumber}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='address'>Address:</label>
                  <input
                    id='address'
                    type='text'
                    name='address'
                    value={formEditStaff.address}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5'>
                  <label htmlFor='birthday'>Birthday:</label>
                  <input
                    id='birthday'
                    type='text'
                    name='birthday'
                    value={formEditStaff.birthday}
                    className='mx-2'
                    onChange={handleEditOnChange}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
              
                <div className='form-button text-center d-flex justify-content-end'>
                  <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        )}
        
      </div>
    );
  };
