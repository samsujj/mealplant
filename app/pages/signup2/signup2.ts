import {Component} from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController,LoadingController } from 'ionic-angular';
import {SignUp3Page} from '../signup3/signup3';
import {SignUpPage} from '../signup/signup';


@Component({
  templateUrl: 'build/pages/signup2/signup2.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp2Page {

  private unittype:string = '';
  private local:LocalStorage;

  private userid;

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {

    this.local = new Storage(LocalStorage);
    this.local.get('unittype').then((value) => {
      if(value!=null) {
        this.unittype = value;
      }
    });




    this.local = new Storage(LocalStorage);
    this.local.get('insertid').then((value) => {
      if(value!=null) {
        this.userid = value;
      }else{
        this.navCtrl.push(SignUpPage);
      }
    }).catch((err)=>{
      this.navCtrl.push(SignUpPage);
    });

  }

  helpunit(){
    let alert = this.alertCtrl.create({
      title: 'Unit Information',
      message: 'Imperial includes units of measurement like pounds or feet. \n\n Metric includes units of measurement like kilogram or meters.',
      buttons: ['OK']
    });
    alert.present();
  }

  changeunit(unitval){
    this.unittype = unitval;
  }

  nextstep(){
    if(this.unittype == ''){
      let toast = this.toastCtrl.create({
        message: 'Please choose measurement unit;',
        duration: 2000
      });
      toast.present();
    }else{
      this.local = new Storage(LocalStorage);
      this.local.set('unittype', this.unittype);



      var link = 'http://184.168.146.185:1001/signup2';
      var data = {userid: this.userid,unittype:this.unittype};

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this._http.post(link, data)
          .subscribe(data => {

            loading.dismiss();

            this.navCtrl.push(SignUp3Page);
          }, error => {
            console.log("Oooops!");
          });




    }
  }

}