import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import { DataProvider } from '../../providers/data/data';
import { DashboardPage } from '../dashboard/dashboard';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
username: string = '';
password: string = '';
baseurl: string = '';
data: any =  {
  success: ''
}
tab1Root: any = DashboardPage;
tab2Root: any = DashboardPage;
  constructor(public navCtrl: NavController, public dp: DataProvider, public actionsheetCtrl: ActionSheetController, public http:Http, public loadingCtrl: LoadingController) {
this.baseurl = dp.getbaseUrl();
  }
  login() {
    if(this.username=="" || this.password=="")
    {
      let acsht = this.actionsheetCtrl.create({
        title: "Improper input!",
        subTitle: "Please enter username and password",
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
      let load = this.loadingCtrl.create();
      load.present();
      let url= this.baseurl+"login.php?username="+this.username+"&password="+this.password;
      this.http.get(url).subscribe((data) => {
        console.log(data);
        this.data = data.json();
        let ss = this.data['success'];
        
        if(ss=="Success")
        {
          load.dismiss();
          this.dp.setLogged(true);
          let uid = this.data['userid'];
          this.dp.setuserId(uid);
          this.navCtrl.setRoot(DashboardPage);
        }
        else
        {
          load.dismiss();
          let acsht = this.actionsheetCtrl.create({
            title: "Invalid Username / Password !",
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
    }
  }
  signup() {
    this.navCtrl.push(SignupPage);
  }
  forgot() {

  }

}
