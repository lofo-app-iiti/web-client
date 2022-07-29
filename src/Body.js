import React from 'react';
import { connect } from 'react-redux';
import Sell from './pages/Sell';
import Profile from './pages/ProfilePage';
import { Route } from 'react-router-dom';
import Favourites from './pages/WishList';
import Ads from './pages/Ads';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import Home from './pages/Home';
import LostPage from './pages/LostPage';
import FoundPage from './pages/FoundPage';


function Body() {

    return (<>
        <Route key={0} path='/notifications' exact component={Notifications} />
        <Route key={1} path='/profile' exact component={Profile} />
        <Route key={2} path='/wishlist' exact component={Favourites} />
        <Route key={3} path='/your-ads' exact component={Ads} />
        <Route key={4} path='/orders' exact component={Orders} />
        <Route path='/' exact component={Home} />
        <Route path='/sell' exact component={Sell} />
        <Route path='/lost' exact component={LostPage} />
        <Route path='/found' exact component={FoundPage} />
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