import * as React from 'react';
import { Link } from 'react-router-dom';
import { article } from '../interfaces/models';

function PreviewImage({ author: { image } }: article) {
    return (<Link to=""><img src={image} /></Link>);
}

export default PreviewImage;