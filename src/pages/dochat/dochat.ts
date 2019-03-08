import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';


/**
 * Generated class for the DochatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dochat',
  templateUrl: 'dochat.html',
})
export class DochatPage {
uid: string = '';
name: string = '';
userid: string = '';
baseurl: string = '';
msg: string = '';
chats: object = {
  success: '',
  msgs: [{}]
};
xdata: object = {
  success: '',
  msgs: [{}]
};
seen: object = {
  success: false
};
int1: any;
  constructor(public navCtrl: NavController, public http: Http,public actionsheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public navParams: NavParams, public dp: DataProvider) {
    this.userid = dp.getuserId();
    this.baseurl = dp.getbaseUrl();
    this.uid = this.navParams.get("uid");
    this.name = this.navParams.get("name");
    
    this.getmsg();
    this.getseen();
    this.int1 = setInterval(() => {
      this.getmsg();
    }, 7000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DochatPage');
  
  }
sendchat() {
  if(this.msg=="")
  {
    let acsht = this.actionsheetCtrl.create({
      title: "No messege found!",
      subTitle: "Please say something",
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
  }
  else
  {
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  let url = this.baseurl+"send-chat.php?sender="+this.userid+"&reciever="+this.uid+"&msg="+this.msg;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.xdata=data.json();
    if(this.xdata['success']) {
      this.msg='';
      this.getmsg();
    }
 
  }, (error) => {

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
  ////////////////////////////////////////////////////////////
}
}
getmsg() {
  let url = this.baseurl+"get-chat.php?sender="+this.userid+"&reciever="+this.uid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.chats=data.json();
    if(data['success']) {
   
    }
 
  }, (error) => {

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
getcolor(senid: string) {
  if(senid==this.userid) {
    return 'me';
  }
  else {
    return 'notme';
  }
}
getcolorb(senid: string) {
  if(senid==this.userid) {
    return 'meb';
  }
  else {
    return 'notmeb';
  }
}
getcoloritem(senid: string) {
  if(senid==this.userid) {
    return 'me-item';
  }
  else {
    return 'notme-item';
  }
}
getseen() {
  let url = this.baseurl+"get-seen.php?sender="+this.userid+"&reciever="+this.uid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.seen=data.json();
    if(data['success']) {
   
    }
 
  }, (error) => {

      let acsht = this.actionsheetCtrl.create({
        title: "Something went wrong while seeing chats !",
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
ionViewCanLeave() {
  clearInterval(this.int1);
  //clearInterval(this.int2);
  console.log("Exit do-chat");
}
}
