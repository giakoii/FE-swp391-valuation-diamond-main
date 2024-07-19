import React, { useEffect, useState } from "react";
import "./Calculate.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate/formattedDate";
import './Calculate.css'
import { API_BASE_URL } from "../../../utils/constants/url";

export const CalculateOutput = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultRecommend, setResultRecommend] = useState([])
  const [error, setError] = useState(null);
  const location = useLocation();

  //default price
  const queryParams = new URLSearchParams(location.search).toString();
  const diamondCalculateDefault = {
    diamondOrigin: "Natural",
    shape: "Round",
    caratWeight: 1,
    clarity: "FL",
    color: "K",
    cut: "Fair",
    symmetry: "Fair",
    polish: "Fair",
    fluorescence: "Very Strong",
  };
  // default recommend list
  const diamondRecommendDefault = {
    assessOrigin: "Natural",
    assessShapeCut: "Round",
    assessCarat: 1,
    assessClarity: "FL",
    assessColor: "K",
    assessCut: "Fair",
    symmetry: "Fair",
    polish: "Fair",
    fluorescence: "Very Strong",
  }
  const queryParamsDefault = new URLSearchParams(diamondCalculateDefault).toString()
  // get list recommend after calculate
  const query = new URLSearchParams(queryParams)
  const queryRecommendDefault = new URLSearchParams(diamondRecommendDefault).toString()
  const queryRecommendCalculate = `assessOrigin=${query.get('diamondOrigin')}&assessShapeCut=${query.get('shape')}&assessCarat=${query.get('caratWeight')}&assessClarity=${query.get('clarity')}&assessColor=${query.get('color')}&assessCut=${query.get('cut')}&symmetry=${query.get('symmetry')}&polish=${query.get('polish')}&fluorescence=${query.get('fluorescence')}`
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          queryParams ? `${API_BASE_URL}/getDB2/calculate/price?${queryParams}` : `${API_BASE_URL}/getDB2/calculate/price?${queryParamsDefault}`
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

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          queryParams ? `${API_BASE_URL}/api/diamond-assessments/search?${queryRecommendCalculate}` : `${API_BASE_URL}/api/diamond-assessments/search?${queryRecommendDefault}`
        );
        const data = await response.json();
        const sortData = data.sort((a, b) => a.price - b.price)
        setResultRecommend(sortData);
        console.log('assess', sortData)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [queryParams]);

  console.log(resultRecommend)



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
      <div className="pt-4 mb-3 calculate-output ">
        <div>
          <div className="d-flex justify-content-center mb-1">
            <div className="fw-bold fs-4 text-muted mb-3">DIAMOND PRICE</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="quality-diamond">

            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="fw-bold fs-1 p-2 border border-dark mb-3"
              style={{ borderRadius: "15px" }}
            >
              {result.baseFinalPrice
                ? `$${Math.round(result.baseFinalPrice
                )}` : 0}
            </div>
          </div>
        </div>
        <Row>
          <Col md={6} className="text-center p-4">
            <div>Time</div>
            {/* <div className="fw-bold">{`${result.last30DaysChange}%`}</div> */}
            <div className="fw-bold ">{`${formattedDate(result.currentDate)}`}</div>

          </Col>
          <Col md={6} className="text-center p-4">
            <div>Estimate Range</div>
            <div className="fw-bold">{(result.minPrice && result.maxPrice) ? `$${Math.round(result.minPrice)} - $${Math.round(result.maxPrice)}` : 0}</div>
          </Col>
        </Row>
      </div>
      <div className="calculate-list">
        <div className="fs-5 ms-3 mb-4">Recommend Store</div>
        {resultRecommend.length > 0 ? (
          resultRecommend.map((store, index) => (
            <div className="calculate-item mb-3" key={index}>
              <Row>
                <Col md={2}>
                  <img src={store.imageUrl} alt="" width="80px" height="100%" />
                </Col>
                <Col md={9} className="m-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-center">
                      <div className="fw-bold">{store.assessOrigin}</div>
                      <div>Origin</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{store.assessCut}</div>
                      <div>Cut</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{store.assessCarat}</div>
                      <div>Carat</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{store.assessClarity}</div>
                      <div>Clarity</div>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">{store.assessColor}</div>
                      <div>Color</div>
                    </div>
                    <div>
                      <img src={store.brand} alt="" width="100px" height="50px" />
                    </div>
                    <div className="fw-bold">{`$${store.price}`}</div>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div className="mx-4 fw-bold">Not found similar diamond</div>
        )}
      </div>
    </div>
  );
};
