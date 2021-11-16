import * as React from 'react';
import { Link } from 'react-router-dom';
import { article } from '../interfaces/models';

function AuthorName({ author: { username } }: article) {
    return (
        <Link to="" className="author">{username}</Link>
    );
}

export default AuthorName;