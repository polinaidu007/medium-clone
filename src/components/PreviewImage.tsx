import * as React from 'react';
import { article } from '../interfaces/models';

function PreviewImage({ author: { image } }: article) {
    return (<a href=""><img src={image} /></a>);
}

export default PreviewImage;