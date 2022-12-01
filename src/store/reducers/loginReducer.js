let initialState = {
    userDetails: null,
};

const fetchUserDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_ID_SUCCESS':
            return {
                ...state,
                userId: action.payload,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                userDetails: action.payload,
            };
        case 'USER_LOGOUT_SUCCESS': {
            return initialState;
        }

        default:
            return state;
    }
};

export default fetchUserDetails;
