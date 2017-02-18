import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController,ToastController,LoadingController } from 'ionic-angular';
import {SignUp6Page} from '../signup6/signup6';
import {SignUp7Page} from '../signup7/signup7';
import {SignUpPage} from '../signup/signup';


@Component({
  templateUrl: 'build/pages/signup5/signup5.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp5Page {

  private activetype:string = '';
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

  helpunit(){
    let alert = this.alertCtrl.create({
      title: 'Activity Level Information',
      message: 'Sedentary - Little or no exercise and desk job \n\n Lightly Active - Ligh daily activity and some excercise 1-3 days a week \n\n Moderately Active - Moderately active daily life and exercise 3-5 days a week \n\n Very Active - Physically demanding lifestyle and hard exercise or sports 6-7 days a week \n\n Extremely Active - Hard daily exercise or sports and physically job',
      buttons: ['OK']
    });
    alert.present();
  }

  changtype(unitval){
    this.activetype = unitval;
  }

  nextstep(){
    if(this.activetype == ''){
      let toast = this.toastCtrl.create({
        message: 'Please choose active type',
        duration: 2000
      });
      toast.present();
    }else{


      var link = 'http://184.168.146.185:1001/signup5';
      var data = {userid: this.userid,activetype:this.activetype};

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this._http.post(link, data)
          .subscribe(data => {

            loading.dismiss();

            this.navCtrl.push(SignUp7Page);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}