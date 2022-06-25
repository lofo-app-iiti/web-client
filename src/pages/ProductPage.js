import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, withRouter } from 'react-router-dom';
import axios from 'axios';
import WishBtn from '../components/WishBtn';
import { connect } from 'react-redux';
import NOT_FOUND from './Not_Found';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import BuyBtn from '../components/BuyBtn';
import DeleteBtn from '../components/DeleteBtn';
import Deck from '../components/Deck';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

//MAIN FUNCTION
function ProductPage(props) {
    const { user } = props;
    const { id } = useParams()
    const [productDetails, setProductDetails] = useState({})
    const [images, setImages] = useState([{ url: null }])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [num, setNum] = useState(0)
    const [date, setDate] = useState('')
    const [similarItems, setSimilarItems] = useState([])
    const [orderStatus, setStatus] = useState(null)

    useEffect(() => {
        for (const elem of user.orders) {
            if (elem._id === id) {
                setStatus(elem);
            }
        }
    }, [id, user.orders])

    // function handleImages(){
    //     const newArray = [ ...images, "/no-image.png", "/no-image.png", "/no-image.png", "/no-image.png"]
    //     newArray.reverse()
    //     for (let i = 0; i < images.length; i++) {
    //         newArray.shift()
    //     }
    //     newArray.reverse()
    //     return newArray
    // }

    useEffect(() => {
        axios.get('/api/items/' + id)
            .then(res => {
                setProductDetails(res.data)
                setLoading(false)
                //date
                setDate(new Date(res.data.date))

                //images
                setImages(res.data.images)

            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to load product")
                setErr(true)
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        axios.get(`/api/items/filter?categories=${productDetails.categories}`)
            .then(res => {
                setSimilarItems(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [productDetails.categories])

    if (loading) {
        return (
            <Spinner />
        )
    } else if (err === true) {
        return (
            <NOT_FOUND />
        )
    } else {
        return (
            <>
                <section className=" py-3 container-fluid">
                    <div className="my-3 row ">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <div id="mdb-lightbox-ui" />
                            <div className="mdb-lightbox">
                                <div className="row product-gallery mx-1">
                                    <div className="col-1 d-flex m-auto" onClick={() => setNum(prevNum => prevNum > 0 ? prevNum - 1 : prevNum)} >
                                        <FontAwesomeIcon size='lg' icon={faAngleLeft} />
                                    </div>

                                    <div className="col-10 mb-0">
                                        <figure className="text-center view overlay rounded z-depth-1 main-img">
                                            <a href={images[num].url} data-size="710x823"  >
                                                <img alt='' src={images[num].url} className="img-fluid z-depth-1" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div className="col-1 d-flex m-auto" onClick={() => setNum(prevNum => prevNum < images.length - 1 ? prevNum + 1 : prevNum)} >
                                        <FontAwesomeIcon size='lg' icon={faAngleRight} />
                                    </div>
                                    <div className="col-12 text-center">{num + 1} / {images.length}</div>
                                    {/* <div className="col-12">
                                        <div className="row p-3">
                                            {
                                                images.length>0 ? handleImages().map((img, i) =>
                                                    <div onClick={() => setNum(i)} key={i} className="col-3" style={{
                                                        cursor: 'pointer',
                                                        border: '0.5px solid #bbbbbb',
                                                    }}>
                                                        <img alt='' src={img} className='img-fluid' />
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-3 col-md-6 bordered" >
                            <div className="d-flex justify-content-between">
                                <h5 className='fw-bold'>{productDetails.title}</h5>
                                <p className="mb-2 text-muted text-uppercase small">
                                    {productDetails.categories.map((cat, i) => <span key={i} className='me-3' >{cat}</span>)}
                                </p>
                            </div>
                            <div className="my-1">
                                {productDetails.description}
                            </div>
                            <div className="my-1 fw-bold">
                                &#8377; {productDetails.price}
                            </div>
                            <div className="table-responsive">
                                <div className='my-1'>
                                    Seller: {productDetails.userName}
                                </div>
                                <div className='my-1'>
                                    Email: {productDetails.userEmail}
                                </div>
                                <div className='my-1'>
                                    Date:
                                    <span> {
                                        date.toString().split(' ')[0] + ', ' +
                                        date.toString().split(' ')[2] + ' ' +
                                        date.toString().split(' ')[1] + ' ' +
                                        date.toString().split(' ')[3]
                                    } </span>
                                </div>

                            </div>
                            <hr />{
                                props.auth ? user.ads.filter(item1 => { return item1._id === productDetails._id }).length > 0 ? <DeleteBtn toHome={true} id={id} /> :
                                    <>
                                        {
                                            orderStatus !== null ?
                                                orderStatus.success ?
                                                    <Button className="btn-success non-outlined-btn btn-md mr-1 mb-2" disabled  >Approved</Button>
                                                    : productDetails.sold ?
                                                        <Button className="btn-danger non-outlined-btn btn-md mr-1 mb-2" disabled  >Sold!</Button>
                                                        : <Button className="btn-warning non-outlined-btn btn-md mr-1 mb-2" disabled  >Notified</Button>
                                                : productDetails.sold ?
                                                    <Button className="btn-danger non-outlined-btn btn-md mr-1 mb-2" disabled  >Sold!</Button>
                                                    : <BuyBtn id={id} title={productDetails.title} />

                                        }
                                        <span className='ms-2' > <WishBtn item={productDetails} />Add to Favourites </span>
                                    </> : <BuyBtn />
                            }

                        </div>
                    </div>
                    <div className="container">
                        <h3 className="">Similar Items</h3>
                        <Deck items={similarItems} removeSold={true} removeFav={false} />
                    </div>
                </section>

            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.Authorised
    }
}

export default withRouter(connect(mapStateToProps)(ProductPage));
