import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController,ToastController,LoadingController } from 'ionic-angular';
import {SignUp4Page} from '../signup4/signup4';
import {SignUp2Page} from '../signup2/signup2';
import {SignUpPage} from '../signup/signup';


@Component({
  templateUrl: 'build/pages/signup3/signup3.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp3Page {
  private loginForm:FormGroup;

  private unittype:string = '';
  private local:LocalStorage;

  private gender:string='';
  private fattype:string='';
  private height:string='';
  private heightinch:string='';
  private weight:string='';
  private age:string='';

  private userid;

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.local = new Storage(LocalStorage);
    this.local.get('unittype').then((value) => {
      if(value!=null) {
        this.unittype = value;
      }else{
        this.navCtrl.push(SignUp2Page);
      }
    }).catch((err)=>{
      this.navCtrl.push(SignUp2Page);
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

  changegender(val){
    this.gender = val;
  }

  changefattype(val){
    this.fattype = val;
  }

  changeheight(val){
    this.height = val;
  }

  changeheight1(val){
    this.height = val;
    if(this.heightinch == ''){
      this.heightinch = '0';
    }
  }

  changeheightinch(val){
    this.heightinch = val;
  }

  changeweight(val){
    this.weight = val;
  }

  changeage(val){
    this.age = val;
  }

  nextstep(){
    if(this.height == ''){
      let toast = this.toastCtrl.create({
        message: 'Please enter height',
        duration: 2000
      });
      toast.present();
    }else if(this.weight == ''){
      let toast = this.toastCtrl.create({
        message: 'Please enter weight',
        duration: 2000
      });
      toast.present();
    }else if(this.gender == ''){
      let toast = this.toastCtrl.create({
        message: 'Please select gender',
        duration: 2000
      });
      toast.present();
    }else if(this.age == ''){
      let toast = this.toastCtrl.create({
        message: 'Please enter age',
        duration: 2000
      });
      toast.present();
    }else if(this.fattype == ''){
      let toast = this.toastCtrl.create({
        message: 'Please enter bodyfat',
        duration: 2000
      });
      toast.present();
    }else{

      var link = 'http://184.168.146.185:1001/signup3';
      var data = {userid: this.userid,height:this.height,heightinch:this.heightinch,weight:this.weight,gender:this.gender,age:this.age,fattype:this.fattype};

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this._http.post(link, data)
          .subscribe(data => {

            loading.dismiss();

            this.navCtrl.push(SignUp4Page);
          }, error => {
            console.log("Oooops!");
          });


    }

  }


}