import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formattedDate from "../../utils/formattedDate/formattedDate";
import formattedDateTime from "../../utils/formattedDate/formattedDateTime";

export const ValuationOrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //
  const [editRowId, setEditRowId] = useState(null);
  const [editColIsDiamond, setEditColIsDiamond] = useState(false);
  const [editColStatus, setEditColStatus] = useState(false);
  //
  const [editStatus, setEditStatus] = useState('');
  const [editIsDiamond, setEditIsDiamond] = useState(true);
  const [image, setImage] = useState("");

  const staff = JSON.parse(localStorage.getItem('staff'));
  const navigate = useNavigate(); 

  const API = 'http://localhost:8080/order_detail_request/getOrderDetails';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [editIsDiamond, editStatus]);

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const APIUpdate = 'http://localhost:8080/order_detail_request/updateAllOD';
  
  const handleOnChangeStatus = (productId, field, value) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${APIUpdate}/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        console.log('Update response:', data);
        toast.success('Update successfully.');
        setEditRowId(null);
        setEditColIsDiamond(false);
        setEditColStatus(false);
      } catch (error) {
        toast.error('Error updating status');
      }
    };
    fetchUpdateStatus();
  };

  const handleCreateForm = (product) => {
    navigate('/staff/valuation', { state: { product } });
  };

  if (isLoading) {
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }

  return (
    <Container>
      <ToastContainer />
      <div className="text-center my-4">
        <h1>Valuation's Staff Product</h1>
      </div>
      <Table>
        <thead>
          <tr className="text-center">
            <th>Sample Valuation Id</th>
            <th>Image</th>
            <th>Service</th>
            <th>Dealine</th>
            <th>Size</th>
            <th>Diamond</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((product) => (
            <tr key={product.orderDetailId} className="text-center">
              <td>{product.orderDetailId}</td>
              <td>
                <div>
                  {product.img || image ? (
                    <div>
                      <img src={product.img || image} alt="clarity-characteristics-upload" height='80' width='80' className='border border-dark' />
                      {image && <Button onClick={() =>{
                        handleOnChangeStatus(product.orderDetailId, 'img', image)}}>Save</Button>}
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="upload-img">
                        <img
                          src="/src/assets/assetsStaff/upload.svg"
                          alt="Upload Icon"
                          height='40px'
                          width='40px'
                          onClick={()=>{
                            setEditRowId(product.orderDetailId);
                            setEditColIsDiamond(true);
                            setEditColStatus(false);
                          }}
                        />
                      </label>
                      <input type="file" id="upload-img" onChange={handleUploadImage} accept=".jpg, .jpeg, .png" style={{ display: 'none' }} />
                    </div>
                  )}
                </div>
              </td>
              <td>{product.serviceId.serviceType}</td>
              <td>{formattedDateTime(product.receivedDate)}</td>
              <td>{product.size}</td>
              <td>
                {editRowId === product.orderDetailId && editColIsDiamond ? (
                  <>
                    <Form.Select
                      aria-label="Is Diamond"
                      name="isDiamond"
                      value={editIsDiamond}
                      onChange={(e) => setEditIsDiamond(e.target.value === 'true')}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Select>
                    <Button onClick={() => handleOnChangeStatus(product.orderDetailId, 'isDiamond', editIsDiamond)}>Save</Button>
                  </>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">{product.isDiamond ? "Yes" : "No"}</div>
                    <img
                      src="/src/assets/assetsStaff/editStatus.svg"
                      alt="Edit"
                      height="20"
                      width="20"
                      onClick={() => {
                        setEditRowId(product.orderDetailId);
                        setEditIsDiamond(product.isDiamond);
                        setEditColIsDiamond(true);
                        setEditColStatus(false);
                      }}
                    />
                  </div>
                )}
              </td>
              <td>
                {editRowId === product.orderDetailId && editColStatus ? (
                  <>
                    <Form.Select
                      aria-label="Status"
                      value={editStatus}
                      name="status"
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Received">Received</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Finished">Finished</option>
                    </Form.Select>
                    <Button onClick={() => handleOnChangeStatus(product.orderDetailId, 'status', editStatus)}>Save</Button>
                  </>
                ) : (
                  <div className="d-flex justify-content-between">
                    <div>{product.status}</div>
                    <img
                      src="/src/assets/assetsStaff/editStatus.svg"
                      alt="Edit"
                      height="20"
                      width="20"
                      onClick={() => {
                        setEditRowId(product.orderDetailId);
                        setEditStatus(product.status);
                        setEditColStatus(true);
                        setEditColIsDiamond(false);
                      }}
                    />
                  </div>
                )}
              </td>
              <td>
                <Button onClick={() => handleCreateForm(product)} disabled={!product.isDiamond || product.status !== 'Finished'}>Create Certificate</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
