import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { BacklogPage } from '../pages/backlog/backlog';
import { ChatPage } from '../pages/chat/chat';
import { DetailPage } from '../pages/detail/detail';
import { GamesProvider } from '../providers/games/games';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    BacklogPage,
    ChatPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    // { mode: 'md' } forces material design styling across all platforms 
    IonicModule.forRoot(MyApp, { mode: 'md'}),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    BacklogPage,
    ChatPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GamesProvider,
  ]
})
export class AppModule {}
