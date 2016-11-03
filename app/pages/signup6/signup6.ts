import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController } from 'ionic-angular';
import {SignUp3Page} from '../signup3/signup3';


@Component({
  templateUrl: 'build/pages/signup6/signup6.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp6Page {

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController) {

  }

  helpunit(){
    let alert = this.alertCtrl.create({
      title: 'Diet Type',
      message: 'Anything Diet : No exclusions \n\n Paleo Diet : The paleo diet suggests that you eat only what a person in a hunter-gathered society would eat. This results in cutting out processed foods and many sources of carbs. \n\n Vegeterian diet : The vegeterian diet will cut out meats from your meal plans. \n\n Vegan diet : The vegan diet will cut out all animal products from your meal plans \n\n Atkins / ketogenic diet : The atkins diet involes eating few enough carbs to put your body into ketosisi, where you use fats as your primary energy source. \n\n Mediterranean diet : The mediterranean diet is inspired by the dietary patterns of Mediterranean cultures . It focuses on consumtion of fruits, vegetables, fish, some dairy and few meats. The generator does not portion your foods as specifically as a strict mediterranean diet suggests, but it will cut many of the restricted foods.',
      buttons: ['OK']
    });
    alert.present();
  }

  nextstep(){
    this.navCtrl.push(SignUp3Page);
  }

}