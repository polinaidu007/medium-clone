export type AuthorType = {
    id: number;
    username: string;
    email: string;
    bio: string;
    image: string;
    password: string;
};

export type ArticleType = {
    id: number;
    slug: string;
    title: string;
    description: string;
    body: string;
    created: string;
    updated: string;
    tagList: string[];
    favoriteCount: number;
    author: AuthorType;
};

export type ArticlesResponseType = {
    articles: ArticleType[];
    articlesCount: number;
};

export type CommentType = any; // Define this based on the structure of your comment objects

export type PostDetailsType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  created: string;
  updated: string;
  tagList: string[];
  favoriteCount: number;
  comments: Comment[];
  author : AuthorType;
};

export type ArticleResponseType = {
  article: PostDetailsType;
};

  
// export interface article {
//     slug: string,
//     title: string,
//     description: string,
//     body: string,
//     tagList: string[],
//     createdAt: string,
//     updatedAt: string,
//     favourited: boolean,
//     favouritesCount: number,
//     author: profile
// }

export interface profile {
    username: string,
    bio: string,
    image: string,
    following: string
}