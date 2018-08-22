import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Thread } from '../../classes/thread';
import { ThreadMessage } from '../../classes/thread-message';
@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss']
//  providers: [ChatService]
})
export class ThreadsPageComponent implements OnInit, OnDestroy {

  constructor(
    private chatService:ChatService
  ) {

  }
  public threads:Thread[]=[];
  public connection;
  public threadsConnection;
  public activeThread:Thread=null;
  public messages:object[]=[];
  public message:ThreadMessage=new ThreadMessage();
  ngOnInit() {
    this.getThreads();
    this.getThreadMessages();
  }
  public getThreads(){
    this.connection = this.chatService.getThreads()
    .subscribe(data => {
      console.log(data);
      this.threads=data;
    });

  }
  public getThreadMessages(){
    this.threadsConnection = this.chatService.getThreadsObservable()
    .subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });

  }
  private leaveActiveThread(){
    if(this.activeThread!==null){
      this.chatService.leaveThread(this.activeThread);
    }
  }
  public clickThread(thread:Thread){
    this.leaveActiveThread();
    this.activeThread = thread;
    this.messages = [];

    this.chatService.joinThread(thread);
  }
  public messageSubmit(){

    this.message.thread=this.activeThread.id;
    this.chatService.sendThreadMessage(this.message);
    this.message.content="";
  }
  ngOnDestroy() {
    this.leaveActiveThread();
    this.connection.unsubscribe();
    this.threadsConnection.unsubscribe();
  }

}
