import React from 'react';
import { connect } from 'react-redux';
import Sell from './pages/Sell';
import ProductPage from './pages/ProductPage';
import Profile from './pages/ProfilePage';
import Buy from './pages/Buy';
import NOT_FOUND from './pages/Not_Found';
import { Route } from 'react-router-dom';
import Favourites from './pages/WishList';
import Ads from './pages/Ads';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import LostFound from './pages/LostFound';


function Body(props) {
    const restrictedRoutes = [
        <Route key={0} path='/notifications' exact component={Notifications} />,
        <Route key={1} path='/profile' exact component={Profile} />,
        <Route key={2} path='/wishlist' exact component={Favourites} />,
        <Route key={3} path='/your-ads' exact component={Ads} />,
        <Route key={4} path='/orders' exact component={Orders} />
    ]
    return (<>
        <Route path='/' exact component={LostFound} />
        <Route path='/buy/:category' exact component={Buy} />
        <Route path='/product/:id' exact component={ProductPage} />
        <Route path='/sell' exact component={Sell} />
        {/* <Route path='/lost-found' exact component={} /> */}
        {props.auth ?
            restrictedRoutes.map(routes => routes)
            : <Route path={'*'} component={NOT_FOUND} />
        }

    </>

    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.authorised,
        loading: state.loading
    }
};

export default connect(mapStateToProps)(Body);