import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { buyItem } from '../apis';

function BuyBtn(props) {
    const { user, auth, title } = props;
    const { id } = props;
    const handleBuy = () => {
        if (auth) {
            buyItem(id, title, user.mobile, user.imageUrl)
                .then(res => {
                    const newUser = {
                        ...user,
                        orders: [
                            { success: false, _id: id },
                            ...user.orders
                        ]
                    };
                    props.Update(newUser);
                    toast.success(res.data);
                })
                .catch(err => {
                    toast.error("Failed to notify seller");
                    console.log(err.message)
                })
        }
        else {
            toast.error("Please Login first ");
        }
    };
    return (
        <Button onClick={handleBuy} size='sm' type="button" className="btn-warning non-outlined-btn btn-md mr-1 mb-2">Buy now</Button>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        Update: (user) => {
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyBtn);