import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArticlePreview from '../components/ArticlePreview';
import config from '../config/default'
import { UserContext } from '../context/userContext';
import { ArticleType } from '../interfaces/models';

interface feedStateObjectType {
    data: ArticleType[],
    loading: boolean
}

function Home() {
    const [state, setState] = useState<feedStateObjectType>({ data: [], loading: true })
    const [clickedGlobalFeed, setClickedGlobalFeed] = useState(true)

    const { user } = useContext(UserContext)


    console.log(clickedGlobalFeed)

    useEffect(() => {
        (async () => {
            setState({ loading: true, data: [] })
            let res
            if (clickedGlobalFeed)
                res = await getGlobalFeed()
            else
                res = await getFeed()
            setState({ loading: false, data: res?.data.articles })

        })()
    }, [clickedGlobalFeed])

    async function getGlobalFeed() {
        try {
            return await axios.get(`${config.apiUrl}/articles?limit=20&offset=0`)
        } catch (error) {
            toast('Error in fetching data')
        }
    }

    async function getFeed() {
        try {
            return await axios.get(`${config.apiUrl}/articles/feed?limit=20&offset=0`, {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            })
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
                        {
                            state.loading ?
                                'Loading...' :
                                (state.data.length ? state.data.map((article, index) => (
                                    <ArticlePreview key={article.slug} {...article} />
                                )) : 'No records')
                        }

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