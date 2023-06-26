import axios, { Method } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import config from '../config/default'
import { UserContext } from '../context/userContext';
import ReactMarkdown from "react-markdown";

function CreateArticle() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [taglist, setTaglist] = useState('')
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [bodyError, setBodyError] = useState('')

    // const user = useRef(new userObj())
    const { user } = useContext(UserContext)

    const { slug }: any = useParams()

    useEffect(() => {
        console.log('CreateArticle useEffect')
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
                return (<Redirect to='/' />)
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
                    authorization: `Bearer ${user.token}`
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
                                <fieldset className='form-group'>
                                <ReactMarkdown className='form-control markdown-height'>{body}</ReactMarkdown>
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