import React, { useEffect, useRef } from 'react'
import { clearLocalstorage, getLocalStorageData, userObj } from '../utils/utils';

function Header() {
    console.log('Header component')
    const user = useRef(new userObj())



    useEffect(() => {
        user.current = getLocalStorageData()
    }, [])

    console.log('Header component : ', user.current)

    return (
        <div>
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="index.html">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                        {
                            user.current.isAuthenticated ?
                                (
                                    <div>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/editor">
                                                <i className="ion-compose"></i>&nbsp;New Article
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/settings">
                                                <i className="ion-gear-a"></i>&nbsp;Settings
                                            </a>
                                        </li><li className="nav-item">
                                            <a className="nav-link" href="/login" onClick={clearLocalstorage}>Sign out</a>
                                        </li>
                                    </div>
                                ) :
                                (
                                    <div>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">Sign in</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/register">Sign up</a>
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