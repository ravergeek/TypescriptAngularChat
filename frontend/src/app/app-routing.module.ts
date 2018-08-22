import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './controllers/home-page/home-page.component';
import { ThreadsPageComponent } from './controllers/threads-page/threads-page.component';

//Compomponents

const routes: Routes = [
 /* { path: 'new', component: NewMailComponent },
  { path: 'mail/:id', component: NewMailComponent },
  { path: 'mail', component: SentMailComponent },
  { path: 'events', component: EventsListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },*/
  { path: 'threads', component: ThreadsPageComponent },
  { path: '', component: HomePageComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}