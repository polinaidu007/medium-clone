import * as React from 'react';
import { useContext } from 'react';
import {
    Redirect,
    Route,
    RouteProps
} from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { getLocalStorageData } from '../utils/utils';


function ProtectedRoute({ component: Component, ...restOfProps }: RouteProps): JSX.Element {
    const { user, setUser } = useContext(UserContext)
    if (!Component)
        return <Redirect to={{ pathname: '/login' }} />
    console.log(user)

    return (
        <Route {...restOfProps} render={
            props => user.isAuthenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)
        } />
    );
}

export default ProtectedRoute;