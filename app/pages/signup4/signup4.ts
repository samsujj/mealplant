import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController } from 'ionic-angular';
import {SignUp5Page} from '../signup5/signup5';


@Component({
  templateUrl: 'build/pages/signup4/signup4.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp4Page {

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController) {

  }



  nextstep(){
    this.navCtrl.push(SignUp5Page);
  }

}