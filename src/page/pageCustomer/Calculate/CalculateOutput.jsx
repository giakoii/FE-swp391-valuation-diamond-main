import React, { useEffect, useState } from "react";
import "./Calculate.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import formattedDateTime from "../../../utils/formattedDate/formattedDateTime";

export const CalculateOutput = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search).toString();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/diamond/calculateFinalPrice?${queryParams}`
        );
        const data = await response.json();
        setResult(data);
        console.log(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <div className="text-danger">Error fetching data</div>;
  }

  if (!result) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <div className="border border-dark rounded pt-4 mb-3">
        <div>
          <div className="d-flex justify-content-center mb-1">
            <div className="fw-bold fs-4 text-muted">DIAMOND PRICE RANGE</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="quality-diamond">
              {/* {`${result.diamondOrigin} - ${result.shape} - ${result.carat} - ${result.clarity} - ${result.color} - ${result.cut}`} */}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="fw-bold fs-1 p-2 border border-dark"
              style={{ borderRadius: "15px" }}
            >
              {`$${Math.round(result.basePrice)}`}
            </div>
          </div>
        </div>
        <Row>
          <Col md={6} className="text-center p-4">
            <div>Time</div>
            {/* <div className="fw-bold">{`${result.last30DaysChange}%`}</div> */}
            <div className="fw-bold">{`${formattedDateTime(result.currentDate)}`}</div>

          </Col>
          <Col md={6} className="text-center p-4">
            <div>Estimate Range</div>
            <div className="fw-bold">{`$${Math.round(result.minPrice)}-$${Math.round(result.maxPrice)}`}</div>
          </Col>
        </Row>
      </div>
      {/* <div className="border border-dark rounded">
        <div className="fs-5 ms-3">Recommend Store</div>
        {result.stores.map((store, index) => (
          <div className="border border-dark rounded m-3" key={index}>
            <Row>
              <Col md={2}>
                <img src={store.imageUrl} alt="" width="80px" height="100%" />
              </Col>
              <Col md={9} className="m-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center">
                    <div className="fw-bold">{store.cut}</div>
                    <div>Cut</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.carat}</div>
                    <div>Carat</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.clarity}</div>
                    <div>Clarity</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.color}</div>
                    <div>Color</div>
                  </div>
                  <div>
                    <img src={store.logoUrl} alt="" width="100px" height="50px" />
                  </div>
                  <div className="fw-bold">{`$${store.price}`}</div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div> */}

    </div>
  );
};
