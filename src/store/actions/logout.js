export function userLogoutSuccess(data) {
    return {
        type: 'USER_LOGOUT_SUCCESS',
        payload: data,
    };
}
