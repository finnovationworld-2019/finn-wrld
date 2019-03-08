import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mbio',
  templateUrl: 'mbio.html',
})
export class MbioPage {
  imgurl: string = '';
  p: object = {
    mid : '',
    mname : '',
    mbio : '',
    mpic : ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public dp: DataProvider) {
    this.p = this.navParams.get("p");
    this.imgurl= dp.getimgUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MbioPage');
  }
  cmodal(){
    this.viewCtrl.dismiss();
  }

}
