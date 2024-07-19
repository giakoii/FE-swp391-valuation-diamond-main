import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./styles.css"; // Import the CSS file

const Typevaluation = () => {
  const [apiData, setApiData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://valuation.techtheworld.id.vn/service_price_list/getServicePriceLists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchServiceData = async () => {
      try {
        const response = await fetch(
          "https://valuation.techtheworld.id.vn/service/getServices"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service data");
        }
        const data = await response.json();
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
    fetchServiceData();
  }, []);

  useEffect(() => {
    // Ensure serviceData and apiData are both fetched before merging
    if (serviceData.length > 0 && apiData.length > 0) {
      const mergedData = apiData.map((item) => {
        const service = serviceData.find(
          (serviceItem) => serviceItem.serviceId === item.serviceId
        );
        return {
          ...item,
          serviceType: service ? service.serviceType : "Unknown",
        };
      });

      setApiData(mergedData);
    }
  }, [serviceData, apiData]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ marginTop: "20px"}}>
      <div>
        <Row>
          <Col>
            <div className="service-type-header">
              <h1 style={{ marginTop: "50px" }}>
                Types Of Diamond Valuation Services
              </h1>{" "}
              {/* Apply custom class */}
            </div>
            <Table striped bordered hover style={{}}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>SERVICE TYPE</th>
                  <th style={{ textAlign: "center" }}>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((service, index) => (
                  <tr key={service.serviceId} style={{ textAlign: "center" }}>
                    <td>{service.serviceId}</td>
                    <td>{service.serviceType}</td>
                    <td>{service.serviceDescription}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="service-type-header">
              <h1 style={{ marginTop: "50px" }}>
                Detailed List Of Types Of Pricing Services
              </h1>{" "}
              {/* Apply custom class */}
            </div>
            <Table striped bordered hover style={{ marginTop: "20px" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Service Type</th>
                  <th>Size From</th>
                  <th>Size To</th>
                  <th>Initial Price</th>
                  <th>Price Unit</th>
                  <th>Price List</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{item.serviceId.serviceType}</td>
                    <td>{item.sizeFrom}</td>
                    <td>{item.sizeTo}</td>
                    <td>{item.initPrice}</td>
                    <td>{item.priceUnit}</td>
                    <td>{item.priceList}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-center">
              <div className="pagination">
                <button
                  className="btn btn-primary"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ backgroundColor: "green" }}
                >
                  Previous
                </button>

                {/* Display page numbers */}
                {Array.from(
                  { length: Math.ceil(apiData.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={`btn ${
                        currentPage === index + 1
                          ? "btn-primary"
                          : "btn-secondary"
                      } text-dark bg-white`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  className="btn btn-primary"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastItem >= apiData.length}
                  style={{ backgroundColor: "green" }}
                >
                  Next
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Typevaluation;
