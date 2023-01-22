export  interface Message {
    id : string;
    author: string;
    datetime: string;
    message: string;
}

export interface SendData{
    author: string;
    message:string;
}