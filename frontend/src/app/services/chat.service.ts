import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Thread } from '../classes/thread';
import { StorageService } from './local-storage.service';
import { LoginRequest } from '../classes/login-request';

@Injectable()
export class ChatService {

    constructor(private localStorageService: StorageService) {

      //, {query: 'auth_token=THE_JWT_TOKEN'});
      let jwt = this.localStorageService.getJWT();
      console.log(jwt);
      if(jwt!==null){
        this.socket = io(this.url,{query: 'auth_token='+jwt});
      } else {
        this.socket = io(this.url);
      } 
     //this.socket = io(this.url);
     this.startListening();
    
    }
    private startListening(){
      this.obs = new Observable(observer => {
        this.socket.on('message', (data) => {
         // console.log(data);
          observer.next(data);    
        });
        return () => {
         // this.socket.disconnect();
        };  
      });
      this.userInfoObservable = new Observable(observer => {
        this.socket.on('user-info', (data) => {
          console.log(data);
          observer.next(data);    
        });
        return () => {
         // this.socket.disconnect();
        };  
      });
      
      this.authObservable = new Observable(observer => {
        this.socket.on('token', (data) => {
        //  console.log(data);
          observer.next(data);    
        });
        return () => {
         // this.socket.disconnect();
        };  
      });

      this.authObservable.subscribe((token)=>{
        console.log("saveToken", token);
        this.localStorageService.saveJWT(token.token);
        this.reconnect();
      })
      this.threadsObservable = new Observable(observer => {
        this.socket.on('threadMessage', (data) => {
          console.log(data);
          observer.next(data);    
        });
        return () => {
       //   this.socket.disconnect();
        };  
      });
    }
    private token:string=null;
    private url = 'http://localhost:8080';  
    private socket;
    private userInfoObservable: Observable<any>;
    private authObservable: Observable<any>;
    private threadsObservable: Observable<object>;
    public obs: Observable<object>

    private reconnect(){
      this.socket.close()
      let jwt = this.localStorageService.getJWT();
      console.log(jwt);
      if(jwt!==null){
        this.socket = io(this.url,{query: 'auth_token='+jwt});
      } else {
        this.socket = io(this.url);
      } 
    }
    getThreads():Observable<Thread[]>{
      this.socket.emit("getThreads")
      let observable = new Observable<Thread[]>(observer => {
        this.socket.on('threadsList', (data) => {
          observer.next(data);    
        });
        return () => {
          
        };  
      })     
      return observable;
    }  
    public threads:object[]=[];
    loginRequest(auth:LoginRequest){
      this.socket.emit('authenticate', auth);
    }
    joinThread(thread:Thread){
      this.socket.emit('joinThread', thread.id);
    }
    leaveThread(thread:Thread){
      this.socket.emit('leaveThread', thread.id);
    }
    sendMessage(message){
      this.socket.emit('message', message);    
    }
    sendThreadMessage(message){
      this.socket.emit('threadMessage', message);    
    }
    
    getMessages() {
      return this.obs;
    }  
    getThreadsObservable(){
      return this.threadsObservable;
    }
    getUserInfoObservable(){
      return this.userInfoObservable;
    }
    getAuthObservable(){
      return this.authObservable;
    }
  }