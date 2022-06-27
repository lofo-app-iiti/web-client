import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import clientID from '../googleClient';
import { toast } from 'react-toastify';

function LoginButton(props) {

    const LoginSuccess = (res) => {
        var basicProfile = res.profileObj;
        let user = {
            ...basicProfile,
            favourites: [],
            ads: [],
            _id: '',
            notifications: [],
            orders: []
        }
        axios.post('/api/googlelogin', {
            googleToken: res.tokenId
        })
            .then(res => {
                const {
                    _id,
                    mobile,
                    program,
                    department,
                    graduationYear,
                    notifications,
                    orders,
                    ads,
                    favourites,  //will be changed to wishlist
                } = res.data.user;

                const { accessToken } = res.data;

                user._id = _id;
                user.mobile = mobile
                user.program = program
                user.department = department
                user.graduationYear = graduationYear
                user.notifications = notifications;
                user.orders = orders
                user.ads = ads;
                user.favourites = favourites;
                props.login({ user: user, loading: false, accessToken: accessToken });
            })
    };

    const LoginFail = (res) => {
        console.log(res);
        toast.error("Login failed: ", res.data)
    }
    return (
        <div className='m-auto mb-3 mb-md-0' >
            <GoogleLogin
                id="navLoginButton"
                clientId={clientID}
                buttonText="Login with Institute Id"
                hostedDomain={"iiti.ac.in"}
                onSuccess={LoginSuccess}
                isSignedIn={true}
                onFailure={LoginFail}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch({ type: 'SET_USER', payload: data })
        },
        loading: (value) => {
            dispatch({ type: 'SET_LOADING', payload: value })
        }
    }
};

export default connect(null, mapDispatchToProps)(LoginButton);


