import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from '../Pages';
import Dashboard from '../Pages/Dashboard.js';
import NotFoundPage from '../Pages/NotFoundPage.js';
import PrivateRoute from './PrivateRoute.js';
import LoginPage from '../Pages/LoginPage/Login';
import SignUpPage from '../Pages/SignUpPage/index.js';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/" component={LoginPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/sign-up" component={SignUpPage} /> */}
                <Route exact path={'/'} component={HomePage} />
                <Route exact path={'/:id'} component={HomePage} />
                <PrivateRoute exact path={'/cart'} component={HomePage} />
                <PrivateRoute exact path={'/wishlist'} component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Navigation;
