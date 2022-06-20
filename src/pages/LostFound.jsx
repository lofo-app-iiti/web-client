import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { withRouter } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify';
import { faCheckCircle, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LostFound(props) {

    const { user, auth } = props;
    const [posting, setPosting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [lost, setLost] = useState([]);
    const [found, setFound] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/lost-found/')
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
                toast.error('Could not fetch items')
            })
    }, [])

    useEffect(() => {
        setLost(
            data.filter(item => item.status === 'lost' && item.title.toLowerCase().includes(search.toLowerCase()))
        );

        setFound(
            data.filter(item => item.status === 'found' && item.title.toLowerCase().includes(search.toLowerCase()))
        );

    }, [search, data])

    const handleClaim = (id, status, title) => {
        if (auth) {
            let notification = {
                itemTitle: title,
                mobile: user.mobile,
                dp: user.profilePic
            }
            if (status === 'lost') {
                notification['message'] = `found your`
            } else {
                notification['message'] = `wants to claim`
            }
            axios.put(`/api/lost-found/notify/${id}`, { notification: notification })
                .then(res => {
                    const updated = {
                        ...res.data.item,
                        claimed: true
                    }
                    if (status === 'lost') {
                        setLost(prev => [...prev.filter(item => { return item._id !== id }), updated])
                    } else {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setPosting(true)
        const formData = e.target
        const newItem = new FormData(formData)

        axios.post('/api/lost-found', newItem)
            .then(res => {
                toast.success(`Posted Ad for ${res.data.title}`);
                const { status } = res.data
                if (status === 'lost') {
                    setLost(prev => [res.data, ...prev])
                } else {
                    setFound(prev => [res.data, ...prev])
                }
                setPosting(false)
            })
            .catch(err => {
                console.log(err);
                setPosting(false)
                toast.error("Failed to post");

            })
    };

    const Delete = (id, status) => {
        axios.delete(`/api/lost-found/${id}`)
            .then(res => {
                if (status === 'lost') {
                    setLost(prev => [...prev.filter(item => { return item._id !== id })])
                } else {
                    setFound(prev => [...prev.filter(item => { return item._id !== id })])
                }
                toast.success(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error("Couldn't delete Ad");
            })
    }

    function Data(props) {
        return (
            <>
                {
                    loading ? <Spinner /> :
                        <div className="container-fluid" style={{ bgColor: "#555" }}>
                            <div className="row mt-4">
                                {
                                    props.status.map((item) =>
                                        <div className=" mb-4 col-12 col-md-6">
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
                                                                        <Button size='sm' onClick={() => Delete(item._id, item.status)} variant='danger' className=''>
                                                                            <FontAwesomeIcon icon={faTrash} className='me-1' />
                                                                            Delete
                                                                        </Button>
                                                                        : item.claimed ?
                                                                            <Button size='sm' disabled >
                                                                                <FontAwesomeIcon icon={faCheckCircle} className='me-1' />
                                                                                {item.status === 'lost' ? 'Found' : 'Claimed'}
                                                                            </Button>
                                                                            :
                                                                            <Button onClick={() => handleClaim(item._id, item.status, item.title)} >
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
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                }
            </>
        )
    }
    return (
        <>
            {
                posting === true ? <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} ><h2 className="text-center">Posting...</h2></div> :
                    <div className="my-4 container-fluid px-4">
                        <div className="d-flex justify-content-between" >
                            <h4 className='text-center' >Something Lost or Found?</h4>

                            <Form onSubmit={(e) => {
                                e.preventDefault()
                            }} >
                                <InputGroup>
                                    <Form.Control placeholder='Search' className='non-outlined-btn' onChange={(e) => setSearch(e.target.value)} value={search} style={{
                                        border: '1px solid #ced4da',
                                        borderRight: 'none'
                                    }} />
                                    <Button onClick={() => setSearch('')} variant='transparent' className='text-secondary'
                                        style={{
                                            border: '1px solid #ced4da',
                                            borderLeft: 'none'
                                        }}
                                    ><FontAwesomeIcon icon={faTimes}
                                        style={{
                                            opacity: search === '' ? '0' : '1'
                                        }}
                                        /></Button>
                                    <Button type='submit' ><FontAwesomeIcon icon={faSearch} /></Button>
                                </InputGroup>

                            </Form>
                        </div>
                        <br />
                        <Tabs
                            defaultActiveKey="lost"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="lost" title="Lost">
                                <Data status={lost} />
                            </Tab>
                            <Tab eventKey="found" title="Found">
                                <Data status={found} />
                            </Tab>
                            <Tab eventKey="add" title="Add" >
                                <div className="d-flex flex-wrap justify-content-center">
                                    <br />
                                    <form className="needs-validation" id="itemForm" noValidate="" onSubmit={handleSubmit} >
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label htmlFor="productTitle" className="form-label">Title<span className='text-danger fw-bold'>*</span></label>
                                                <input autoCapitalize="sentences" required type="text" className="form-control custom-form" id="productTitle" placeholder="Enter Title" name="title" />
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Description<span className='text-danger fw-bold'>*</span> </label>
                                                <div className="input-group has-validation">
                                                    <textarea autoCapitalize="sentences" required className="form-control custom-form" id="description" placeholder="Enter Description" name="description" />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center flex-column bd-highlight mb-3">

                                                <div className="col-12  d-flex justify-content-center flex-column bd-highlight mb-3">

                                                    <label htmlFor='status' className="form-label">I _____ it <span className='text-danger fw-bold'>*</span></label>

                                                    <select className="form-select" aria-label="Default select example" name="status" id="status" required>
                                                        <option value="">...</option>
                                                        <option value="lost">lost</option>
                                                        <option value="found">found</option>
                                                    </select>
                                                </div>

                                                <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-4">
                                                    <label htmlFor="date" className="form-label" required>Date of Lost/Found<span className='text-danger fw-bold'>*</span></label>
                                                    <input required min="0" type="date" className="form-control" id="date" placeholder="Choose Date" name="date" />
                                                </div>

                                                <div className="col-12 col-md-6 d-flex justify-content-center flex-column bd-highlight mb-3">
                                                    <label htmlFor="image1" className="form-label">Upload Image</label>
                                                    <input type="file" className="form-control" id="image1" placeholder="Required" name="file1" />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <div className="d-flex gap-3 bd-highlight mb-3 justify-content-evenly ">
                                            <button className="w-100 btn btn-danger btn-sm" style={{ textDecoration: 'none', color: 'white' }} type="reset">Cancel</button>
                                            <button className="w-100 btn btn-success btn-sm" type="submit">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </Tab>
                        </Tabs>
                        <br />
                    </div>
            }

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.Authorised
    }
};

export default withRouter(connect(mapStateToProps)(LostFound));
