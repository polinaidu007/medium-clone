import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArticleType } from '../interfaces/models';

function AuthorName({ author: { username } }: ArticleType) {
    return (
        <Link to="" className="author">{username}</Link>
    );
}

export default AuthorName;