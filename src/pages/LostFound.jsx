import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { withRouter } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createLofoItem } from '../apis'
import LoFoCard from '../components/LoFoCard'
import Home from './Home'

function LostFound(props) {

    const { user, auth, lofoItems } = props;
    const [posting, setPosting] = useState(false)
    const [data, setData] = useState([]);
    const [lost, setLost] = useState([]);
    const [found, setFound] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setData(lofoItems);
    }, [lofoItems])

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

        createLofoItem(newItem)
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


    function Data(props) {
        return (
            <>
                <div className="container-fluid" style={{ bgColor: "#555" }}>
                    <div className="row mt-3">
                        {
                            props.status.map((item, i) =>
                                <div key={i} className="col-12 col-md-6 p-0 py-2 p-md-2">
                                    <LoFoCard
                                        handleClaim={handleClaim}
                                        setFound={setFound}
                                        setLost={setLost}
                                        item={item} />
                                </div>
                            )
                        }

                    </div>
                </div>

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
                    <div className="my-3 container-lg px-3 px-md-4">
                        <div className="d-flex flex-column flex-md-row justify-content-between" >
                            <h3 className='text-center mb-3' >Lost/Found Portal - IIT Indore</h3>

                            <Form className='mb-3' onSubmit={(e) => {
                                e.preventDefault()
                            }} >
                                <InputGroup>
                                    <Form.Control placeholder='Search...' className='non-outlined-btn' onChange={(e) => setSearch(e.target.value)} value={search} style={{
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

                        <Tabs

                            defaultActiveKey="lost"
                            transition={false}
                            id="noanim-tab-example"

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
                                        <div className="d-flex gap-3 w-50 m-auto bd-highlight mb-3 justify-content-center ">
                                            <button className="w-100 btn btn-danger btn-sm" type="reset">Reset</button>
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
        auth: state.authorised,
        lofoItems: state.lofoItems,
        authLoading: state.authLoading
    }
};

export default withRouter(connect(mapStateToProps)(LostFound));
