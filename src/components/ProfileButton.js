import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BellOn from '../svgs/BellOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCertificate, faUser, faShoppingBag, faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Nav } from 'react-bootstrap';

function NotifButton(props) {
    if (props.notifications) {
        return (<>
            <BellOn />
        </>
        )
    } else {
        return (
            <>
                <FontAwesomeIcon style={{ color: "#212529" }} icon={faBell} />
            </>
        )
    }
}
function ProfileButton(props) {

    const handleBell = () => {
        if (props.notifications) {
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
            props.Update(newUser);
            axios.put(`/api/user/notifbell`)
                .catch(err => {
                    console.log(err.message);
                })
        }
    }
    if (props.Auth) {
        return (
            <div className="profile d-flex justify-content-between ">
                <Nav.Link onClick={handleBell} as={Link} eventKey='12' to="/notifications" className='m-auto mx-2' id="notification-bell" >
                    <NotifButton notifications={props.notifications} user={props.user} />
                </Nav.Link>
                {props.user.name ? <div className='mt-auto mx-3' style={{ color: '#010101', margin: 'auto 0' }} >  Hi! {props.user.name.slice(0, props.user.name.indexOf(' '))}</div> : null}
                <div className="dropdown dropstart" >
                    <button className="btn btn-transparent p-0 dropdown-toggle" style={{ borderRadius: '100%' }} type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={props.user.imageUrl} alt="User icon" className="d-inline-block align-text-top" id="profile-image" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <Dropdown.Item className="m-1" eventKey='13' as={Link} to="/profile"><FontAwesomeIcon className='me-2' icon={faUser} />Profile</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='14' as={Link} to="/favourites"><FontAwesomeIcon className='me-2' icon={faHeart} />Favourites</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='15' as={Link} to="/your-ads"><FontAwesomeIcon className='me-2' icon={faCertificate} />Your Ads</Dropdown.Item>
                        <Dropdown.Item className="m-1" eventKey='16' as={Link} to="/orders"><FontAwesomeIcon className='me-2' icon={faShoppingBag} />Your Orders</Dropdown.Item>
                        <li> <LogoutButton /></li>
                    </ul>
                </div>

            </div>
        );
    } else {
        return (
            <LoginButton />
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

const mapStateToProps = (state) => {
    const flag = () => {
        for (let i = 0; i < state.user.notifications.length; i++) {
            if (state.user.notifications[i].read === false) {
                return true;
            }
        };
        return false;
    }
    return {
        Auth: state.Authorised,
        user: state.user,
        notifications: flag()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);