const fetchCartDetails = (state = { cartList: [] }, action) => {
    switch (action.type) {
        case 'CART_ADD_TODO':
            if (state.cartList) {
                return Object.assign(
                    {},
                    { cartList: [...state.cartList, action.payload] }
                );
            } else {
                return Object.assign({}, { cartList: [action.payload] });
            }
        case 'CART_DELETE_TODO':
            return {
                cartList: [
                    ...state.cartList.slice(0, action.payload),
                    ...state.cartList.slice(action.payload + 1),
                ],
            };
        default:
            return state;
    }
};

export default fetchCartDetails;
