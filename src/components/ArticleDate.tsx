import * as React from 'react';
import { article } from '../interfaces/models';

function ArticleDate({ createdAt }: article) {
    return (<span className="date">{createdAt}</span>);
}

export default ArticleDate;