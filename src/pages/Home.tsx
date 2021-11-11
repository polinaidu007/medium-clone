import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArticlePreview from '../components/ArticlePreview';
import config from '../config/default'
import { article } from '../interfaces/models';

function Home() {
    const [globalFeed, setGlobalFeed] = useState<article[]>([])
    const [feed, setFeed] = useState([])
    const [clickedGlobalFeed, setClickedGlobalFeed] = useState(false)


    console.log(clickedGlobalFeed)

    useEffect(() => {
        (async () => {
            let res = await getGlobalArticles()
            setGlobalFeed(res?.data.articles)
            console.log(globalFeed)
        })()
    }, [])



    const getGlobalArticles = async () => {
        try {
            return await axios.get(`${config.apiUrl}/articles?limit=20&offset=0`)
        } catch (error) {
            toast('Error in fetching data')
        }
    }


    return (
        <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>


            <div className="container page">
                <div className="row">

                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <Link onClick={() => { setClickedGlobalFeed(false) }} className={clickedGlobalFeed ? "nav-link" : "nav-link active"} to="">Your Feed</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={() => { setClickedGlobalFeed(true) }} className={!clickedGlobalFeed ? "nav-link" : "nav-link active"} to="">Global Feed</Link>
                                </li>
                            </ul>
                        </div>

                        {/* <div className="article-preview">
                            <div className="article-meta">
                                <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                                <div className="info">
                                    <a href="" className="author">Eric Simons</a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 29
                                </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>How to build webapps that scale</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                            </a>
                        </div> */}

                        {
                            globalFeed.map((article, index) => (
                                <ArticlePreview key={article.slug} {...article} />
                            ))
                        }

                        {/* <ArticlePreview {
                            ...{
                                image: {
                                    href: "profile.html",
                                    src: "http://i.imgur.com/Qr71crq.jpg"
                                },
                                author: {
                                    name: "Eric Simons",
                                    href: ""

                                },
                                likeButton: {
                                    count: "29"
                                },
                                articleDate: {
                                    date: "January 20th"
                                },
                                heading: "How to build webapps that scale",
                                description: "This is the description for the post."

                            }
                        } /> */}

                        {/* <div className="article-preview">
                            <div className="article-meta">
                                <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                                <div className="info">
                                    <a href="" className="author">Albert Pai</a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 32
                                </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                            </a>
                        </div> */}

                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                <a href="" className="tag-pill tag-default">programming</a>
                                <a href="" className="tag-pill tag-default">javascript</a>
                                <a href="" className="tag-pill tag-default">emberjs</a>
                                <a href="" className="tag-pill tag-default">angularjs</a>
                                <a href="" className="tag-pill tag-default">react</a>
                                <a href="" className="tag-pill tag-default">mean</a>
                                <a href="" className="tag-pill tag-default">node</a>
                                <a href="" className="tag-pill tag-default">rails</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>);
}

export default Home;