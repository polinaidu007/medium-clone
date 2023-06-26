import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios, { Method } from 'axios';
import config from '../config/default'
import { ArticleResponseType, PostDetailsType } from '../interfaces/models';
import { followProfile} from '../services/profiles.service'
import { UserContext } from '../context/userContext';

function Article() {
    const {slug} = useParams<any>();
    const [article, setArticle] = useState<PostDetailsType>();
    const {user, setUser} = useContext(UserContext)

    useEffect(()=>{
        console.log(slug);
        const fetchFromAPI = async () => {
            try {
                let res = await axios.get(`${config.apiUrl}/articles/${slug}`);
                
                // let { article: { title, description, body } } = res.data
                let data : ArticleResponseType = res.data;
                setArticle(data.article);
            } catch (error) {
                // alert(error)
                console.log(error)
                // return (<Redirect to='/' />)
            }
        }
        fetchFromAPI();
        //fetch article from 
    },[])

    const followAuthor = async () => { 
        let res = article?.author?.username && await followProfile(article?.author.username, user.token);
        console.log(res);
    }

    return (
        <div className="article-page">

            <div className="banner">
                <div className="container">

                    <h1>{article?.title}</h1>

                    <div className="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div className="info">
                            <a href="" className="author">{article?.author.username}</a>
                            <span className="date">{article?.created}</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary" onClick={followAuthor}>
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow {article?.author.username} <span className="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12" dangerouslySetInnerHTML={{ __html: article?.body ?? '' }} />
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>

                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow Eric Simons
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">

                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                            </div>
                            <div className="card-footer">
                                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                <button className="btn btn-sm btn-primary">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                                <span className="mod-options">
                                    <i className="ion-edit"></i>
                                    <i className="ion-trash-a"></i>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>);
}

export default Article;