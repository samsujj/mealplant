import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController, ToastController ,LoadingController} from 'ionic-angular';
import {SignUp5Page} from '../signup5/signup5';
import {SignUpPage} from '../signup/signup';


@Component({
  templateUrl: 'build/pages/signup4/signup4.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp4Page {

  private goal:string = '';
  private local:LocalStorage;

  private userid;

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
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

  changegoal(unitval){
    this.goal = unitval;
  }

  nextstep(){

    if(this.goal == ''){
      let toast = this.toastCtrl.create({
        message: 'Please choose your goal',
        duration: 2000
      });
      toast.present();
    }else{


     var link = 'http://184.168.146.185:1001/signup4';
      var data = {userid: this.userid,goal:this.goal};

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this._http.post(link, data)
          .subscribe(data => {

            loading.dismiss();

            this.navCtrl.push(SignUp5Page);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}