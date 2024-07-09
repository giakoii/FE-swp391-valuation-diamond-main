import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const Typevaluation = () => {
  const [apiData, setApiData] = useState([]);
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

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <h1 className="text-center">
            DIAMOND EVALUATION SERVICES CURRENTLY AVAILABLE AT DIAMOND VALUETION
          </h1>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th  style={{ textAlign: 'center' }}>No.</th>
                <th  style={{ textAlign: 'center' }}>SERVICE TYPE</th>
                <th  style={{ textAlign: 'center' }}>CONTENT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td  style={{ textAlign: 'center' }}>1</td>
                <td >Regular Evaluation</td>
                <td>
                  – The evaluation time depends on the time of submission.{" "}
                  <br />– Unlimited quantity. Service fee according to
                  regulations.
                </td>
              </tr>
              <tr>
                <td  style={{ textAlign: 'center' }}>2</td>
                <td >Fast Evaluation (3 hours)</td>
                <td>
                  – Evaluation completed within 3 working hours from the time of
                  product receipt.
                  <br /> – Quantity depends on the time of submission. Service
                  fee according to regulations.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>3</td>
                <td >Fast Evaluation (48 hours)</td>
                <td>
                  – Evaluation completed within 48 working hours from the time
                  of product receipt.
                  <br /> – Quantity depends on the time of submission. Service
                  fee according to regulations.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>4</td>
                <td >Regular Sealing (Re-seal)</td>
                <td>
                  – The evaluation time depends on the time of submission.{" "}
                  <br />– Unlimited quantity. Service fee according to
                  regulations.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>5</td>
                <td >Fast Sealing (Re-seal in 3 hours)</td>
                <td>
                  – Sealing completed within 3 working hours from the time of
                  product receipt. <br />– Quantity depends on the time of
                  submission. Service fee according to regulations.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>6</td>
                <td>Fast Sealing (Re-seal in 48 hours)</td>
                <td>
                  – Sealing completed within 48 working hours from the time of
                  product receipt. <br />– Quantity depends on the time of
                  submission. Service fee according to regulations.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>7</td>
                <td>Reissue Evaluation Certificate</td>
                <td>
                  – Reissuing the evaluation certificate upon customer request.
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>8</td>
                <td>Edge Number Engraving</td>
                <td>
                  – Engraving edge numbers on the stone upon request. <br />–
                  Only engraving stones with a size (greater than 4.00mm).
                </td>
              </tr>
            </tbody>
          </Table>

          <h1 className="text-center" style={{ marginTop: "50px" }}>
            DIAMOND EVALUATION STANDARDS
          </h1>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>EVALUATION STANDARD</th>
                <th>CONTENT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Stone Type</td>
                <td>Natural Diamond</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Measurements</td>
                <td>From 3.00mm and above.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Shape & Cut</td>
                <td>All types of cuts.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Color</td>
                <td>Standard scale: From D to Z</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Clarity</td>
                <td>
                  Standard scale: FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI2, I1-I2-I3.
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Cut</td>
                <td>
                  Standard scale: Excellent, Very Good, Good, Fair, Poor <br />{" "}
                  Only grading stones with Round Brilliant cut.
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>Proportions</td>
                <td>Measuring the stone cutting proportions.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Polish, Symmetry</td>
                <td>
                  Standard scale: Excellent, Very Good, Good, Fair, Poor <br />{" "}
                  Not grading stones with a size from les than 2.0
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>Fluorescence</td>
                <td>
                  Standard scale: None, Faint, Medium, Strong, Very Strong.{" "}
                  <br /> Not grading stones with a size les than 2.0
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>Sealing</td>
                <td>All stones are evaluated by Diamond Valuation.</td>
              </tr>
              <tr>
                <td>11</td>
                <td>Diamond Grading Report</td>
                <td>
                  Issuing certificates for stones larger than 4.00mm. <br /> Not
                  issuing certificates for stones with a size from 3.00 to
                  3.99mm.
                </td>
              </tr>
            </tbody>
          </Table>

          <h1 className="text-center" style={{ marginTop: "50px" }}>
            Service List
          </h1>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
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
                    currentPage === index + 1 ? "btn-primary" : "btn-secondary"
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
    </Container>
  );
};

export default Typevaluation;
