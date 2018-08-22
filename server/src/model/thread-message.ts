import {User} from './user';

export class ThreadMessage {
    constructor(

        public content: string,
        public thread: string,
        public user?: User
    ) {}

 
}