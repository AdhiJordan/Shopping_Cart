export function loginUserDetails(data) {
    return {
        type: 'GET_USER_ID_SUCCESS',
        payload: data,
    };
}

export function userLoginSuccess(data) {
    return {
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
    };
}
