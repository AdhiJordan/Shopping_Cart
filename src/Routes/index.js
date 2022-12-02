import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from '../Pages';
import NotFoundPage from '../Pages/NotFoundPage.js';
import PrivateRoute from './PrivateRoute.js';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
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



// Initially added sign up and login page but since API is not working i do have added login with Auth0.