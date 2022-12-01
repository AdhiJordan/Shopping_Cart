import { combineReducers } from 'redux';
import fetchLaunchDetails from './launchReducer';
import fetchUserDetails from './loginReducer';
import fetchCartDetails from './cartReducer';
import fetchWishlistDetails from './wishlistReducer';

const reducer = combineReducers({
    launchDetails: fetchLaunchDetails,
    userDetails: fetchUserDetails,
    cartDetails: fetchCartDetails,
    wishListDetails: fetchWishlistDetails,
});

export default reducer;
