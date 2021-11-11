import * as React from 'react';
import { article } from '../interfaces/models';

function AuthorName({ author: { username } }: article) {
    return (
        <a href="" className="author">{username}</a>
    );
}

export default AuthorName;