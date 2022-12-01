import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { userLoginSuccess } from '../../store/actions/login';
import { userLogoutSuccess } from '../../store/actions/logout';
import { connect } from 'react-redux';

const NavBar = ({ userDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

    const logoutUser = () => {
        logout();
        dispatch(userLogoutSuccess());
    };

    useEffect(() => {
        if (user) {
            dispatch(userLoginSuccess(user));
        }
    }, [user]);

    const handleLogin = () => {
        loginWithRedirect();
    };

    console.log('userDetails', userDetails, isAuthenticated);

    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Container>
                    <Navbar.Brand onClick={() => history.push('/')}>
                        Nord Finance
                    </Navbar.Brand>
                    {userDetails && userDetails.userDetails ? (
                        <div>
                            <label className="text-white text-right margin-r-10">
                                {userDetails &&
                                    userDetails.userDetails &&
                                    userDetails.userDetails.name}
                            </label>
                            <Button
                                onClick={() => history.push('/cart')}
                                variant="primary"
                                className="margin-r-10"
                            >
                                Go To Cart
                            </Button>
                            <Button
                                onClick={() => history.push('/wishlist')}
                                variant="primary"
                                className="margin-r-10"
                            >
                                Go To Wishlist
                            </Button>
                            <Button
                                onClick={() => logoutUser()}
                                variant="primary"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleLogin} variant="primary">
                            Login
                        </Button>
                    )}
                </Container>
            </Navbar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userDetails: state.userDetails,
});

export default connect(mapStateToProps)(NavBar);
