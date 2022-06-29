import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import NOT_FOUND from './Not_Found';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { baseURL } from '../apis';

function Notifications(props) {
    const { user, authorised, Update } = props
    const { notifications } = props.user;
    const [notifs, setNotifs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!props.loading) {
            setNotifs(notifications.reverse());
            setLoading(false)
        }
    }, [notifications, props.loading, notifs])


    function ApproveButton(props) {
        if (props.message === "wants to buy") {
            return <button type="button" style={{ fontSize: '12px' }} className="btn p-0 non-outlined-btn btn-transparent" onClick={() => handleApprove(props.buyerEmail, props.itemTitle, props.itemId, props.buyerName)}> <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-success me-2' />Approve</button>
        } else {
            return null
        }
    };
    console.log(notifications)
    // const handleDelete = (_id) => {
    //     const newUser = {
    //         ...user,
    //         notifications: user.notifications.filter(notif => notif._id !== _id)
    //     }
    //     Update(newUser);

    //     axios.delete(`/api/user/notif/${_id}`)
    //         .then(() => {
    //             toast.success('Deleted Successfully')
    //         })
    //         .catch(() => {
    //             toast.error('Something went wrong')
    //         })
    // };

    const handleApprove = (buyerEmail, itemTitle, itemId, buyerName) => {
        axios.put(baseURL + `/api/user/approve/${buyerEmail}`, {
            _id: user._id,
            notification: {
                message: `accepted your buy request for`,
                itemTitle: itemTitle,
                mobile: user.mobile,
                dp: user.imageUrl,
                itemId: itemId
            }
        })
            .then(res => {
                Update({
                    ...user,
                    notifications: res.data.notifications
                })
                toast.success(`${res.data.msg} ${buyerName}`)
            })
            .catch(err => {
                toast.error("Couldn't notify")
            })
    }

    return (
        loading ? <Spinner /> :
            <>
                <section className="section">
                    <div className="container">
                        {authorised ? notifications.length > 0 ? notifs.map(({ itemTitle, _id, message, userName, userEmail, mobile, dp, itemId }) => (
                            <div className="d-flex p-3 bg-light" key={_id}
                                style={{
                                    borderBottom: "1px solid #ccc"
                                }} >
                                <div className="me-3">
                                    <img src={dp} alt="" style={{ width: '50px', height: '50px', borderRadius: "100%" }} />
                                </div>
                                <div className="notification-list__info">
                                    <div>{userName}{' '} {message}{' '}{itemTitle}</div>
                                    <span style={{ fontSize: 13 }} className="text-primary me-3">
                                        {userEmail}
                                    </span>
                                    <span style={{ fontSize: 13 }} className="mobile text-primary me-3">
                                        {mobile}
                                    </span>
                                    <span>
                                        {
                                            mobile && <a href={`tel:${mobile}`}>
                                                <FontAwesomeIcon size='sm' icon={faPhoneAlt} />
                                            </a>
                                        }
                                    </span>
                                    <div>
                                        <ApproveButton itemTitle={itemTitle} message={message} buyerEmail={userEmail} itemId={itemId} buyerName={userName} />
                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-center mt-5">No Notifications!</div> : <NOT_FOUND />}
                    </div>
                </section>
            </>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        authorised: state.authorised,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
