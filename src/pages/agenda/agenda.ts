import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';


@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  imgurl: string = '';
  a: object = {
   success : '',
   ag : [{}]
 }; 

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public dp: DataProvider)
   {
   this.a = this.navParams.get("a");
    this.imgurl= dp.getimgUrl(); 
    
  };
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }
  cmodal(){
    this.viewCtrl.dismiss();
  }


}
