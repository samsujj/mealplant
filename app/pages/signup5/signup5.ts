import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController } from 'ionic-angular';
import {SignUp6Page} from '../signup6/signup6';


@Component({
  templateUrl: 'build/pages/signup5/signup5.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp5Page {

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController) {

  }

  helpunit(){
    let alert = this.alertCtrl.create({
      title: 'Activity Level Information',
      message: 'Sedentary - Little or no exercise and desk job \n\n Lightly Active - Ligh daily activity and some excercise 1-3 days a week \n\n Moderately Active - Moderately active daily life and exercise 3-5 days a week \n\n Very Active - Physically demanding lifestyle and hard exercise or sports 6-7 days a week \n\n Extremely Active - Hard daily exercise or sports and physically job',
      buttons: ['OK']
    });
    alert.present();
  }

  nextstep(){
    this.navCtrl.push(SignUp6Page);
  }

}