import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as jwtAuth from  'socketio-jwt-auth';
import * as jwt from 'jsonwebtoken';
import { Message, Thread } from './model';

import { ThreadMessage } from './model/thread-message';
import { AuthRequest } from './model/auth-request';
import { Users } from './static/users';
import { Threads } from './static/threads';

const JWTSECRET:string = "JHKJHdsadasd";
export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
        this.io.use(jwtAuth.authenticate({
          secret: JWTSECRET,    // required, used to verify the token's signature
          algorithm: 'HS256',        // optional, default to be HS256
          succeedWithoutToken: true
        }, function(payload:any, done:any) {
          // you done callback will not include any payload data now
          // if no token was supplied
      //    console.log("token", payload, done);
          if (payload && payload.user) {
            //console.log(payload);
            delete payload.user.password;
            return done(null, payload.user);
          } else {
            return done() // in your connection handler user.logged_in will be false
          }
        }));
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port', socket.request.user);
            let getUserObj=function(){
                if(socket.request.user.id){
                    let x = socket.request.user;
                    delete x.logged_in;
                    return x;
                } else {
                    return {name: "guest"};
                }
            }
            socket.emit('user-info', socket.request.user);

            socket.on('authenticate', (auth: AuthRequest)=>{
                
                var user = Users.find(o => o.name === auth.name);
                let token;
                let payload = {};
                console.log(user);
                if(user){
                    payload = { user: user };
                } else {
                    payload = { guest: true};
                }
                console.log('[server](message):', auth, payload);
                token = jwt.sign(payload, JWTSECRET);
                socket.emit('token', {token: token});
            });
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', m);
                this.io.emit('message', {something: m, ts:12});
            });

            socket.on('threadMessage', (msg: ThreadMessage) => {
                console.log('[server](threadMessage): %s', msg.thread);

                console.log(socket.request.user);
                let m = new ThreadMessage(msg.content, msg.thread, getUserObj());
             //   msg.user = getUserObj();
                this.io.to(msg.thread).emit('threadMessage', m);
            });

            socket.on('joinThread', (thread:any) => {
                console.log('[server](joinThread):', thread);
                let m = new ThreadMessage("user has joined", thread, getUserObj());
                socket.join(thread);
                this.io.to(thread).emit("threadMessage", m);
            });
            socket.on('leaveThread', (thread:any) => {
                console.log('[server](joinThread):', thread);
                let m = new ThreadMessage("user has left", thread,  getUserObj());
                socket.leave(thread);
                this.io.to(thread).emit("threadMessage", m);
            });
            socket.on('getThreads', () => {
                console.log('[server](getThreads):');

                socket.emit('threadsList', Threads);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
