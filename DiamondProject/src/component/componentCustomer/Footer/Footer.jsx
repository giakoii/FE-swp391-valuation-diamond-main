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
                            src='/src/assets/assetsCustomer/logo.png'
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
                                <img
                                    src='/src/assets/assetsCustomer/instagram.svg'
                                    alt='Instagram'
                                    width='15'
                                    height='15'
                                />
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <img
                                    src='/src/assets/assetsCustomer/facebook.svg'
                                    alt='Facebook'
                                    width='15'
                                    height='15'
                                />
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <img
                                    src='/src/assets/assetsCustomer/youtube.svg'
                                    alt='YouTube'
                                    width='15'
                                    height='15'
                                />
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <img
                                    src='/src/assets/assetsCustomer/pinterest.svg'
                                    alt='Pinterest'
                                    width='15'
                                    height='15'
                                />
                            </NavLink>
                            <NavLink href='' className='p-2'>
                                <img
                                    src='/src/assets/assetsCustomer/tiktok.svg'
                                    alt='TikTok'
                                    width='15'
                                    height='15'
                                />
                            </NavLink>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </div>



    )
}
export default Footer