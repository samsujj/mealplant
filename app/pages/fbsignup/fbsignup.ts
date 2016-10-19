import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import { Control, ControlGroup } from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';
import { ActionSheetController,LoadingController,AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/fbsignup/fbsignup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class FbSignUpPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  public signup2 = SignUp2Page;
  private local:LocalStorage;
  private insertid;
  private imagepath;
  private bodyfat;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http,public alertCtrl: AlertController) {
    this.imagepath = '';
    this.bodyfat = '';


    this.loginForm = fb.group({
      height: ["", Validators.required],
      heightinch: ["", Validators.required],
      weight: ["", Validators.required],
      weightunit: ["lb"],
      dob: ["2009-01-01", Validators.required],
      plan: ["0"],
      bodyfat: [this.bodyfat, Validators.required],
      bodyfatunit: ["lb"],
    });


    this.local = new Storage(LocalStorage);
    this.local.get('insertid').then((value) => {
      this.insertid = value;

      var link2 = 'http://184.168.146.185:1001/getuserdetails';
      var data2 = {_id: value};

      this._http.post(link2, data2)
          .subscribe(data => {
            var data1 = data.json();
            if(data1.status == 'success'){
              var data2 = data1.item;

              this.imagepath = 'https://graph.facebook.com/'+data2.username+'/picture?type=large';

            }else{
              alert('Error occured! try again.')
            }
          }, error => {
            alert('Error occured! try again.')
            console.log("Oooops!");
          });


    });


  }

  doSubmit(event){

    let x:any;
    console.log(this.loginForm.value.dob);

    for(x in this.loginForm.controls){
      this.loginForm.controls[x].markAsTouched();

    }

    if(this.loginForm.valid){

      this.local = new Storage(LocalStorage);
      this.local.get('deviceinfo').then((value) => {
        var deviceinfo = value;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var link = 'http://184.168.146.185:1001/fb-user-signup2';
        var data = {_id: this.insertid,height: event.height,heightinch: event.heightinch,weight: event.weight,weightunit: event.weightunit,dob: event.dob, plan: event.plan,bodyfat: event.bodyfat,bodyfatunit: event.bodyfatunit};

        this._http.post(link, data)
            .subscribe(data => {
              var data1 = data.json();
              if(data1.status == 'success'){
                this.navCtrl.push(SignUp2Page);
              }else{
                alert('Error occured! try again.');
              }
            }, error => {
              alert('Error occured! try again 12');
            });
      });


    }

  }



  deviceinfo(){
    this.local = new Storage(LocalStorage);
    this.local.get('deviceinfo').then((value) => {
      alert(value);
    })
  }

  calcbodyfat(){
    if(isNaN(this.loginForm.value.weight) || this.loginForm.value.weight == ''){
      alert('Please enter your weight');
      return;
    }
    if(isNaN(this.loginForm.value.height) || this.loginForm.value.height == ''){
      alert('Please enter your height');
      return;
    }

    if(this.loginForm.value.gender == 'female'){
      var inputvar = [
        {
          name: 'neck',
          placeholder: 'Neck(inches)',
          type:'number'
        },
        {
          name: 'waist',
          placeholder: 'Waist(inches)',
          type:'number'
        },
        {
          name: 'hip',
          placeholder: 'Hip(inches)',
          type:'number'
        }];
    }else{
      var inputvar = [
        {
          name: 'neck',
          placeholder: 'Neck(inches)',
          type:'number'
        },
        {
          name: 'waist',
          placeholder: 'Waist(inches)',
          type:'number'
        }];
    }


    let prompt = this.alertCtrl.create({
      title: 'Body Fat',
      message: "Calculate body fat.",
      inputs: inputvar,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var isValid = 1;
            if(isNaN(data.waist) || data.waist == ''){
              isValid = 0;
            }
            if(isNaN(data.neck) || data.neck == ''){
              isValid = 0;
            }



            if(isValid){
              var link = 'http://184.168.146.185:1001/fatcalculate';

              data = Object.assign(data, {weight : this.loginForm.value.weight,height : this.loginForm.value.height,heightinch : this.loginForm.value.heightinch});

              this._http.post(link, data)
                  .subscribe(data1 => {
                    var data12 = data1.json();

                      (<FormControl>this.loginForm.controls['bodyfat']).updateValue(data12.bodyfat);

                  }, error => {
                    console.log("Oooops!");
                  });
            }

          }
        }
      ]
    });
    prompt.present();
  }


}

