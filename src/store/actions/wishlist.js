export function addToWishlistAction(data) {
    return {
        type: 'WISHLIST_ADD_TODO',
        payload: data,
    };
}

export function deleteWishListAction(id) {
    return {
        type: 'WISHLIST_DELETE_TODO',
        payload: id,
    };
}
