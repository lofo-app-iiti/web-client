import React, { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import "./BuyStyle.css"
import Spinner from '../components/Spinner';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall, faBook, faGamepad, faShoppingCart, faSplotch, faStore } from '@fortawesome/free-solid-svg-icons';
import ItemCard from '../components/ItemCard';
import { connect } from 'react-redux';

function Buy(props) {
    const [search, setSearch] = useState('')
    const { category } = useParams()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (props.items.length === 0) return
        setItems(props.items);
        setLoading(false);
    }, [props.items])

    useEffect(() => {
        category === 'All' ? setItems(props.items.filter(i => i.title.includes(search))) :
            setItems(prevState => prevState.filter(i => i.categories.includes(category) && i.title.includes(search)));
    }, [category, props.items, search])

    const handleChange = (e) => {
        setSearch(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    };

    console.log(search)

    return (
        <>
            <section>
                <div className="container-fluid px-4">
                    <div className="row">
                        <div className="col-12 col-md-3">

                            <Form onSubmit={handleSubmit} className='my-3' >
                                <InputGroup>
                                    <Form.Control placeholder="Search items..." className='non-outlined-btn' onChange={handleChange} />
                                    {/* <Button type='submit' ><FontAwesomeIcon icon={faSearch} /></Button> */}
                                </InputGroup>

                            </Form>
                            <div className="row px-2">

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/All' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "All" ? "#287a68" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faStore} />
                                        <span className='ms-2'
                                        >All</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/Sports' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "Sports" ? "#287a68" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBasketballBall} />
                                        <span className='ms-2'
                                        >Sports</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/Books' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "Books" ? "#287a68" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faBook} />
                                        <span className='ms-2'
                                        >Books</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/Games' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "Games" ? "#287a68" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faGamepad} />
                                        <span className='ms-2'
                                        >Games</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/Utilities' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "Utilities" ? "#287a68" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSplotch} />
                                        <span className='ms-2'
                                        >Utilities</span>
                                    </Button>
                                </div>

                                <div style={{ borderBottom: '1px solid #cccccc' }} className="col-4 col-md-12 px-1">
                                    <Button as={Link} to='/buy/Other' className='non-outlined-btn category-btn' variant='transparent'
                                        style={{
                                            color: category === "Other" ? "#15b08f" : "#212529"
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        <span className='ms-2'
                                        >Other</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-9" style={{ borderLeft: '1px solid #cccccc' }}>

                            <div className="row">

                                <div className="col-12 py-3" style={{ height: '80vh', overflowY: 'scroll' }} >
                                    {
                                        loading ? <Spinner /> :
                                            <div className="row px-md-3">
                                                {items.length === 0 ?
                                                    <> <div style={{ width: '10%', margin: '50px auto 20px auto' }} >
                                                    </div>  <h6 className='text-center text-secondary' >No Items!</h6></> :
                                                    items.map((item, i) => (
                                                        <div key={i} className='col-6 col-md-4 col-lg-3 p-2'>
                                                            <ItemCard item={item} />
                                                        </div>
                                                    ))}
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )


}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        items: state.items
    }
};
export default withRouter(connect(mapStateToProps)(Buy));

