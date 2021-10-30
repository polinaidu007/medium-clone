import axios from 'axios';
import React, { useState } from 'react';
import config from '../config/default'
import validator from 'validator';

function Register() {
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
                    Sign up
                </button>
            )
        else
            return (
                <button className="btn btn-lg btn-primary pull-xs-right">
                    Sign up
                </button>
            )
    }

    const usernameValidator = () => {
        if (!username)
            setUsernameError("Username shouldn't be empty")
    }

    const emailValidator = () => {
        if (!validator.isEmail(email))
            setEmailError('Invalid email address')
    }

    const passwordValidator = () => {
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minSymbols: 1,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1
        }))
            setPasswordError('Weak password')
        else
            setPasswordError('')
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            var res = await axios.post(config.apiUrl + '/users', {
                user: {
                    username,
                    email,
                    password
                }
            })
            console.log(res.data)
            alert('Registration successfull')
            window.location.href = '/login'
        } catch (error) {
            let { email = '', username = '' } = error.response.data.errors
            if (email)
                setEmailError("This email is already taken")
            if (username)
                setUsernameError("This username is already taken")
        }
    }
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>
                        <form onSubmit={registerUser}>
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
                                <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); passwordValidator(); }} />
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

export default Register;