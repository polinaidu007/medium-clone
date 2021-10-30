import axios from 'axios';
import React, { useState } from 'react';
import config from '../config/default'
import validator from 'validator';

function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const SubmitButton = () => {
        if (!email || !username || !password || emailError || usernameError || passwordError)
            return (
                <button className="btn btn-lg btn-primary pull-xs-right" disabled>
                    Log in
                </button>
            )
        else
            return (
                <button className="btn btn-lg btn-primary pull-xs-right">
                    Log in
                </button>
            )
    }

    const usernameValidator = () => {
        if (!username)
            setUsernameError("Username shouldn't be empty")
    }

    const emailValidator = () => {
        if (!email)
            setEmailError("Email shouldn't be empty")
        else if (!validator.isEmail(email))
            setEmailError('Invalid email address')
    }

    const passwordValidator = () => {
        if (!password)
            setPasswordError("Password shouln't be empty")
        else
            setPasswordError('')
    }

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            var res = await axios.post(config.apiUrl + '/users/login', {
                user: {
                    username,
                    email,
                    password
                }
            })
            console.log(res.data)
            alert('Login successfull')
            window.location.href = '/'
        } catch (error) {
            alert('Email or Password invalid')
        }
    }
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Log in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Register?</a>
                        </p>
                        <form onSubmit={loginUser}>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={username} onBlur={usernameValidator} onChange={e => { setUsername(e.target.value); setUsernameError(''); }} />
                                {
                                    usernameError ? (<ul className="error-messages">
                                        <li>{usernameError}</li>
                                    </ul>) : null
                                }
                            </fieldset>

                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Email" value={email} onBlur={emailValidator} onChange={e => { setEmail(e.target.value); setEmailError(''); }} />
                                {
                                    emailError ? (<ul className="error-messages">
                                        <li>{emailError}</li>
                                    </ul>) : null
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onBlur={passwordValidator} onChange={e => { setPassword(e.target.value); setPasswordError(''); }} />
                                {
                                    passwordError ? (<ul className="error-messages">
                                        <li>{passwordError}</li>
                                    </ul>) : null
                                }
                            </fieldset>
                            <SubmitButton />
                        </form>
                    </div>

                </div>
            </div>
        </div>);
}

export default Login;