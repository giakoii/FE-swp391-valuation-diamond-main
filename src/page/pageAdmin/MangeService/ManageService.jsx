import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Pagination, Table } from "react-bootstrap";
import './ManageService.css'
import Swal from "sweetalert2";

export const ManageService = () => { 
    const [viewService, setViewService] = useState([]);
    const [showAddService, setShowAddService] = useState(false);
    const [showPriceList, setShowPriceList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editRowId, setEditRowId] = useState(null);
    const [editServiceType, setEditServiceType] = useState('');
    const [editServiceDescription, setEditServiceDescription] = useState('');
    const [formAddService, setFormAddService] = useState({
        serviceType:'',
        serviceDescription:'',
    });
    const [formAddNewServicePriceList,setformAddNewServicePriceList] = useState({
        sizeFrom : '',
        sizeTo:'',
        initPrice:'',
        priceUnit:'',
        serviceId:'',
});
    const [servicePriceList, setServicePriceList] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [editPriceRowId, setEditPriceRowId] = useState(null);
    const [editPriceList, setEditPriceList] = useState({});

    const handleShow = () => setShowAddService(true);
    const handleClose = () => setShowAddService(false);
    const handlePriceListClose = () => setShowPriceList(false);

    // Fetch service data 
    useEffect(() => {
        const fetchDataService = async() => { 
            try { 
                const response = await fetch('http://localhost:8080/service/getServices');
                const data = await response.json(); 
                setViewService(data);
            } catch(error) {
                console.error("Error getting service: " + error );
            }
        };
        fetchDataService();
    }, []);

    // Update service type
    const handleOnServiceTypeChange = (serviceId) => {
        const fetchUpdateData = async() => {
            try {
                await fetch(`/api/service/${serviceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ serviceType: editServiceType }),
                });
                setViewService(prevState => prevState.map(service => 
                    service.serviceId === serviceId ? { ...service, serviceType: editServiceType } : service
                ));
                setEditRowId(null); 
            } catch(error) {
                console.error("Error updating service type: " + error);
            }
        };
        fetchUpdateData();
    };

    // Update service description
    const handleOnServiceDescriptionChange = (serviceId) => {
        const fetchUpdateData = async() => {
            try {
                await fetch(`http://localhost:8080/service/update/${serviceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ serviceDescription: editServiceDescription }),
                });
                setViewService(prevState => prevState.map(service => 
                    service.serviceId === serviceId ? { ...service, serviceDescription: editServiceDescription } : service
                ));
                setEditRowId(null); 
            } catch(error) {
                console.error("Error updating service description: " + error);
            }
        };
        fetchUpdateData();
    };

    // Handle change in add service form
    const handleOnChangeAddService = (e) => { 
        const { name, value } = e.target;
        setFormAddService({
            ...formAddService,
            [name] : value ,
        });
    };

    // Add new service
    const handleAddNewService = async(e) => {
        e.preventDefault();
        try { 
            const response = await fetch('http://localhost:8080/service/create', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(formAddService),
            });
            if (response.ok) {
                const newDataServiceAdd = await response.json();
                setViewService([...viewService, newDataServiceAdd]);
                Swal.fire({
                    title: 'Success!',
                    text: 'Add new Service successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                handleClose();
            }
        } catch(error) {
            console.error('Error saving new service: ' + error);
        }
    };
    // price LIst is exist
    const checkServicePriceListEmpty = async (serviceId) => {
        try {
            const response = await fetch(`http://localhost:8080/service_price_list/getServicePrice/${serviceId}`);
            const priceList = await response.json();
            return priceList.length === 0;
        } catch (error) {
            console.error("Error checking service price list: " + error);
            return false;
        }
    };
    // Delete service
    const handleDeleteService = async(serviceId) => {
        const isPriceListEmpty = await checkServicePriceListEmpty(serviceId);
    
    if (!isPriceListEmpty) {
        Swal.fire({
            title: 'Error!',
            text: 'Cannot delete service with existing price lists. Please delete all associated price lists first.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return;
    }

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this service?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const fetchDeleteData = async() => {
                    try {
                        await fetch(`/api/service/${serviceId}`, {
                            method: 'DELETE',
                        });
                        setViewService(prevState => prevState.filter(service => service.serviceId !== serviceId));
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Service has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    } catch(error) {
                        console.error("Error deleting service: " + error);
                    }
                };
                fetchDeleteData();
            }
        });
    };
    // Fetch service price list by service ID
    const handleViewServicePriceList = async(serviceId) => {
        setSelectedServiceId(serviceId);
        try {
            const response = await fetch(`http://localhost:8080/service_price_list/getServicePrice/${serviceId}`);
            const data = await response.json();
            setServicePriceList(data);
            setShowPriceList(true);
        } catch(error) {
            console.error("Error fetching service price list: " + error);
        }
    };

    const [showFormAddNewPriceList, setShowFormAddNewPriceList] = useState(false);
    const showModalFormAddNewPriceList = () => setShowFormAddNewPriceList(true);
    const closeFormAddNewPriceList = () =>setShowFormAddNewPriceList(false);
    const handleSaveNewPriceList = (e) => {
        const { name, value } = e.target;
        if (value < 0) {
            Swal.fire({
                title: 'Error!',
                text: `${name} must be a positive number.`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        setformAddNewServicePriceList({
            ...formAddNewServicePriceList,
            [name]: value,
        });
    };

    // Handle submit for saving new price list
    const handleSubmitSaveNewPriceList = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/service_price_list/addPriceList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formAddNewServicePriceList,
                    serviceId: selectedServiceId,
                }),
            });
            if (response.ok) {
                const newPriceList = await response.json();
                setServicePriceList([...servicePriceList, newPriceList]);
                Swal.fire({
                    title: 'Success!',
                    text: 'Add new Price List successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setformAddNewServicePriceList({
                    sizeFrom: '',
                    sizeTo: '',
                    initPrice: '',
                    priceUnit: '',
                    serviceId: selectedServiceId,
                });
                setShowFormAddNewPriceList(false); // Close modal after successful submission
            }
        } catch (error) {
            console.error("Error Save New Price List: " + error);
        }
    };

    // Handle edit price list
    const handleEditPriceList = (priceList, field, value) => {
        if (value < 0) {
            Swal.fire({
                title: 'Error!',
                text: `${field} must be a positive number.`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        setEditPriceList(prevState => ({
            ...prevState,
            [priceList]: {
                ...prevState[priceList],
                [field]: value,
            },
        }));
    };

    const handleSaveEditPriceList = async (priceListId) => {
        const editedPriceList = editPriceList[priceListId];
        if (!editedPriceList) return;
    
        try {
            const response = await fetch(`http://localhost:8080/service_price_list/updateServicePriceListById/${priceListId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedPriceList),
            });
    
            if (response.ok) {
                const updatedPriceList = await response.json();
                setServicePriceList(prevState => 
                    prevState.map(priceList =>
                        priceList.priceList === priceListId ? updatedPriceList : priceList
                    )
                );
                setEditPriceRowId(null);
                setEditPriceList(prevState => {
                    const newState = { ...prevState };
                    delete newState[priceListId];
                    return newState;
                });
                Swal.fire({
                    title: 'Success!',
                    text: 'Price List updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error("Error updating price list: " + error);
        }
    };
    
    // Delete price list item
    const handleDeletePriceList = (priceList) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this price list item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const fetchDeleteData = async() => {
                    try {
                        await fetch(`/api/servicePriceList/${priceList}`, {
                            method: 'DELETE',
                        });
                        setServicePriceList(prevState => prevState.filter(price => price.priceList !== priceList));
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Price list item has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    } catch(error) {
                        console.error("Error deleting price list item: " + error);
                    }
                };
                fetchDeleteData();
            }
        });
    };

    // Pagination logic
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = viewService.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    let active = currentPage;
    let items = [];
    for (let number = 1; number <= Math.ceil(viewService.length / itemsPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={(event) => paginate(event, number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container>
            <div className='justify-content-first d-flex my-2 p-4'>
                <img
                    src='/src/assets/assetsAdmin/book.svg'
                    width='40'
                    height='40'
                    className='my-3'
                    alt='Logo'
                />
                <h4 className='p-4'>Manage Service</h4>
                <Button onClick={handleShow} className="nav-link h-100 my-4">
                    <img
                        src='/src/assets/assetsAdmin/plus.svg'
                        width='40'
                        height='40'
                        alt='Add'
                    />
                </Button>
            </div>
            <div className="service-list fs-5">
                <div>
                    <div className='row mx-2 my-2'>
                        <p className='col-md-2'>ServiceID</p>
                        <p className='col-md-3'>Service Type</p>
                        <p className='col-md-3'>Service Description</p>
                        <p className='col-md-2'></p>
                        <p className='col-md-2'></p>
                    </div>
                </div>
                {currentPosts.map((dataService) => (
                    <div key={dataService.serviceId} className="service-card my-4 border hover">
                        <div className="row">
                            <p className='col-md-2'> {dataService.serviceId}</p>
                            <div className='col-md-3'>
                                {editRowId === dataService.serviceId && editServiceType !== '' ? (
                                    <>
                                        <Form.Control type="text" 
                                            value={editServiceType}
                                            onChange={(e) => setEditServiceType(e.target.value)}
                                        />
                                        <Button onClick={() => handleOnServiceTypeChange(dataService.serviceId)}>Save</Button>
                                    </>
                                ) : (
                                    <div className='d-flex justify-content-between'>
                                        <div>{dataService.serviceType}</div>
                                        <img
                                            src="/src/assets/assetsStaff/editStatus.svg"
                                            alt="Edit"
                                            height="20"
                                            width="20"
                                            onClick={() => {
                                                setEditRowId(dataService.serviceId);
                                                setEditServiceType(dataService.serviceType);
                                            }}
                                        />
                                    </div>
                                )} 
                            </div>
                            <div className='col-md-3'>
                                {editRowId === dataService.serviceId && editServiceDescription !== '' ? (
                                    <>
                                        <Form.Control type="text" 
                                            value={editServiceDescription}
                                            onChange={(e) => setEditServiceDescription(e.target.value)}
                                        />
                                        <Button onClick={() => handleOnServiceDescriptionChange(dataService.serviceId)}>Save</Button>
                                    </>
                                ) : (
                                    <div className='d-flex justify-content-between'>
                                        <div>{dataService.serviceDescription}</div>
                                        <img
                                            src="/src/assets/assetsStaff/editStatus.svg"
                                            alt="Edit"
                                            height="20"
                                            width="20"
                                            onClick={() => {
                                                setEditRowId(dataService.serviceId);
                                                setEditServiceDescription(dataService.serviceDescription);
                                            }}
                                        />
                                    </div>
                                )} 
                            </div> 
                            <div className='col-md-3 d-flex justify-content-center'>
                                <Button className="h-50 my-4" onClick={() => handleViewServicePriceList(dataService.serviceId)}> View Service Price List</Button>
                            </div>
                            <div className="col-md-1">
                                <Button className="nav-link" onClick={() => handleDeleteService(dataService.serviceId)}>
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
            </div>
            <Pagination>{items}</Pagination>
                {/* Modal Add New Service */}
            <Modal show={showAddService} onHide={handleClose} className="p-5" size='lg'>
                <Modal.Header closeButton>
                <img
                    src='/src/assets/assetsAdmin/logo.png'
                    width='80'
                    height='80'
                    alt='Logo'
                    className=''
                  />
                <Modal.Title className="d-flex justify-content-center w-100">Add New Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    className='form-row my-5 p-3 mx-5'
                    style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                    onSubmit={handleAddNewService}
                >
                    <div className="form-group p-4">
                        <label htmlFor="serviceType">Service Type</label>
                        <input type="text"
                            id="serviceType"
                            name="serviceType"
                            value={formAddService.serviceType}
                            onChange={handleOnChangeAddService}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group p-4">
                        <label htmlFor="serviceDescription">Service Description</label>
                        <textarea type="text"
                            id="serviceDescription"
                            name="serviceDescription"
                            value={formAddService.serviceDescription}
                            onChange={handleOnChangeAddService}
                            className="form-control"
                        />
                    </div>
                    <div className='form-button text-center d-flex justify-content-end'>
                        <button type="submit" className='p-2 mx-2' style={{ width: "70px", backgroundColor: "#CCFBF0" }}>Save</button>
                    </div>
                </Form>
            </Modal.Body>
            </Modal>
            
            {/* Modal View Service Price List */}
            <Modal show={showPriceList} onHide={handlePriceListClose} className="p-5" size="xl">
    <Modal.Header closeButton>
        <img
            src="/src/assets/assetsAdmin/logo.png"
            width="80"
            height="80"
            alt="Logo"
            className=""
        />
        <Modal.Title className="d-flex justify-content-center w-100">Service Price List</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className="d-flex justify-content-end mx-5 px-3 my-5">
        <Button onClick={showModalFormAddNewPriceList}>Add New Price List</Button>
        </div>
        <div className="form-row my-5 p-3 mx-5">
        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Price List</th>
                                <th>Size From</th>
                                <th>Size To</th>
                                <th>Init Price</th>
                                <th>Price Unit</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicePriceList.length > 0 ? (
                                servicePriceList.map((price, index) => (
                                    <tr key={price.priceList}>
                                        <td>{index + 1}</td>
                                        <td>{price.priceList}</td>
                                        <td>
                                            {editPriceRowId === price.priceList ? (
                                                <Form.Control
                                                    type="number"
                                                    value={editPriceList.sizeFrom}
                                                    onChange={(e) => handleEditPriceList(price.priceList, 'sizeFrom', e.target.value)}
                                                />
                                            ) : (
                                                price.sizeFrom
                                            )}
                                        </td>
                                        <td>
                                            {editPriceRowId === price.priceList ? (
                                                <Form.Control
                                                    type="number"
                                                    value={editPriceList.sizeTo}
                                                    onChange={(e) => handleEditPriceList(price.priceList, 'sizeTo', e.target.value)}
                                                />
                                            ) : (
                                                price.sizeTo
                                            )}
                                        </td>
                                        <td>
                                            {editPriceRowId === price.priceList ? (
                                                <Form.Control
                                                    type="number"
                                                    value={editPriceList.initPrice}
                                                    onChange={(e) => handleEditPriceList(price.priceList, 'initPrice', e.target.value)}
                                                />
                                            ) : (
                                                price.initPrice
                                            )}
                                        </td>
                                        <td>
                                            {editPriceRowId === price.priceList ? (
                                                <Form.Control
                                                    type="text"
                                                    value={editPriceList.priceUnit}
                                                    onChange={(e) => handleEditPriceList(price.priceList, 'priceUnit', e.target.value)}
                                                />
                                            ) : (
                                                price.priceUnit
                                            )}
                                        </td>
                                        <td>
                                            {editPriceRowId === price.priceList ? (
                                                <Button onClick={() => handleSaveEditPriceList(price.priceList)}>Save</Button>
                                            ) : (
                                                <Button onClick={() => setEditPriceRowId(price.priceList)}>Edit</Button>
                                            )}
                                        </td>
                                        <td>
                                       
                                <Button className="nav-link" onClick={() => handleDeletePriceList(price.priceList)}>
                                    <img
                                        src='/src/assets/assetsAdmin/trash.svg'
                                        width='20'
                                        height='20'
                                        className='my-3'
                                        alt='Delete'
                                    />
                                </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No price data available for this service.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
        </div>
    </Modal.Body>
</Modal>
                        {/* modal show add new price List */}
        <Modal show={showFormAddNewPriceList} onHide={closeFormAddNewPriceList} size = 'lg'>
            <Modal.Header closeButton>
            <img
                src='/src/assets/assetsAdmin/logo.png'
                width='80'
                height='80'
                alt='Logo'
                className=''
              />
              <Modal.Title className='w-100 d-flex justify-content-center'>Add New Service Price List</Modal.Title>

            </Modal.Header>
            <Modal.Body>
            <Form
                className='form-row my-5 p-3 mx-5'
                style={{ width: "650px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                onSubmit={handleSubmitSaveNewPriceList}
              >
                <div className='justify-content-center d-flex my-2 p-4'>
                  <h3>Form Add Price List</h3>
                </div>
                <div className='form-group col-md-6 my-5 mx-4'>
                  <label htmlFor='sizeFrom'>Size From:</label>
                  <input
                    id='sizeFrom'
                    type='number'
                    name='sizeFrom'
                    value={formAddNewServicePriceList.sizeFrom}
                    className='mx-2'
                    onChange={handleSaveNewPriceList}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5 mx-4'>
                  <label htmlFor='sizeTo'>Size To:</label>
                  <input
                    id='sizeTo'
                    type='number'
                    name='sizeTo'
                    value={formAddNewServicePriceList.sizeTo}
                    className='mx-3'
                    onChange={handleSaveNewPriceList}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5 mx-4'>
                  <label htmlFor='initPrice'>Init Price:</label>
                  <input
                    id='initPrice'
                    type='number'
                    name='initPrice'
                    value={formAddNewServicePriceList.initPrice}
                    className='mx-2'
                    onChange={handleSaveNewPriceList}
                    style={{ width: "70%", borderRadius: "5px" }}
                    required
                  />
                </div>
                <div className='form-group col-md-6 my-5 mx-4'>
                  <label htmlFor='priceUnit'>Price Unit:</label>
                  <input
                    id='priceUnit'
                    type='number'
                    name='priceUnit'
                    value={formAddNewServicePriceList.priceUnit}
                    className='mx-2'
                    onChange={handleSaveNewPriceList}
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

        </Container>
    );
}
