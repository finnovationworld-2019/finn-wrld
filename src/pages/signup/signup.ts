import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController ,ToastController, LoadingController} from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http} from '@angular/http';
import { DataProvider } from '../../providers/data/data';
import { HttpClient } from '@angular/common/http';
import { PrivacyPage } from '../privacy/privacy';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  name1: string ='';
  company: string = '';
  designation: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';
  baseurl: string='';
  data: any = {
    success: ''
  };
  termsv: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public http: Http, public dp: DataProvider, public httpClient: HttpClient) {
    this.baseurl=dp.getbaseUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  signup(){
    //alert(this.termsv);
    if(this.name1==''|| this.company=="" || this.designation=="" || this.username=="" || this.password=="")
    {
      
      let acsht = this.actionsheetCtrl.create({
        title: "Improper input!",
        subTitle: "Please enter all fields correctly",
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
      if(this.termsv==undefined)
      {
        let acsht = this.actionsheetCtrl.create({
          title: "Agree to our terms.",
          subTitle: "Please accept our Terms & Privacy Policy",
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
      ///////////////////////////// sign up /////////////////////////////////////
      let load=this.loadingCtrl.create();
      load.present();
      let url=this.baseurl+'register.php?name1='+this.name1+'&company='+this.company+'&designation='+this.designation+'&phone='+this.phone+'&username='+this.username+'&password='+this.password;
      this.http.get(url).subscribe((data) => {
        this.data=data.json();
        let ss=this.data['success'];
        console.log(data);
        if(ss=="Success"){
          load.dismiss();
          let t=this.toastCtrl.create({
            message: "You have successfully registered.",
            duration: 5000,
            position: "bottom"
          });
          t.present();
          this.navCtrl.push(HomePage);
        }
        else {
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
   //////////////////////////////////////////////////////////////////////   
    }
    }
  }
  privacy() {
this.navCtrl.push(PrivacyPage);
  }
  terms() {
this.navCtrl.push(TermsPage);
  }
}
