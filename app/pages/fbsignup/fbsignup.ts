import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import { Control, ControlGroup } from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';


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

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      height: ["", Validators.required],
      heightinch: ["0", Validators.required],
      weight: ["", Validators.required],
      weightunit: ["lb"],
      dob: ["2009-01-01", Validators.required],
      plan: ["0"],
      bodyfat: ["", Validators.required],
      bodyfatunit: ["lb"],
    });


    this.local = new Storage(LocalStorage);
    this.local.get('insertid').then((value) => {
      this.insertid = value;
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



}

