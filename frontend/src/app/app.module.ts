import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomsComponent } from './rooms/rooms.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://vibe-demo.herokuapp.com', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
