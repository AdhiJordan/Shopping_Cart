export function addToCartAction(data) {
    console.log('1', data);
    return {
        type: 'CART_ADD_TODO',
        payload: data,
    };
}

export function deleteTodoList(id) {
    return {
        type: 'CART_DELETE_TODO',
        payload: id,
    };
}
