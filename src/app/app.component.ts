import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DataProvider } from '../providers/data/data';
import { FeedbackPage } from '../pages/feedback/feedback';
import { TwitterfeedPage } from '../pages/twitterfeed/twitterfeed';
import { ChatPage } from '../pages/chat/chat';
import { Http } from '@angular/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  SignupPage1: string = 'SignupPage';
  HomePage1: string = 'Homepage';
  DashboardPage1: string = 'DashboardPage';
  logged: boolean = false;
  userid: string;
  mychats: number;
  baseurl: string;
 

  constructor(public platform: Platform, public http: Http, public actionsheetCtrl: ActionSheetController, public statusBar: StatusBar, public splashScreen: SplashScreen, public dp: DataProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
    this.logged=this.dp.getLogged();
    this.userid=this.dp.getuserId();
    this.baseurl=this.dp.getbaseUrl();
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page);
  }
  openSignup() {
    this.logged = this.dp.getLogged();
    this.nav.setRoot(SignupPage);
  }
  openLogin() {
    this.logged = this.dp.getLogged();
    this.nav.setRoot(HomePage);
  }
  openDashboard() {
    this.logged = this.dp.getLogged();
    this.nav.setRoot(DashboardPage);
  }
  openFeedback() {
    this.logged = this.dp.getLogged();
    this.nav.setRoot(FeedbackPage);
  }
  openChat() {
    this.logged = this.dp.getLogged();
    this.nav.setRoot(ChatPage);
  }
  openTwitter() {
    this.nav.push(TwitterfeedPage);
  }
  logout() {
    this.dp.setLogged(false);
    this.dp.setuserId("-");
    this.logged = this.dp.getLogged();
    this.nav.setRoot(HomePage);
  }
  
}
