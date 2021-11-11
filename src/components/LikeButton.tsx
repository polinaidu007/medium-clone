import * as React from 'react';
import { article } from '../interfaces/models';

function LikeButton({ favouritesCount }: article) {
    return (<button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {favouritesCount}
    </button>);
}

export default LikeButton;