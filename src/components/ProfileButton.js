import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCertificate, faUser, faShoppingBag, faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Nav } from 'react-bootstrap';
import { baseURL } from '../apis';

function ProfileButton(props) {

    // count of unread notifications.
    const [notifCount, setCount] = useState(0);

    useEffect(() => {

        let c = 0;
        for (let i = 0; i < props.user.notifications.length; i++) {
            if (props.user.notifications[i].read === false) {
                c++;
            }
        };

        setCount(c);
    }, [props.user.notifications])


    const handleBell = () => {
        if (notifCount > 0) {
            let newNotifs = [];
            for (let i = 0; i < props.user.notifications.length; i++) {
                let newNotif = {
                    ...props.user.notifications[i],
                    read: true
                };
                newNotifs.push(newNotif);
            }
            const newUser = {
                ...props.user,
                notifications: newNotifs
            }
            axios.put(baseURL + `/api/user/notifbell`)
                .then(res => {
                    props.Update(newUser);
                })
                .catch(err => {
                    console.log(err.message);
                })

        }
    }
    return (
        <>
            <div className="profile d-none d-md-flex justify-content-between ">
                <Nav.Link as={Link} onClick={handleBell} eventKey='12' to="/notifications" className='m-auto mx-2' id="notification-bell" >
                    {notifCount > 0 ?
                        <>
                            <FontAwesomeIcon size='lg' style={{ color: "#212529" }} icon={faBell} />
                            <sup className='rounded-pill bg-primary px-1 text-light' style={{
                                position: "relative",
                                right: 7,
                                top: -7,
                            }}>
                                {notifCount}
                            </sup>
                        </> :
                        <FontAwesomeIcon size='lg' style={{ color: "#212529" }} icon={faBell} />
                    }
                </Nav.Link>
                {props.user.name ? <div className='mt-auto mx-3' style={{ color: '#010101', margin: 'auto 0' }} >  Hi! {props.user.name.slice(0, props.user.name.indexOf(' '))}</div> : null}
                <div className="dropdown dropstart" >
                    <button className="btn btn-transparent p-0 my-auto dropdown-toggle" style={{ borderRadius: '100%' }} type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={props.user.imageUrl} alt="User icon" className="d-inline-block align-text-top" id="profile-image" />
                    </button>
                    <ul className="dropdown-menu position-absolute" aria-labelledby="dropdownMenuButton2">
                        <Dropdown.Item className="m-1" eventKey='13' as={Link} to="/profile"><FontAwesomeIcon className='me-2' icon={faUser} />Profile</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='14' as={Link} to="/wishlist"><FontAwesomeIcon className='me-2' icon={faHeart} />Wishlist</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='16' as={Link} to="/orders"><FontAwesomeIcon className='me-2' icon={faShoppingBag} />Orders</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='15' as={Link} to="/your-ads"><FontAwesomeIcon className='me-2' icon={faCertificate} />Ads</Dropdown.Item>
                        <li className='text-center'> <LogoutButton /></li>
                    </ul>
                </div>

            </div>
            <div className="d-flex d-md-none justify-content-between">
                <Nav.Link as={Link} eventKey='12' to='/wishlist' style={{ color: "#212529", textDecoration: "none" }}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <p>Wishlist</p>
                </Nav.Link>
                <Nav.Link as={Link} eventKey='13' to='/your-ads' style={{ color: "#212529", textDecoration: "none" }}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faCertificate} />
                    </div>
                    <p>Ads</p>
                </Nav.Link>
                <Nav.Link as={Link} onClick={handleBell} eventKey='14' to='/notifications' style={{ color: "#212529", textDecoration: "none" }}>
                    <div className='text-center'>
                        {notifCount > 0 ?
                            <>
                                <FontAwesomeIcon size='lg' style={{ color: "#212529" }} icon={faBell} />
                                <sup className='rounded-pill bg-primary px-1 text-light' style={{
                                    position: "relative",
                                    right: 7,
                                    top: -7,
                                }}>
                                    {notifCount}
                                </sup>
                            </> :
                            <FontAwesomeIcon size='lg' style={{ color: "#212529" }} icon={faBell} />
                        }
                    </div>
                    <p>Notifications</p>
                </Nav.Link>
                <Nav.Link as={Link} eventKey='15' to='/orders' style={{ color: "#212529", textDecoration: "none" }}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                    <p>Orders</p>
                </Nav.Link>
                <Nav.Link as={Link} eventKey='16' to='/profile' style={{ color: "#212529", textDecoration: "none" }}>
                    <div className='text-center'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <p>Profile</p>
                </Nav.Link>
            </div>
        </>

    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

const mapStateToProps = (state) => {
    return {
        Auth: state.authorised,
        user: state.user,
        notifications: state.user.notifications
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);