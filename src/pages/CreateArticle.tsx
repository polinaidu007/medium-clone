import axios, { Method } from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import config from '../config/default'
import { UserContext } from '../context/userContext';
import { getLocalStorageData, userObj } from '../utils/utils';

function CreateArticle() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [taglist, setTaglist] = useState('')
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [bodyError, setBodyError] = useState('')

    const user = useRef(new userObj())

    const { slug }: any = useParams()

    useEffect(() => {
        user.current = getLocalStorageData()
        if (!user.current.isAuthenticated) {
            window.location.href = '/login'
            return
        }

        console.log('CreateArticle component')
        const fetchFromAPI = async () => {
            try {
                let res = await axios.get(`${config.apiUrl}/articles/${slug}`);

                let { article: { title, description, body } } = res.data

                setTitle(title)
                setDescription(description)
                setBody(body)

            } catch (error) {
                alert(error)
                console.log(error)
                window.location.href = '/'
            }
        }
        if (slug)
            fetchFromAPI()

    }, [])

    const validator = (state: string, message: string, fn: any) => {
        if (!state)
            fn(message)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            let url, data, method: Method | undefined
            if (slug) {
                url = `${config.apiUrl}/articles/${slug}`
                data = { article: { title, description, body } }
                method = "PUT"
            }
            else {
                url = `${config.apiUrl}/articles`
                data = { article: { title, description, body, tagList: taglist.split(' ') } }
                method = "POST"
            }
            let res = await axios({
                method, url, data, headers: {
                    authorization: `Bearer ${user.current.token}`
                }
            })
            console.log(res.data)
            alert('Article posted successfully')
            window.location.href = '/'
        } catch (error: any) {
            alert("Something went wrong")
        }
    }

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" value={title} onBlur={() => { validator(title, "Title cannot be empty", setTitleError) }} onChange={e => { setTitle(e.target.value); setTitleError('') }} />
                                    {
                                        titleError ? (<ErrorMessage text={titleError} />) : null
                                    }
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control" placeholder="What's this article about?" value={description} onBlur={() => { validator(description, "Description cannot be empty", setDescriptionError) }} onChange={e => { setDescription(e.target.value); setDescriptionError('') }} />
                                    {
                                        descriptionError ? (<ErrorMessage text={descriptionError} />) : null
                                    }
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control" rows={8}
                                        placeholder="Write your article (in markdown)" value={body} onBlur={() => { validator(body, "Body cannot be empty", setBodyError) }} onChange={e => { setBody(e.target.value); setBodyError('') }}></textarea>
                                    {
                                        bodyError ? (<ErrorMessage text={bodyError} />) : null
                                    }
                                </fieldset>
                                {
                                    !slug ? <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter tags" value={taglist} onChange={e => { setTaglist(e.target.value); }} />
                                        <div className="tag-list"></div>
                                    </fieldset> : null
                                }

                                {
                                    (!title || !description || !body || titleError || descriptionError || bodyError) ? (<SubmitButton text="Publish Article" disabled={true} />) : (<SubmitButton text="Publish Article" />)
                                }

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default CreateArticle;