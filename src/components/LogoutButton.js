import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import clientID from '../googleClient';

function LogoutButton(props) {
    const history = useHistory()
    const Logout = () => {
        props.Logout();
        history.push('/')
    };


    return (
        <span className='text-center'>
            <GoogleLogout
                clientId={clientID}
                render={renderProps => (
                    <Button size='sm' className="btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <FontAwesomeIcon icon={faPowerOff} />{' '} Logout
                    </Button>
                )}
                buttonText="Logout"
                onLogoutSuccess={Logout}
            />
        </span>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        Logout: () => {
            dispatch({ type: 'CLEAR_USER' })
        }
    }
};

export default connect(null, mapDispatchToProps)(LogoutButton);