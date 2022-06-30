import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import WishBtn from './WishBtn'

function ItemCard(props) {
    const { item, user, auth } = props
    return (<>
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
                <Button size='sm' as={Link} to={`/product/${item._id}`}
                    style={{
                        backgroundColor: "#15b08f",
                        border: "none",
                    }}
                ><FontAwesomeIcon className='me-1' icon={faCartPlus} /> View </Button>
                {
                    auth ? user.ads.filter(item1 => { return item1._id === item._id }).length > 0 ? <DeleteBtn update={props.update} removeSold={props.removeSold} id={item._id} /> :
                        <WishBtn item={item} /> : null
                }
            </Card.Footer>
        </Card>

    </>

    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
}

export default connect(mapStateToProps)(ItemCard);
