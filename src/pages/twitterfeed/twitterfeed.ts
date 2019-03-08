import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-twitterfeed',
  templateUrl: 'twitterfeed.html',
})
export class TwitterfeedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwitterfeedPage');
  }

}
