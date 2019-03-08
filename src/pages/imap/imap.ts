import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-imap',
  templateUrl: 'imap.html',
})
export class ImapPage {
baseurl: string = '';
proxyurl: string = "https://cors-anywhere.herokuapp.com/";
iurl: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dp: DataProvider) {
  this.baseurl = dp.getbaseUrl();
  //this.iurl = this.baseurl+"map1.php";
  this.iurl = "https://www.google.com/maps/dir/?api=1&destination=60.626200,16.776800&travelmode=driving";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImapPage');
  }
  cmodal(){
    this.viewCtrl.dismiss();
  }
}
