import { faArrowAltCircleRight, faEnvelope, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { approve, deleteNotif } from '../apis';

function NotifBlock(props) {
    const { user, Update } = props
    const [deleting, setDeleting] = useState(false);

    const { itemTitle, _id, message, userName, userEmail, mobile, dp, itemId, buyerEmail, buyerName } = props.content

    const handleApprove = (buyerEmail, itemTitle, itemId, buyerName) => {
        approve(user, buyerEmail, itemId, itemTitle)
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

    const handleDelete = (_id) => {
        setDeleting(true)
        const newUser = {
            ...user,
            notifications: user.notifications.filter(notif => notif._id !== _id)
        }
        deleteNotif(_id)
            .then(() => {
                toast.success('Deleted')
                setDeleting(false)
                Update(newUser);
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
    };

    return (
        <div className="d-flex p-3 bg-light" key={_id}
            style={{
                borderBottom: "1px solid #ccc"
            }} >
            <div className="me-3">
                <img src={dp} alt="" style={{ width: '40px', height: '40px', borderRadius: "100%" }} />
            </div>
            <div className="w-100">
                <div className='d-flex justify-content-between'>
                    <div style={{
                        fontSize: 14,
                        marginRight: 10
                    }}>{userName}{' '} {message}{' '}{itemTitle}</div>
                    <div role={'button'} className='text-danger'>
                        {deleting ? <i>deleting...</i> :
                            <FontAwesomeIcon icon={faTrash} size='sm' onClick={() => handleDelete(_id)} />
                        }
                    </div>
                </div>
                <div className="contacts d-flex flex-column flex-md-row">
                    <span>
                        {
                            userEmail && <a href={`mailto:${userEmail}`}>
                                <FontAwesomeIcon size='sm' icon={faEnvelope} /> <span style={{ fontSize: 13 }} className="text-primary ms-1 me-3">
                                    {userEmail}
                                </span>
                            </a>
                        }
                    </span>

                    <span>
                        {
                            mobile && <a href={`tel:${mobile}`}>
                                <FontAwesomeIcon size='sm' icon={faPhone} /><span style={{ fontSize: 13 }} className="mobile text-primary ms-1 me-3">
                                    {mobile}
                                </span>
                            </a>
                        }
                    </span>
                </div>


                <div>
                    {
                        props.message === "wants to buy" ?
                            <button
                                type="button"
                                style={{ fontSize: '12px' }}
                                className="btn p-0 non-outlined-btn btn-transparent"
                                onClick={() => handleApprove(buyerEmail, itemTitle, itemId, buyerName)}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-success me-2' />
                                Approve
                            </button> :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
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

export default connect(mapStateToProps, mapDispatchToProps)(NotifBlock);