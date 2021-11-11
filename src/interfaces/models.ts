export interface article {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favourited: boolean,
    favouritesCount: number,
    author: profile
}

export interface profile {
    username: string,
    bio: string,
    image: string,
    following: string
}