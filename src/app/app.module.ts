import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FeedbackPage } from '../pages/feedback/feedback';
import { EventdetailPage } from '../pages/eventdetail/eventdetail';
import { TwitterfeedPage } from '../pages/twitterfeed/twitterfeed';
import { ChatPage } from '../pages/chat/chat';
import { SpbioPage } from '../pages/spbio/spbio';
import { PbioPage } from '../pages/pbio/pbio';
import { MbioPage } from '../pages/mbio/mbio';
import { DochatPage } from '../pages/dochat/dochat';
import { AgendaPage } from '../pages/agenda/agenda';
import { SpkbioPage } from '../pages/spkbio/spkbio';
import { ImapPage } from '../pages/imap/imap';
import { TermsPage } from '../pages/terms/terms';
import { PrivacyPage } from '../pages/privacy/privacy';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignupPage,
    DashboardPage,
    FeedbackPage,
    EventdetailPage,
    TwitterfeedPage,
    ChatPage,
    SpbioPage,
    PbioPage,
    MbioPage,
    DochatPage,
    AgendaPage,
    SpkbioPage,
    ImapPage,
    TermsPage,
    PrivacyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignupPage,
    DashboardPage,
    FeedbackPage,
    EventdetailPage,
    TwitterfeedPage,
    ChatPage,
    SpbioPage,
    PbioPage,
    MbioPage,
    DochatPage,
    AgendaPage,
    SpkbioPage,
    ImapPage,
    TermsPage,
    PrivacyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
