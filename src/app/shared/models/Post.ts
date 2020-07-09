export class Post {
    id: number;
    postBody: string;
    picture: string;
    date: Date;
    video: string;
    userId: number;
    user: {
        id: number;
        name: string
    };

};