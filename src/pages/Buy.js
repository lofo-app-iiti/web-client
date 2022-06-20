import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NOT_FOUND from './Not_Found';
import "./BuyStyle.css"
import Spinner from '../components/Spinner';
import { Button, Form, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faBook, faGamepad, faSearch, faShoppingCart, faSplotch, faStore } from '@fortawesome/free-solid-svg-icons';

function Buy(props) {
    const [search, setSearch] = useState('')
    const { category } = useParams()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        category === 'All' ? axios.get('/api/items')
            .then(res => {
                setItems(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setErr(true)
            })
            :
            axios.get(`/api/items/filter?categories=${category}`)
                .then(res => {
                    setItems(res.data)
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    setErr(true)
                })
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault();

        props.history.push(`/search/${search}`);
    };

    const handleChange = (e) => {
        setSearch(e.target.value)
    };


    const update = (id) => {
        const newItems = items.filter(item => item._id !== id)
        setItems(newItems)
    };

    if (err === false) {
        return (
            <>
                <section>
                    <div className="container-fluid px-4">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <div className="row px-2">

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/All' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faStore} />
                                            <span className='ms-2'>All</span>
                                        </Button>
                                    </div>

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/Sports' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faBasketballBall} />
                                            <span className='ms-2'>Sports</span>
                                        </Button>
                                    </div>

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/Books' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faBook} />
                                            <span className='ms-2'>Books</span>
                                        </Button>
                                    </div>

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/Games' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faGamepad} />
                                            <span className='ms-2'>Games</span>
                                        </Button>
                                    </div>

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/Utilities' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faSplotch} />
                                            <span className='ms-2'>Utilities</span>
                                        </Button>
                                    </div>

                                    <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                        <Button as={Link} to='/buy/Other' className='non-outlined-btn category-btn' variant='transparent'>
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                            <span className='ms-2'>Other</span>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-9" style={{ borderLeft: '1px solid #cccccc' }}>
                                <Form className="d-flex search-bar m-auto my-2" onSubmit={handleSubmit} >
                                    <Form.Control autoCapitalize="sentences" onChange={handleChange} className="form-control me-2" type="search" placeholder="Search buying items..." aria-label="Search" />
                                    <Nav.Link eventKey='17' as={Button} variant='transparent' className='' size='sm' type="submit"><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                                </Form>
                                <div className="row">
                                    <div className="col-12 h5 p-3 text-center bg-light rounded" style={{ borderBottom: '1px solid #aaaaaa' }} >
                                        <span>{category + ' '}</span>
                                        {
                                            items.length > 0 && loading === false ? <span>{'('}{items.length}{')'}</span> : null
                                        }
                                    </div>
                                    <div className="col-12 pt-3 pb-4" style={{ height: '75vh', overflowY: 'scroll' }} >
                                        {
                                            loading ? <Spinner /> : <ItemList items={items} update={update} removeSold={true} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <NOT_FOUND />
        )
    }

}
export default Buy;

