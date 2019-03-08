import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-spbio',
  templateUrl: 'spbio.html',
  
})
export class SpbioPage {
  imgurl: string = '';
  s: object = {
    spnid : '',
    spname : '',
    spncatname : '',
    spbio : '',
    photo : ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dp: DataProvider) {
    this.s = this.navParams.get("s");
    this.imgurl= dp.getimgUrl();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpbioPage');
  }
  cmodal(){
    this.viewCtrl.dismiss();
  }

}
