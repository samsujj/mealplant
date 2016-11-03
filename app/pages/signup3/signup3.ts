import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController } from 'ionic-angular';
import {SignUp4Page} from '../signup4/signup4';


@Component({
  templateUrl: 'build/pages/signup3/signup3.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp3Page {
  private _number;

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController) {

  }

  nextstep(){
    this.navCtrl.push(SignUp4Page);
  }


}