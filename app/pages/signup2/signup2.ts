import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController } from 'ionic-angular';
import {SignUp3Page} from '../signup3/signup3';


@Component({
  templateUrl: 'build/pages/signup2/signup2.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp2Page {

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController) {

  }

  helpunit(){
    let alert = this.alertCtrl.create({
      title: 'Unit Information',
      message: 'Imperial includes units of measurement like pounds or feet. \n\n Metric includes units of measurement like kilogram or meters.',
      buttons: ['OK']
    });
    alert.present();
  }

  nextstep(){
    this.navCtrl.push(SignUp3Page);
  }

}