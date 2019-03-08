import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { SpbioPage } from '../../pages/spbio/spbio';
import { MbioPage } from '../../pages/mbio/mbio';
import { AgendaPage } from '../../pages/agenda/agenda';
import { ChatPage } from '../../pages/chat/chat';
import { SpkbioPage } from '../../pages/spkbio/spkbio';
import { ImapPage } from '../imap/imap';

@Component({
  selector: 'page-eventdetail',
  templateUrl: 'eventdetail.html',
})
export class EventdetailPage {
userid: string = '';
baseurl: string = '';
imgurl: string = '';
request: boolean = false;
pending: boolean = false;
details: boolean = false;
smain :boolean =true;
sagenda :boolean =false;
sspeaker :boolean =false;
ssponsor :boolean=false;
spartner :boolean=false;
files: boolean = false;

event: object = {
  eventid: '',
  ename: '',
  evenue: '',
  ecountry: '',
  estate: '',
  elat: '',
  elong: '',
  epin: '',
  edate: '',
  eyear: '',
  ecreate: '',
  epic: '',
  ereport: ''
};
data: any = {
success: '',
got: ''
};
gallery: object = {
success: false,
images: [{}]

};

sponsor: object = {
  success: false,
  sp: [{}]
  
  };
partner: object = {
    success: false,
    mp: [{}]
    
    };
agenda: object = {
      success: false,
      ag: [{}]
      
      };
  speakers: object = {
    success: false,
    speakr: [{}]
  } ;   
slideOpts = {
  effect: 'flip'
};
mychats: number = 0;
ch: object = {
  success: false,
  numchat: 0
};
int1: any;
int2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public dp: DataProvider, public http: Http, public loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public modalCtrl: ModalController) {
  this.userid = this.dp.getuserId();
  this.baseurl = this.dp.getbaseUrl();
  this.imgurl = this.dp.getimgUrl();
  this.event = this.navParams.get("currevent");

this.requestflag();
this.pendingflag();
this.detailsflag();
this.getimages();
this.getsponsor();
this.getpartner();
this.getagenda();
this.getspeakers();
this.getnewchats();
this.dp.getMychats();
this.int1 = setInterval(() => {
  this.getnewchats();
}, 12000);
this.int2 = setInterval(() => {
  this.mychats = this.dp.getMychats();
}, 5000);
  }
sendreq() {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"send-view-request-flag.php?user="+this.userid+"&ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.data = data.json();
    let ss = this.data['success'];
    
    if(ss=="Success")
    {
      load.dismiss();
    this.pending=this.data['got'];
    let t = this.toastCtrl.create({
      message: 'Your request for viewing this event has been sent. We will get back to you ASAP',
      duration: 5000,
      position: 'middle'
    });
    t.present();
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
requestflag () {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"getrequest-flag.php?user="+this.userid+"&ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.data = data.json();
    let ss = this.data['success'];
    
    if(ss=="Success")
    {
      load.dismiss();
    this.request=this.data['got'];
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
pendingflag() {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"getpending-flag.php?user="+this.userid+"&ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.data = data.json();
    let ss = this.data['success'];
    
    if(ss=="Success")
    {
      load.dismiss();
    this.pending=this.data['got'];
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
detailsflag() {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"getdetails-flag.php?user="+this.userid+"&ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.data = data.json();
    let ss = this.data['success'];
    
    if(ss=="Success")
    {
      load.dismiss();
    this.details=this.data['got'];
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
getimages () {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"get-gallery.php?ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.gallery = data.json();
    let ss = this.gallery['success'];
    
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

getsponsor () {
  let load = this.loadingCtrl.create();
  load.present();
  let eid = this.event['eventid'];
  let url = this.baseurl+"get-sponsor.php?ev="+eid;
  //////////////////////////get///////////////////////
  this.http.get(url).subscribe((data) => {
    console.log(data);
    this.sponsor = data.json();
    let ss = this.sponsor['success'];
    
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

getbio(s: object) {
  let md=this.modalCtrl.create(SpbioPage,{"s":s});
  md.onDidDismiss((data) =>{
    //this.mesg=data.ri;
  });
  md.present();
}


  getpartner () {
    let load = this.loadingCtrl.create();
    load.present();
    let eid = this.event['eventid'];
    let url = this.baseurl+"get-partner.php?ev="+eid;
    //////////////////////////get///////////////////////
    this.http.get(url).subscribe((data) => {
      console.log(data);
      this.partner = data.json();
      let ss = this.partner['success'];
      
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

  medbio(p: object) {
    let pd=this.modalCtrl.create(MbioPage,{"p":p});
    pd.onDidDismiss((data) =>{
      //this.mesg=data.ri;
    });
    pd.present();
  }
  
  getagenda(){
    let load = this.loadingCtrl.create();
    load.present();
    let eid = this.event['eventid'];
    let url = this.baseurl+"get-agenda.php?ev="+eid;
    //////////////////////////get///////////////////////
    this.http.get(url).subscribe((data) => {
      console.log(data);
      this.agenda = data.json();
      let ss = this.agenda['success'];
      
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

  agdet(a: object) {
    let pd=this.modalCtrl.create(AgendaPage,{"a":a});
    pd.onDidDismiss((data) =>{
      //this.mesg=data.ri;
    });
    pd.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailPage');
  }
  showmain(){
   this. smain=true;
   this. sagenda=false;
   this. sspeaker=false;
   this. ssponsor=false;
   this. spartner=false;

  }
  showagenda(){
    this.sagenda=true;
    this. smain=false;
   this. sspeaker=false;
   this. ssponsor=false;
   this. spartner=false;

  }

  showspeaker(){
    this.sagenda=false;
    this. smain=false;
   this. sspeaker=true;
   this. ssponsor=false;
   this. spartner=false;
  }

  showsponsor(){
    this.sagenda=false;
    this. smain=false;
   this. sspeaker=false;
   this. ssponsor=true;
   this. spartner=false;
  }
  showpartner(){
    this.sagenda=false;
    this. smain=false;
   this. sspeaker=false;
   this. ssponsor=false;
   this. spartner=true;
  }
  showchat() {
    this.navCtrl.push(ChatPage);
  }
  getspeakers(){
    let load = this.loadingCtrl.create();
    load.present();
    let eid = this.event['eventid'];
    let url = this.baseurl+"get-speakers.php?ev="+eid;
    //////////////////////////get///////////////////////
    this.http.get(url).subscribe((data) => {
      console.log(data);
      this.speakers = data.json();
     // this.speakers = Array.of(this.speakers);
      //console.log("my erro - "+this.speakers);
      let ss = this.speakers['success'];
      
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
openspk(spk: object) {
  let pd=this.modalCtrl.create(SpkbioPage,{"spk":spk});
  pd.onDidDismiss((data) =>{
    //this.mesg=data.ri;
  });
  pd.present();
}
gomap() {
  let pd=this.modalCtrl.create(ImapPage,{"spk":''});
  pd.onDidDismiss((data) =>{
    //this.mesg=data.ri;
  });
  pd.present();
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
  console.log("Exit Event Detail");
}
}
