import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NotFoundPage from '../Pages/NotFoundPage.js';
import { Route } from 'react-router';

const isAuthenticated = (token) => {
    if (token) {
        return true;
    } else return false;
};

const PrivateRoute = ({ path, userDetails, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated(userDetails.userDetails.name) ? (
                    window.location.pathname === path ? (
                        <Component {...props} />
                    ) : (
                        <NotFoundPage />
                    )
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    userDetails: state.userDetails,
});

export default connect(mapStateToProps)(PrivateRoute);
