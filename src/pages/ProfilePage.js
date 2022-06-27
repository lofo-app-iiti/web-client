import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { Button } from 'react-bootstrap';
import { fetchOrders } from '../apis';

function EditProfile(props) {
    const { name, email, imageUrl, mobile } = props.user
    const [mobileInput, setMobileInput] = useState('')
    const [visibility, setVisibility] = useState(false)
    const inputRef = useRef()

    const [orders, setOrders] = useState([])
    const [loadin, setLoading] = useState(true)


    const handleChange = (e) => {
        setMobileInput(e.target.value)
    }

    const handleSubmit = (e) => {
        setVisibility(!visibility)
        e.preventDefault();
        axios.put(`/api/user`, {
            mobile: mobileInput
        })
            .then(res => {
                const newUser = {
                    ...props.user,
                    mobile: mobileInput
                }
                props.Update(newUser);
                toast("Your phone number was updated...")
            })
            .catch(err => {
                toast.error('Something went wrong!')
                console.log(err)
            })
    }
    useEffect(() => {
        if (!props.loading) {
            fetchOrders
                .then(res => {
                    setOrders(res.data)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                })
        }

    }, [props.user._id, props.loading, props.user.orders])
    console.log(props.user.ads)

    return (
        <div className="container my-4">
            <div className="main-body">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card-wrapper p-0 p-md-3">
                            <div className="profile-card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={imageUrl} alt="Admin" className="rounded-circle" width={100} />
                                        <div className="mt-3">
                                            <h4>{name}</h4>
                                            <p className="text-secondary mb-1">IIT Indore Student</p>
                                            <p className="text-muted font-size-sm">{email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-8">
                        <div className="card-wrapper p-0 p-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {mobile}
                                        </div>
                                    </div>
                                    <hr />

                                    {
                                        visibility ?
                                            <div className="row" style={{ display: visibility ? 'block' : 'none' }} >
                                                <form action="" >
                                                    <label htmlFor="tel">Edit your mobile number</label>
                                                    <input ref={inputRef} className='form-control' type="tel" maxLength='10' id='tel' placeholder={'0123456789'} onChange={handleChange} />
                                                    <hr />
                                                    <>
                                                        <Button type='submit' size='sm' className="btn btn-primary non-outlined-btn " onClick={handleSubmit} >Save</Button>
                                                        <Button type='reset' size='sm' className="btn btn-danger non-outlined-btn ms-3 " onClick={() => setVisibility(!visibility)} >Cancel</Button>
                                                    </>
                                                </form>
                                            </div> : <button className="btn btn-sm btn-primary non-outlined-btn " onClick={() => {
                                                setVisibility(!visibility)
                                                setTimeout(() => {
                                                    inputRef.current.focus()
                                                }, 100);

                                            }
                                            } >Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Wishlist</div>
                                <div className="card-body">
                                    {/* images of orders */}
                                    {
                                        props.loading ? <div>Loading...</div> : props.user.favourites.length > 0 ? props.user.favourites.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="text-secondary text-center p">Nothing!</div>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/wishlist'>
                                            View Wishlist
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Orders</div>
                                <div className="card-body">
                                    {/* images of orders */}
                                    {
                                        loadin ? <div>Loading...</div> : orders.length > 0 ? orders.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="text-secondary text-center p">Nothing!</div>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/orders'>
                                            View Orders
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card-wrapper py-2 px-md-3">
                            <div className="card">
                                <div className="card-header">Ads</div>
                                <div className="card-body">
                                    {/* images of orders */}
                                    {
                                        props.loading ? <div>Loading...</div> : props.user.ads.length > 0 ? props.user.ads.map(f =>
                                            <img key={f.images[0].url} className='pe-1' alt='' src={f.images[0].url}
                                                width={80}
                                            />
                                        ) :
                                            <div className="text-secondary text-center p">Nothing!</div>
                                    }

                                </div>
                                <div className="card-footer">
                                    <div className="link text-end">
                                        <Link to='/your-ads'>
                                            View Ads
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-auto">
                        <div className="text-center text-md-end my-2 mx-3">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.loading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);