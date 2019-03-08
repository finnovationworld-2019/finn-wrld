import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { EventdetailPage } from '../eventdetail/eventdetail';
import { ChatPage } from '../chat/chat';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
userid: string = '';
baseurl: string = '';
imgurl: string = '';
data: any = {
  success: '',
  events: [{}]
} ;
mychats: number = 0;
ch: object = {
  success: false,
  numchat: 0
};
int1: any;
int2: any;
  constructor(public navCtrl: NavController, public http:Http, public navParams: NavParams, public dp: DataProvider, public loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController) {
    this.userid = this.dp.getuserId();
    this.baseurl = this.dp.getbaseUrl();
    this.imgurl = this.dp.getimgUrl();
    this.getnewchats();
    this.dp.getMychats();
 this.int1 =  setInterval(() => {
      this.getnewchats();
    }, 12000);
  this.int2 =  setInterval(() => {
      this.mychats = dp.getMychats();
    }, 5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.getEvents();
  }
  getEvents() {
    let load = this.loadingCtrl.create();
    load.present();
    let url = this.baseurl+"getevents.php";
    //////////////////////////get///////////////////////
    this.http.get(url).subscribe((data) => {
      console.log(data);
      this.data = data.json();
      let ss = this.data['success'];
      
      if(ss=="Success")
      {
        load.dismiss();
      
      }
      else
      {
        load.dismiss();
        let acsht = this.actionsheetCtrl.create({
          title: "Cannot access data !",
          subTitle: "Please retry later ...",
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
viewevent(event: object) {
this.navCtrl.push(EventdetailPage,{"currevent": event})
}
getcolor(n: number) {
  if(n % 2 == 0) {
    return 'bg-light';
  }
  else
  {
    return 'bg-dark';
  }
}
gochat() {
  this.navCtrl.push(ChatPage);
}
///////////////get chat number///////////////////////
getnewchats () {
   
  let url = this.baseurl+"get-new-chats-count.php?user="+this.userid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.ch = data.json();
    let ss = this.ch['success'];
    
    if(ss==true)
    {
    this.mychats=this.ch['numchat'];
    this.dp.setMychats(this.mychats);
    }
    else
    {
  

     
    }
  }, (error) => {

      let acsht = this.actionsheetCtrl.create({
        title: "Something went wrong while getting new chats !",
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
/////////////////////////////////////////////////////
ionViewCanLeave() {
  clearInterval(this.int1);
  clearInterval(this.int2);
  console.log("Exit dashboard");
}
}
