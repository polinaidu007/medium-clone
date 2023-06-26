import * as React from 'react';
import { ArticleType } from '../interfaces/models';

function ArticleDate({ created }: ArticleType) {
    return (<span className="date">{created}</span>);
}

export default ArticleDate;