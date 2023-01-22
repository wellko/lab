export interface Posts{
    author: string;
    message:string;
}

export  interface PostsResponse {
    message:string;
    author:string;
    datetime:string;
    _id?:string;
    index: number
}