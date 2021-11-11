import React, { useEffect, useRef, useState } from 'react';
import { getLocalStorageData, setLocalStorageData, userObj } from '../utils/utils';
import validator from 'validator';
import config from '../config/default'
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';

function Settings() {
    const [url, setUrl] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const user = useRef(new userObj())

    useEffect(() => {
        let currentUser = getLocalStorageData()
        if (!currentUser.isAuthenticated) {
            window.location.href = '/login'
            return
        }
        user.current = currentUser;

        setUrl(user.current.image ? user.current.image : '')
        setUsername(user.current.username ? user.current.username : '')
        setBio(user.current.bio ? user.current.bio : '')
        setEmail(user.current.email ? user.current.email : '')

    }, [])

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
            setPasswordError("Password shouldn't be empty")

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            let res = await axios.put(`${config.apiUrl}/user`, {
                user: {
                    email,
                    token: user.current.token,
                    username,
                    bio,
                    image: url
                }
            }, {
                headers: {
                    authorization: `Bearer ${user.current.token}`
                }
            })
            alert('Updated Settings')
            setLocalStorageData(res.data.user)
            window.location.href = '/'
        } catch (error) {
            alert('Something went wrong')
        }
    }

    return (

        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture" value={url} onChange={e => setUrl(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={username} onBlur={usernameValidator} onChange={e => { setUsername(e.target.value); setUsernameError(''); }} />
                                    {
                                        usernameError ? (<ErrorMessage text={usernameError} />) : null
                                    }
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows={8}
                                        placeholder="Short bio about you" value={bio} onChange={e => setBio(e.target.value)}></textarea>
                                </fieldset>
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
                                    (!email || !username || !password || emailError || usernameError || passwordError) ? (<SubmitButton disabled={true} text="Update Settings" />) : (<SubmitButton text="Update Settings" />)
                                }
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Settings;