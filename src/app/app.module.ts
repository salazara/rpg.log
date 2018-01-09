import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { BacklogPage } from '../pages/backlog/backlog';
import { ChatPage } from '../pages/chat/chat';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GamesProvider } from '../providers/games/games';

import { FIREBASE_CONFIG } from './app.firebase.config';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    BacklogPage,
    ChatPage,
    DetailPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    // { mode: 'md' } forces material design styling across all platforms 
    IonicModule.forRoot(MyApp, { mode: 'md'}),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    BacklogPage,
    ChatPage,
    DetailPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GamesProvider,
  ]
})
export class AppModule {}
