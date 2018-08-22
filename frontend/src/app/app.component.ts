import { Component } from '@angular/core';
import { StorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plants-websocket-frontend';

  constructor(
    private localStorageService: StorageService
  ){
   // let x = localStorageService.getCurrentJWT();
    //console.log(x);
  }
  public send(){

  }
}
