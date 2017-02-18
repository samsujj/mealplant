import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController,LoadingController } from 'ionic-angular';
import {SignUp8Page} from '../signup8/signup8';
import {SignUp6Page} from '../signup6/signup6';
import {SignUpPage} from '../signup/signup';


@Component({
  templateUrl: 'build/pages/signup7/signup7.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp7Page {
  private diettype;
  private local:LocalStorage;
  private automaticallyexcludes;

  private exc_list;

  private userid;


  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

    this.exc_list = [];
    this.automaticallyexcludes = 'No exclusion';

    this.local = new Storage(LocalStorage);
    /*this.local.get('diettype').then((value) => {
      if(value!=null) {
        this.diettype = value;

        this.getdiettype();

      }else{
        this.navCtrl.push(SignUp6Page);
      }
    }).catch((err)=>{
      this.navCtrl.push(SignUp6Page);
    });*/

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
      title: 'Diet Type',
      message: 'Anything Diet : No exclusions \n\n Paleo Diet : The paleo diet suggests that you eat only what a person in a hunter-gathered society would eat. This results in cutting out processed foods and many sources of carbs. \n\n Vegeterian diet : The vegeterian diet will cut out meats from your meal plans. \n\n Vegan diet : The vegan diet will cut out all animal products from your meal plans \n\n Atkins / ketogenic diet : The atkins diet involes eating few enough carbs to put your body into ketosisi, where you use fats as your primary energy source. \n\n Mediterranean diet : The mediterranean diet is inspired by the dietary patterns of Mediterranean cultures . It focuses on consumtion of fruits, vegetables, fish, some dairy and few meats. The generator does not portion your foods as specifically as a strict mediterranean diet suggests, but it will cut many of the restricted foods.',
      buttons: ['OK']
    });
    alert.present();
  }

  getdiettype(){
    this.automaticallyexcludes = 'No exclusion';
    /*if(this.diettype == 'anything'){
      this.automaticallyexcludes = 'No exclusion';
    }
    if(this.diettype == 'paleo'){
      this.automaticallyexcludes = 'Grains, Legumes, Starchy, Vegetables, Soy, Dairy';
    }
    if(this.diettype == 'vegeterian'){
      this.automaticallyexcludes = 'Red Meat, Poutry, Fish, Shellfish';
    }
    if(this.diettype == 'vegan'){
      this.automaticallyexcludes = 'Red Meat, Poutry, Fish, Shellfish, Dairy, Eggs, Honey';
    }
    if(this.diettype == 'atkins'){
      this.automaticallyexcludes = 'Grains, Legumes, Starchy, Vegetables, Fruit';
    }
    if(this.diettype == 'mediterranean'){
      this.automaticallyexcludes = 'Red Meat, Fruit juice, Starchy, Vegetables';
    }*/
  }

  changetxtval(ev){
    if(ev.keyCode == 13){
      this.exc_list.push(ev.target.value);
      ev.target.value = '';
    }
  }

  selctitem(val){
    if(this.exc_list.indexOf(val) == -1){
      this.exc_list.push(val);
    }
  }

  removeitem(val){
    var index = this.exc_list.indexOf(val);
    if (index > -1) {
      this.exc_list.splice(index, 1);
    }
  }

  isshow(val){
    if(this.exc_list.indexOf(val) > -1){
      return true;
    }else{
      return false;
    }
  }

  nextstep(){


    var link = 'http://184.168.146.185:1001/signup7';
    var data = {userid: this.userid,excludesList:this.exc_list};

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this._http.post(link, data)
        .subscribe(data => {

          loading.dismiss();

          this.navCtrl.push(SignUp8Page);
        }, error => {
          console.log("Oooops!");
        });

  }



}