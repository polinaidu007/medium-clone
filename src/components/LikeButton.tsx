import * as React from 'react';
import { ArticleType } from '../interfaces/models';

function LikeButton({ favoriteCount }: ArticleType) {
    return (<button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {favoriteCount}
    </button>);
}

export default LikeButton;