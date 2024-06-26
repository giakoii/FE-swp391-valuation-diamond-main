import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeCustomer = () => {
 
    const handleValuation = async () => {
        try {
            const response = await axios.post('/api/valuate', { carat, color, clarity });
            console.log(response.data); // Xử lý dữ liệu phản hồi ở đây nếu cần
        } catch (error) {
            console.error('Error:', error); // Xử lý lỗi ở đây nếu cần
        }
    };

    return (
        <div className="full-width-container">
            <div>
              
                    <img src="/src/assets/assetsCustomer/aa.png" alt="Diamond"   style={{width: "100%", height: "25%" }} className="img-fluid full-width-image" />
            
            </div>

            <Container id="services" className="my-5">
            <h1 className="text-center">The System</h1>
                <div className=" d-flex justify-content-center">     
                    <hr className="horizontal-line" style={{width: "75%", marginBottom:"40px"}} />
                </div>
                <div className="text-left">
                    <div className="d-flex justify-content-between mt-4">
                        <div className="w-50 p-2 text-left">
                            <h2>Diamond Classification and Evaluation</h2>
                            
                            <p className="text-left">
                                Diamonds are sorted and categorized, divided according to
                                a range of factors, including size, shape colour and quality,
                                as well as yield potential (high yielding sawable, low yielding
                                sawable, makeable), gem or industrial. Fancy coloured diamonds
                                are valued separately and cut offs are used only when necessary.
                            </p>
                        </div>
                        <div className="w-50 p-2 text-left">
                            <h2>Diamond Valuation and Evaluation Process</h2>
                            <p className="text-left">
                                As stones are sorted, the number in each category is entered into
                                a laptop computer loaded with the current price for each category.
                                A detailed valuation, together with statistics, is then provided at source.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container id="info" className="my-5">
                <div className="d-flex">
                    <div className="w-50 p-2 text-left" >
                        <h2>We have over 40 years of experience and </h2>
                        <h2>insider knowledge of the industry.</h2>
                        <p className="text-left" style={{ marginTop:"10%"}}>
                            Our team of diamond experts has helped over 71,308 shoppers 
                            find the right conflict-free diamond with our comprehensive 
                            guides and offering honest and unbiased advice by answering your questions. 
                            We will help you sift through hundreds of thousands of loose diamonds 
                            online in order to find the one that best fits your needs.
                        </p>
                    </div>
                    <div className="w-50 p-2">
                 <img src="/src/assets/assetsCustomer/cc.png" alt="Diamond" style={{width: "70%", height: "60%", marginLeft: "10%" }} className="img-fluid" />
                </div>

                </div>
            <Container id="contactt" className="my-5">
            
            </Container>
            </Container>

        </div>
    );
};

export default HomeCustomer;    
