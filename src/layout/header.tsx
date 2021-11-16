import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { clearLocalstorage, getLocalStorageData, userObj } from '../utils/utils';

function Header() {
    // console.log(window.location)

    const { pathname } = useLocation()
    console.log(pathname)

    const { user, setUser } = useContext(UserContext)
    console.log('Header component : ', user)

    return (
        <div>
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">conduit</Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        {
                            user.isAuthenticated ?
                                (
                                    <div>
                                        <li className="nav-item">
                                            <Link className={pathname === '/' ? "nav-link active" : "nav-link"} to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={pathname === '/editor' ? "nav-link active" : "nav-link"} to="/editor">
                                                <i className="ion-compose"></i>&nbsp;New Article
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={pathname === '/settings' ? "nav-link active" : "nav-link"} to="/settings">
                                                <i className="ion-gear-a"></i>&nbsp;Settings
                                            </Link>
                                        </li><li className="nav-item">
                                            <Link className="nav-link" to="/login" onClick={() => { setUser(new userObj()) }}>Sign out</Link>
                                        </li>
                                    </div>
                                ) :
                                (
                                    <div>
                                        <li className="nav-item">
                                            <Link className={pathname === '/login' ? "nav-link active" : "nav-link"} to="/login">Sign in</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={pathname === '/register' ? "nav-link active" : "nav-link"} to="/register">Sign up</Link>
                                        </li>
                                    </div>
                                )

                        }

                    </ul>
                </div>
            </nav>


        </div>
    );
}

export default Header;