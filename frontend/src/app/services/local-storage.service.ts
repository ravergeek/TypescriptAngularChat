import { Injectable } from '@angular/core';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private currentJWT:string;
  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private cookiesStorageService: CookiesStorageService,
    private sharedStorageService: SharedStorageService,
  ) {
    console.log('all cookies:');
    cookiesStorageService.utility.forEach((value, key) => console.log(key + '=', value));
  }
  public getJWT(){
    return this.localStorageService.get("JWT");
  }

  public saveJWT(jwt:string){
    this.localStorageService.set("JWT", jwt);
   // return this.getJWT();
  }
  public saveSomeData(object: Object, array: Array<any>) {
    this.localStorageService.set('someObject', object);
    this.sessionStorageService.set('someArray', array);
 
    this.localStorageService.keys.forEach((key) => {
      console.log(key + ' =', this.localStorageService.get(key));
    });
  }
 
  public clearSomeData(): void {
    this.localStorageService.clear('decorators'); // removes only variables created by decorating functions
    this.localStorageService.clear('prefix'); // removes variables starting with set prefix (including decorators)
    this.sessionStorageService.clear('all'); // removes all session storage data
  }
}
/*
  constructor(protected localStorage: LocalStorage) {
    this.getJWT().subscribe((jwt)=>{
      console.log("SSS");
      this.currentJWT = "aaa!";
    })
  }

  public getCurrentJWT():string{
    return this.currentJWT;
  }
  public getJWT():Observable<string>{
    return this.localStorage.getItem("JWT");
  }

  public saveJWT(token:string):Observable<any>{
    return this.localStorage.setItem('JWT', token);
  }
}
*/