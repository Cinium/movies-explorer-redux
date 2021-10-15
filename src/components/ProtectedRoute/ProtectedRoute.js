import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
    const currentUser = useSelector(state => state.user.user);

    return (
        <Route>
            {() =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect exact to="/" />
                )
            }
        </Route>
    );
}

export default ProtectedRoute;
