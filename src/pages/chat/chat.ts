import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { DochatPage } from '../dochat/dochat';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
users: object = {
  success: '',
  userinfo: [{}]
};
myusers: object = {
  success: '',
  userinfo: [{}]
};
userid: string = '';
baseurl: string = '';
imgurl: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public dp: DataProvider) {
    this.baseurl = this.dp.getbaseUrl();
    this.userid = this.dp.getuserId();
    this.getUsers();
    this.getmyUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
getUsers() {
  let load = this.loadingCtrl.create();
  load.present();
 
  let url = this.baseurl+"get-users.php?user="+this.userid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.users = data.json();
    let ss = this.users['success'];
    
    if(ss==true)
    {
      load.dismiss();
  
    }
    else
    {
      load.dismiss();
     
     
    }
  }, (error) => {
load.dismiss();
      let acsht = this.actionsheetCtrl.create({
        title: "Something went wrong !",
        subTitle: "Please retry",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            icon: "close",
            handler: () => {
             // acsht.dismiss();
            }
          }
        ]
      });
      acsht.present();
     
  })
  /////////////////////////////////////////////////////
}
getmyUsers() {
  let load = this.loadingCtrl.create();
  load.present();
 
  let url = this.baseurl+"get-my-users.php?user="+this.userid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.myusers = data.json();
    let ss = this.users['success'];
    
    if(ss==true)
    {
      load.dismiss();
  
    }
    else
    {
      load.dismiss();
     
     
    }
  }, (error) => {
load.dismiss();
      let acsht = this.actionsheetCtrl.create({
        title: "Something went wrong !",
        subTitle: "Please retry",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            icon: "close",
            handler: () => {
             // acsht.dismiss();
            }
          }
        ]
      });
      acsht.present();
     
  })
  /////////////////////////////////////////////////////
}
dochat(uid,name) {
  this.navCtrl.push(DochatPage,{"uid": uid, "name": name})
}
}
