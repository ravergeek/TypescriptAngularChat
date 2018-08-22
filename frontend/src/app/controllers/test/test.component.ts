import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  public messages:object[]= [];
  public msg: string="";
  public submitted: Boolean = false;
  
  ngOnInit() {
      this.getMessages();
  }
  public getMessages(){
    this.chatService.getMessages()
    .subscribe(data => {
      console.log(data);
      this.messages.push(data);
    });

  }
  public send(){
    this.chatService.sendMessage("something");
  }

  public formSubmit(){
    let m = this.msg;
    this.chatService.sendMessage(m);
    this.msg="";
  }
}
