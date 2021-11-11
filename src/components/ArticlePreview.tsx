import * as React from 'react';
import { article } from '../interfaces/models';
import ArticleDate from './ArticleDate';
import AuthorName from './AuthorName';
import LikeButton from './LikeButton';
import PreviewImage from './PreviewImage';


function ArticlePreview(param: article) {
    return (<div className="article-preview">
        <div className="article-meta">
            <PreviewImage {...param} />
            <div className="info">
                <AuthorName {...param} />
                <ArticleDate {...param} />
            </div>
            <LikeButton {...param} />
        </div>
        <a href="" className="preview-link" >
            <h1>{param.title}</h1>
            <p>{param.description}</p>
            <span>Read more...</span>
        </a>
    </div>);
}

export default ArticlePreview;