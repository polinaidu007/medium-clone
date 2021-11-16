import axios from 'axios';
import React, { useContext, useState } from 'react';
import config from '../config/default'
import validator from 'validator';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import { UserContext } from '../context/userContext';
import { Redirect } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [disableButton, setDisableButton] = useState(false)

    const { user, setUser } = useContext(UserContext)

    if (user.isAuthenticated)
        return <Redirect to="/" />

    const usernameValidator = () => {
        if (!username)
            setUsernameError("Username shouldn't be empty")
    }

    const emailValidator = () => {
        if (!validator.isEmail(email))
            setEmailError('Invalid email address')
    }

    const passwordValidator = () => {
        if (!password)
            setPasswordError('Password cannot be empty')
        else
            setPasswordError('')
    }

    const registerUser = async (e: any) => {
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
            // alert('Registration successfull')
            window.location.href = '/login'
        } catch (error: any) {
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
                                    usernameError ? (<ErrorMessage text={usernameError} />) : null
                                }
                            </fieldset>

                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Email" value={email} onBlur={emailValidator} onChange={e => { setEmail(e.target.value); setEmailError(''); }} />
                                {
                                    emailError ? (<ErrorMessage text={emailError} />) : null
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); passwordValidator(); }} />
                                {
                                    passwordError ? (<ErrorMessage text={passwordError} />) : null
                                }
                            </fieldset>
                            {
                                (!email || !username || !password || emailError || usernameError || passwordError) ? (<SubmitButton disabled={true} text="Sign up" />) : (<SubmitButton disabled={disableButton} text="Sign up" />)
                            }

                        </form>
                    </div>

                </div>
            </div>
        </div>);
}

export default Register;