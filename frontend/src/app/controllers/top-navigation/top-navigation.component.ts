import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../classes/login-request';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  public login:LoginRequest = {user:"", password:""};
  public sessionInfo;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUserInfoObservable().subscribe((data)=>{
      this.sessionInfo = data;
    });
  }
  loginSubmit(){
    //this is called when somone tries to login
    this.chatService.loginRequest(this.login);
  }
}
