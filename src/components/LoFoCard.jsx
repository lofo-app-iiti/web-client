import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toast } from 'react-toastify'
import { deleteLofoItem, notify } from '../apis'

function LoFoCard(props) {

    const { user, item, setFound, setLost, auth } = props
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)

    const Delete = (id, status) => {
        setLoad(true)
        deleteLofoItem(id)
            .then(res => {
                setLoad(false)
                if (status === 'lost') {
                    setLost(prev => [...prev.filter(item => { return item._id !== id })])
                } else {
                    setFound(prev => [...prev.filter(item => { return item._id !== id })])
                }
                toast.success("Deleted");
            })
            .catch(err => {
                setLoad(false)
                console.log(err);
                toast.error("Couldn't delete");
            })
    }

    const handleClaim = (id, status, title) => {
        if (auth) {
            let notification = {
                itemTitle: title,
                mobile: user.mobile,
                dp: user.imageUrl
            }
            if (status === 'lost') {
                notification['message'] = `found your`
            } else {
                notification['message'] = `wants to claim`
            }
            notify(id, notification)
                .then(res => {
                    const updated = {
                        ...item,
                        claimed: true
                    }
                    if (status === 'lost') {
                        setLost(prev => [...prev.filter(item => { return item._id !== id }), updated])
                    }
                    else {
                        setFound(prev => [...prev.filter(item => { return item._id !== id }), updated])
                    }
                    toast.success(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Failed to notify");
                })
        }
        else {
            toast.error("Please Login first");
        }
    }

    return (
        <div className='p-3 rounded' disabled={item.claimed} style={{ border: "1px solid #ccc" }}>

            <div className="d-flex" >
                <div className='mb-3'>
                    {
                        <img
                            style={{
                                filter: item.claimed ? "grayscale(1)" : "none"
                            }}
                            src={item.images ? item.images.url : `${item.status}.jpg`} alt="Item" className='l-f-img rounded' />
                    }
                </div>

                <div className="ms-3 mb-3 w-75"
                    style={{
                        color: item.claimed && "gray"
                    }}
                >
                    <div className="d-flex justify-content-between">


                        <div className="p fw-bold">{item.title} </div>
                        <div>
                            {
                                item.userEmail === user.email ?
                                    <div>
                                        <span className="me-2">
                                            {item.claimed &&
                                                <span disabled >
                                                    <FontAwesomeIcon size='sm' icon={faCheckCircle} className='ms-1' />
                                                </span>
                                            }
                                        </span>
                                        <span onClick={() => Delete(item._id, item.status)} className='text-danger ms-3' role={'button'} >
                                            {
                                                load ? <i>deleting...</i> :
                                                    <FontAwesomeIcon size='sm' icon={faTrash} />
                                            }
                                        </span>
                                    </div>



                                    : item.claimed ?
                                        <span className='ms-1' disabled >
                                            <FontAwesomeIcon icon={faCheckCircle} className='ms-1' />
                                        </span>
                                        :
                                        <Button size='sm' onClick={() => setOpen(true)} >
                                            {item.status === 'lost' ? 'I found' : "It's mine"}
                                        </Button>
                            }
                        </div>

                    </div>

                    <div style={{ fontSize: 13 }} >{item.date.slice(0, 10)}</div>
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div style={{ fontSize: '13px' }} > {item.userName}</div>
                            <div style={{ fontSize: '13px' }}  >{item.userEmail}</div>
                            <div style={{ fontSize: '13px' }}  >{item.mobile}</div>
                        </div>

                        <div className='col-12 col-md-2 text-center'>

                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-2' style={{
                fontSize: '15px',
                color: item.claimed && "gray"
            }}>
                {item.description}
            </div>

            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>Do you want to claim it?</Modal.Header>
                <Modal.Body>
                    Note: An official mail will be sent to the founder of this items that you own it.
                </Modal.Body>
                <Modal.Footer>
                    <Button size='sm' variant='danger' onClick={() => setOpen(false)} >
                        Cancel
                    </Button>
                    <Button size='sm' onClick={() => handleClaim(item._id, item.status, item.title)} >
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        lofoItems: state.lofoItems
    }
};

export default withRouter(connect(mapStateToProps)(LoFoCard));