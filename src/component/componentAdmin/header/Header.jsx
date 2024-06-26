import Navbar from 'react-bootstrap/Navbar';
import './../../componentAdmin/header/Header.css'
import { Container, NavLink, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../utils/hook/useAuth';
import { logout } from '../../../contexts/AuthContext/reducer';
export const Header = () => {

  const navigate = useNavigate ()
  
  const {user,dispatch} = useAuth()
  const handleLogout = () => {
      localStorage.removeItem('user');
      dispatch(logout())
      
      navigate('/login');
  };

  return (
    <> 
      <Navbar expand="md" style={{ backgroundColor: '#white ' }}>
        <Container fluid className='px-1'>
          <div className='col-md-3  branddiamond '>
            <Navbar.Brand href='#home' className='p-5 fw-bold  brand-text'>
                <img
                  src='/src/assets/assetsAdmin/logo.png'
                  width='60'
                  height='60'
                  alt='Logo'
                />
              Valuation Diamond
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
              <Nav variant='line-through'>
                <NavLink to="/bell" className="nav-link mx-2" >
                  <img
                    src="/src/assets/assetsAdmin/bell.svg"
                    alt="bell"
                    width='30'
                    height='30'
                  />
                </NavLink>
                <NavLink to="/email" className="nav-link mx-2" >
                  <img
                    src="/src/assets/assetsAdmin/email.svg"
                    alt="bell"
                    width='30' 
                    height='30'
                  />
                </NavLink>
                {user && (
                  <NavDropdown title={`${user.firstName} ${user.lastName}`} id="nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

    </>
  );
}
export default Header;