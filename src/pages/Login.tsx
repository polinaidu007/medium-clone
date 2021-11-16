import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../config/default'
import validator from 'validator';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import { UserContext } from '../context/userContext';
import { getLocalStorageData, setLocalStorageData, userObj } from '../utils/utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [disableButton, setDisableButton] = useState(false)

    const { user, setUser } = useContext(UserContext)

    if (user.isAuthenticated)
        return <Redirect to="/" />

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

    const loginUser = async (e: any) => {
        e.preventDefault()
        setDisableButton(true)
        try {
            var res = await axios.post(config.apiUrl + '/users/login', {
                user: {
                    email,
                    password
                }
            })
            console.log(res.data)
            setUser({ isAuthenticated: true, ...res.data.user })
            toast('Login successfull', { type: 'success' })
        } catch (error) {
            setDisableButton(false)
            toast('Email or Password invalid', { type: 'error' })
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
                                <input className="form-control form-control-lg" type="text" placeholder="Email" value={email} onBlur={emailValidator} onChange={e => { setEmail(e.target.value); setEmailError(''); }} />
                                {
                                    emailError ? (<ErrorMessage text={emailError} />) : null
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onBlur={passwordValidator} onChange={e => { setPassword(e.target.value); setPasswordError(''); }} />
                                {
                                    passwordError ? (<ErrorMessage text={passwordError} />) : null
                                }
                            </fieldset>
                            {
                                (!email || !password || emailError || passwordError) ? (<SubmitButton disabled={true} text="Log in" />) : (<SubmitButton disabled={disableButton} text="Log in" />)
                            }
                        </form>
                    </div>

                </div>
            </div>
        </div>);
}

export default Login;