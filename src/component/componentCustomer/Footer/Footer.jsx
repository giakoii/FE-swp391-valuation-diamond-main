import React from 'react'
import { Container, Row, Col, Stack, Image, Nav, NavLink } from 'react-bootstrap';
import '../Footer/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function Footer() {

    return (
        <div className='footer' style={{ backgroundColor: "#E2FBF5" }}>
            <Container fluid>
                <Row className='mt-auto'>
                    <Col className='d-flex align-items-center justify-content-center' style={{ flex: "3" }}>
                        <Image
                            src='https://res.cloudinary.com/dz2dv8lk4/image/upload/fl_preserve_transparency/v1719856194/logo_fyex4a.jpg?_s=public-apps'
                            alt=''
                            width='30%'
                            height='80%'
                        />
                    </Col>
                    <Col className='my-4'>
                        <div className="section-title">Feature</div>
                        <Stack>
                            <NavLink href=''>Price Calculate</NavLink>
                            <NavLink href=''>Check Diamond</NavLink>
                        </Stack>
                    </Col>
                    <Col className='my-4'>
                        <div className="section-title">Price</div>
                        <Stack>
                            <NavLink href=''>Diamond Price</NavLink>
                            <NavLink href=''>0.3 Carat</NavLink>
                            <NavLink href=''>1.0 Carat</NavLink>
                            <NavLink href=''>2.0 Carat</NavLink>
                        </Stack>
                    </Col>
                    <Col className='my-4'>
                        <div className="section-title">More</div>
                        <Stack>
                            <NavLink href=''>Blog</NavLink>
                            <NavLink href=''>Service</NavLink>
                            <NavLink href=''>Partner</NavLink>
                        </Stack>
                    </Col>
                    <Col className='my-4'>
                        <div className="section-title">About Us</div>
                        <Stack>
                            <NavLink href=''>Our Story</NavLink>
                            <NavLink href=''>Work with us</NavLink>
                        </Stack>
                    </Col>
                    <Col className='my-4'>
                        <div className='text-center section-title'>Contact Us</div>
                        <Nav className='justify-content-center'>
                            <NavLink href='' className='p-2'>
                                <i className="bi bi-pinterest"></i>
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <i className="bi bi-facebook"></i>
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <i className="bi bi-youtube"></i>
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <i className="bi bi-instagram"></i>
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <i className="bi bi-tiktok"></i>
                            </NavLink>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </div>



    )
}
export default Footer