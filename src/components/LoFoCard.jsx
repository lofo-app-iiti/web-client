import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toast } from 'react-toastify'
import { deleteLofoItem } from '../apis'

function LoFoCard(props) {

    const { user, item, setFound, setLost, handleClaim } = props
    const [load, setLoad] = useState(false)

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
                toast.success("deleted");
            })
            .catch(err => {
                setLoad(false)
                console.log(err);
                toast.error("Couldn't delete");
            })
    }

    return (
        <div className='p-3 rounded' style={{ border: "1px solid #ccc" }}>

            <div className="d-flex flex-column flex-md-row" >
                <div className='l-f-img mb-3'>
                    {
                        <img src={item.images ? item.images.url : `${item.status}.jpg`} alt="Item" style={{ height: 'auto', width: '100%' }} />
                    }
                </div>

                <div className="px-3 mb-3 container" >
                    <div className="d-flex justify-content-between">

                        <div className="h5 fw-bold">{item.title} </div>
                        <div>
                            {
                                item.userEmail === user.email ?

                                    <span onClick={() => Delete(item._id, item.status)} className='text-danger ms-3' role={'button'} >
                                        {
                                            load ? <i>deleting...</i> :
                                                <FontAwesomeIcon icon={faTrash} />
                                        }
                                    </span>


                                    : item.claimed ?
                                        <Button size='sm' disabled >
                                            <FontAwesomeIcon icon={faCheckCircle} className='me-1' />
                                            {item.status === 'lost' ? 'Found' : 'Claimed'}
                                        </Button>
                                        :
                                        <Button size='sm' onClick={() => handleClaim(item._id, item.status, item.title)} >
                                            {item.status === 'lost' ? 'I found' : 'Claim'}
                                        </Button>
                            }
                        </div>

                    </div>

                    <p style={{ fontSize: 13 }} >{item.date.slice(0, 10)}</p>
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div style={{ fontSize: '13px' }} >Added by: {item.userName}</div>
                            <div style={{ fontSize: '13px' }}  >Email: {item.userEmail}</div>
                            <div style={{ fontSize: '13px' }}  >Phone: {item.mobile}</div>
                        </div>

                        <div className='col-12 col-md-2 text-center' >

                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-2 px-2' style={{ fontSize: '15px', borderTop: "1px solid #ccc" }}> {item.description}</div>
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