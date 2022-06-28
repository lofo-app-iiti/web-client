import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import clientID from '../googleClient';
import { toast } from 'react-toastify';
import { googleLogin } from '../apis';

function LoginButton(props) {

    const LoginSuccess = (res) => {
        console.log(res)
        var basicProfile = res.profileObj;
        let user = {
            ...basicProfile,
            favourites: [],
            ads: [],
            _id: '',
            notifications: [],
            orders: []
        }
        googleLogin(res.tokenId)
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
                props.login({ user: user, accessToken: accessToken });
            })
    };

    const LoginFail = (res) => {
        console.log(res);
        toast.error("Login failed")
    }
    return (
        <div className='m-auto mb-3 mb-md-0' >
            <GoogleLogin
                id="navLoginButton"
                clientId={clientID}
                buttonText={"Login with Institude Id (@iiti.ac.in)"}
                hostedDomain={"iiti.ac.in"}
                onSuccess={LoginSuccess}
                isSignedIn={true}
                onFailure={LoginFail}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.authorised
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch({ type: 'SET_USER', payload: data })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);


