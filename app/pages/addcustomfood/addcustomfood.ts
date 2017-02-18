import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ViewController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/addcustomfood/addcustomfood.html',
})
export class AddCustomFoodPage {

  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;

  private nutriForm:FormGroup;

  constructor(fb: FormBuilder,platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public viewCtrl: ViewController) {

    this.userdetails = '';

    this.nutriForm = fb.group({
      foodname: ["", Validators.required],
      descripttion: [""],
      calories: ["", Validators.required],
      carbs: ["", Validators.required],
      fat: ["", Validators.required],
      protein: ["", Validators.required],
      type: [""],
      price: ["", Validators.required],
      servingsize: ["1", Validators.required],
      servingtype: ["serving", Validators.required],
    });

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;
      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });




  }


  dosubmit111(formval){


    if(this.nutriForm.valid){
      var link = 'http://184.168.146.185:1001/add-food';
      var data = {foodname: formval.foodname,descripttion: formval.descripttion,calories: formval.calories,carbs: formval.carbs,fat: formval.fat,protein: formval.protein,price: formval.price,servingsize: formval.servingsize,servingtype: formval.servingtype,image:'',userid:this.userid,type:formval.type,is_custom:1};


      this._http.post(link, data)
          .subscribe(data => {
            let data22 = { 'type': 'food' };
            this.viewCtrl.dismiss(data22);
          }, error => {
            console.log("Oooops!");
          });
    }
  }



}


