import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';



@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  userid: string = '';
  message: string = '';
  baseurl: string = '';
  data: any = {
    success: ''
  };

  constructor(public navCtrl: NavController, public http:Http, public navParams: NavParams, public dp: DataProvider, public loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
    this.userid = this.dp.getuserId();
    this.baseurl = this.dp.getbaseUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  submit(){
    
    if(this.message=='')
    {
      
      let acsht = this.actionsheetCtrl.create({
        title: "Please type a message",
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
    else {
      let load=this.loadingCtrl.create();
      load.present();
      let url=this.baseurl+'feedback.php?userid='+this.userid+'&message='+this.message;
      this.http.get(url).subscribe((data) => {
        console.log(data);
        this.data=data.json();
        let ss=this.data['success'];
        
        if(ss=="Success")
        {
          load.dismiss();
          let t=this.toastCtrl.create({
            message: "Your feedback was submitted !",
            duration: 5000,
            position: "bottom"
          });
          t.present();
          this.navCtrl.setRoot(DashboardPage);
        }
        else
        {
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
        }
      },(error) => {
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
      });
    }
  }

}
