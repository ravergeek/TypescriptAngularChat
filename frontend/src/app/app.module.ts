import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination';


import { AppComponent } from './app.component';
import { TestComponent } from './controllers/test/test.component';
import { ChatService } from './services/chat.service';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './controllers/home-page/home-page.component';
import { TopNavigationComponent } from './controllers/top-navigation/top-navigation.component';
import { FooterComponent } from './controllers/footer/footer.component';
import { ThreadsPageComponent } from './controllers/threads-page/threads-page.component';
import { StorageService } from './services/local-storage.service';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
 

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomePageComponent,
    TopNavigationComponent,
    FooterComponent,
    ThreadsPageComponent,
  ],
  imports: [
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    OrderModule, // importing the sorting package here
    NgxPaginationModule
  ],
  providers: [
    CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService,
    StorageService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
