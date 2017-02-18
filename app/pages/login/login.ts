import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import {SignUp6Page} from '../signup6/signup6';
import {SignUp8Page} from '../signup8/signup8';
import { Control, ControlGroup } from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';
import { ActionSheetController,LoadingController,AlertController,ToastController } from 'ionic-angular';
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions} from 'ionic-native';
import { Transfer } from 'ionic-native';
import { MediaCapture } from 'ionic-native';
import {File} from 'ionic-native';
import {DashboardPage} from '../dashboard/dashboard';


@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class LoginPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  public signup2 = SignUp2Page;
  private local:LocalStorage;
  private imagecapturepath;
  private imagepath;
  private filename;
  private bodyfat;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public toastCtrl: ToastController) {

    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });


    this.local = new Storage(LocalStorage);


  }

  doSubmit(event){

    let x:any;

    if(this.loginForm.valid){

      var link = 'http://184.168.146.185:1001/login';
      var data = {username: event.username,password: event.password};

      this._http.post(link, data)
          .subscribe(data => {

            var data1 = data.json();
            if(data1.status == 'success'){
              var data2 = data1.item;

              this.local.set('userdetails', JSON.stringify(data2));

              this.navCtrl.push(DashboardPage);
            }else{
              let toast = this.toastCtrl.create({
                message: data1.msg,
                duration: 3000
              });
              toast.present();
            }
          }, error => {
            console.log("Oooops!");
          });


    }else{
      var errortext='';

      if(this.loginForm.controls['username'].hasError('required')){
        errortext += 'Username is required';
      }else if(this.loginForm.controls['password'].hasError('required')){
        errortext += 'password is required';
      }

      let toast = this.toastCtrl.create({
        message: errortext,
        duration: 3000
      });
      toast.present();

    }

  }



}

