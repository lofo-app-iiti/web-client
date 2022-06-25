import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import WishBtn from './WishBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteBtn from './DeleteBtn';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EmptySvg from '../svgs/EmptySvg';
import ItemCard from './ItemCard';

function ItemList(props) {
    const { user, items, auth } = props;

    if (items.length === 0) {
        return <> <div style={{ width: '10%', margin: '50px auto 20px auto' }} ><EmptySvg />
        </div>  <h3 className='text-center' >No Items!</h3></>;
    } else {
        return (
            <div className="container">
                <div className="row">
                    {items.length === 0 ?
                        <> <div style={{ width: '10%', margin: '50px auto 20px auto' }} ><EmptySvg />
                        </div>  <h3 className='text-center' >No Items!</h3></> :
                        items.map(item => (
                            <div className='col-6 col-md-4 col-lg-2 p-2'>
                                <Card style={{
                                    minwidth: '180px', maxWidth: 250,
                                    margin: "auto"
                                }} key={item._id} >
                                    <Link to={`/product/${item._id}`}>
                                        <Card.Img src={item.images[0].url} alt="item-img" style={{ cursor: "pointer", height: '120px' }} />
                                    </Link>
                                    <Card.Body>
                                        <div className='h6 fw-bold'>{item.title}</div>
                                        <div style={{ fontSize: '13px' }}>  &#8377; {item.price}</div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="warning" size='sm' as={Link} to={`/product/${item._id}`} ><FontAwesomeIcon icon={faCartPlus} /> View </Button>
                                        {
                                            auth ? user.ads.filter(item1 => { return item1._id === item._id }).length > 0 ? <DeleteBtn update={props.update} removeSold={props.removeSold} id={item._id} /> :
                                                <WishBtn item={item} /> : null
                                        }
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                </div>
                {/* <div className="d-flex flex-wrap justify-content-center gap-4">
                    {items && items.map(item => (
                        <Card style={{ width: '14rem', minHeight: '320px', boxShadow: '0 2px 2px 0px rgba(0,0,0,0.5)' }} key={item._id} >
                            <Link to={`/product/${item._id}`}>
                                <Card.Img src={item.images[0].url} alt="item-img" style={{ cursor: "pointer", height: '150px' }} />
                            </Link>
                            <Card.Body>
                                <Card.Title >{item.title}</Card.Title>
                                <Card.Text>
                                    &#8377;    {item.price}
                                </Card.Text>
                                <Button variant="warning" size='sm' as={Link} to={`/product/${item._id}`} ><FontAwesomeIcon icon={faCartPlus} /> View </Button>
                                {
                                    auth ? user.ads.filter(item1 => { return item1._id === item._id }).length > 0 ? <DeleteBtn update={props.update} removeSold={props.removeSold} id={item._id} /> :
                                        <WishBtn item={item} /> : null
                                }
                            </Card.Body>
                        </Card>
                    ))}
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.Authorised
    }
}

export default connect(mapStateToProps)(ItemList);