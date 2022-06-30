import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Modal, Tab, Tabs, } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { toast } from 'react-toastify';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createLofoItem } from '../apis'
import LoFoCard from '../components/LoFoCard'

function LostFound(props) {

    const { lofoItems } = props;
    const [posting, setPosting] = useState(false)
    const [open, setOpen] = useState(false)
    // const [data, setData] = useState([]);
    const [lost, setLost] = useState([]);
    const [found, setFound] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLost(
            lofoItems.filter(item => item.status === 'lost' && item.title.toLowerCase().includes(search.toLowerCase()))
        );

        setFound(
            lofoItems.filter(item => item.status === 'found' && item.title.toLowerCase().includes(search.toLowerCase()))
        );

    }, [search, lofoItems])

    const handleSubmit = (e) => {
        e.preventDefault()
        setPosting(true)
        const formData = e.target
        const newItem = new FormData(formData)

        createLofoItem(newItem)
            .then(res => {
                toast.success(`Posted: ${res.lofoItems.title}`);
                const { status } = res.data
                if (status === 'lost') {
                    setLost(prev => [res.data, ...prev])
                } else {
                    setFound(prev => [res.data, ...prev])
                }
                setPosting(false);
                setOpen(false)
            })
            .catch(err => {
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
                <div className="my-3 container-lg px-3 px-md-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between" >
                        <h3 className='text-center mb-3' >Lost/Found Portal - IIT Indore</h3>
                        <div className='d-flex mb-3 justify-content-center'>
                            <Form className='me-3' onSubmit={(e) => {
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

                                </InputGroup>
                            </Form>
                            <span size='sm' className='my-auto' role={'button'} onClick={() => setOpen(true)}>
                                Add <FontAwesomeIcon icon={faPlusCircle} />
                            </span>
                        </div>
                    </div>

                    <Tabs
                        className='d-flex'
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
                    </Tabs>

                    <Modal className='p-0' onHide={() => setOpen(false)} show={open}>
                        <Modal.Header className='fw-bold d-flex justify-content-between'>
                            <span>LOST / FOUND</span>
                            <span><FontAwesomeIcon size='lg' icon={faTimes} onClick={() => setOpen(false)} role='button' /></span>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex flex-wrap justify-content-center">
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
                                        <button className="w-100 btn btn-danger btn-sm" type="reset">
                                            Reset
                                        </button>
                                        <button className="w-100 btn btn-success btn-sm" type="submit">
                                            {posting ? "Posting..." : "Post"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>

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
