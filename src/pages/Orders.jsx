import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { fetchOrders } from '../apis';

function Orders(props) {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const { user } = props

    useEffect(() => {
        if (!props.loading) {
            fetchOrders
                .then(res => {
                    setOrders(res.data)
                    setLoading(false)
                })
                .catch(e => {
                    setErr(true)
                    setLoading(false)
                    toast.error(e.data)
                    console.log(e)
                })
        }

    }, [user._id, props.loading, user.orders])

    console.log(orders);
    return (
        <>
            {
                loading ? <Spinner /> :
                    err ? <div className='text-secondary text-center mt-5'>Nothing to show!</div> :
                        <>
                            {
                                err ? null :
                                    <>  <div className="results">
                                        <h2 className='text-center py-3' >Orders</h2>
                                    </div>
                                        <div className='pb-5'>
                                            <ItemList items={orders} removeSold={false} />
                                        </div>
                                    </>
                            }
                        </>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

