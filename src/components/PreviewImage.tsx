import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArticleType } from '../interfaces/models';

function PreviewImage({ author: { image } }: ArticleType) {
    return (<Link to=""><img src={image} /></Link>);
}

export default PreviewImage;