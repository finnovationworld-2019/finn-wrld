import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SpkbioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-spkbio',
  templateUrl: 'spkbio.html',
})
export class SpkbioPage {
  imgurl: string = '';
  spk: object = {
   spkid : '',
    company : '',
    desg : '',
    about : '',
    spkcatname: '',
    spkname: '',
    photo: ''
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public dp: DataProvider) {
    this.spk = this.navParams.get("spk");
    this.imgurl= dp.getimgUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpkbioPage');
  }
  cmodal(){
    this.viewCtrl.dismiss();
  }

}
