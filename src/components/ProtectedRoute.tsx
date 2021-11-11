import * as React from 'react';
import { useContext } from 'react';
import {
    Redirect,
    Route,
    RouteProps
} from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { getLocalStorageData } from '../utils/utils';


interface routerProps {
    path: string;
    component: any;
    exact?: boolean;
}

function ProtectedRoute({ component: Component, ...restOfProps }: RouteProps): JSX.Element {
    const { isAuthenticated } = getLocalStorageData()
    if (!Component)
        return <Redirect to={{ pathname: '/login' }} />
    console.log(isAuthenticated)

    return (
        <Route {...restOfProps} render={
            props => isAuthenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)
        } />
    );
}

export default ProtectedRoute;