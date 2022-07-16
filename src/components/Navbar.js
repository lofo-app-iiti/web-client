import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { themeColor } from '../styles';

function NavbarComponent(props) {

    const { auth } = props
    const textColor = {
        color: '#444',
        textDecoration: 'none',
        margin: 'auto',
        padding: '5px',
    };


    return (<>
        <Navbar collapseOnSelect expand="lg" sticky='top' className='py-0 px-0 px-md-3' style={{
            // borderBottom: "1px solid #cccccc",
            backgroundColor: "white"
        }}>
            <Container fluid className='gap-2' >
                <Link to="/" className="navbar-brand logo d-flex" >
                    <img src='logo.webp' alt='' className='my-auto' width={70} height={60} />
                </Link>
                <Navbar.Toggle className='non-outlined-btn' />
                <Navbar.Collapse >
                    <Nav className="ms-2 gap-0 gap-md-2">
                        <hr className='m-1 ' />
                        <Dropdown id="collasible-nav-dropdown" className='my-auto'>
                            {auth && <Dropdown.Toggle size='sm'
                                style={{
                                    backgroundColor: '#' + themeColor,
                                    border: "none",
                                }}
                                className='non-outlined-btn h-80 px-3 w-100' > Buy</Dropdown.Toggle>}
                            <Dropdown.Menu >
                                <Dropdown.Item eventKey='6' as={Link} to="/buy/All">All</Dropdown.Item>
                                <Dropdown.Item eventKey='7' as={Link} to="/buy/Sports">Sports</Dropdown.Item>
                                <Dropdown.Item eventKey='8' as={Link} to="/buy/Books">Books</Dropdown.Item>
                                <Dropdown.Item eventKey='9' as={Link} to="/buy/Games">Games</Dropdown.Item>
                                <Dropdown.Item eventKey='10' as={Link} to="/buy/Utilities">Utilities</Dropdown.Item>
                                <NavDropdown.Divider />
                                <Dropdown.Item eventKey='11' as={Link} to="/buy/Other">Others</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                        {auth && <><hr className='m-1 ' /><Nav.Link eventKey='2' as={Link} style={textColor} to="/sell"  >Sell</Nav.Link>  </>}
                        {auth && <>
                            <hr className='m-1 ' />
                            <Nav.Link eventKey='3' as={Link} style={textColor} to="/">Lost and Found</Nav.Link><hr className='m-1 ' />
                        </>
                        }

                        <Nav.Link eventKey='3' as={Link} style={textColor} to="/about">About Us</Nav.Link><hr className='m-1 ' />
                        <Nav.Link eventKey='4' as={Link} style={textColor} to="/contact">Contact Us</Nav.Link><br />
                    </Nav>


                    <Nav className='ms-auto' >
                        {
                            auth ? <ProfileButton /> : <LoginButton text={''} />
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <script src="../scripts/collapse.js"></script>

    </>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.authorised,
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent));
