const fetchWishlistDetails = (state = { wishList: [] }, action) => {
    switch (action.type) {
        case 'WISHLIST_ADD_TODO':
            if (state.wishList) {
                return Object.assign(
                    {},
                    { wishList: [...state.wishList, action.payload] }
                );
            } else {
                return Object.assign({}, { wishList: [action.payload] });
            }
        case 'WISHLIST_DELETE_TODO':
            return {
                wishList: [
                    ...state.wishList.slice(0, action.payload),
                    ...state.wishList.slice(action.payload + 1),
                ],
            };
        default:
            return state;
    }
};

export default fetchWishlistDetails;
