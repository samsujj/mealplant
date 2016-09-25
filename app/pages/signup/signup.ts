import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import {ControlGroup} from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';



@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUpPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  public signup2 = SignUp2Page;
  private local:LocalStorage;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      username: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: ["", Validators.required],
      height: ["", Validators.required],
      heightinch: ["0", Validators.required],
      weight: ["", Validators.required],
      weightunit: ["lb"],
      dob: ["2009-01-01", Validators.required],
      plan: ["0"],
      gender: ["male"],
      bodyfat: ["", Validators.required],
      bodyfatunit: ["lb"],
      password: ["", Validators.required],
      confpassword: ["", Validators.required]
    }, {validator: this.matchingPasswords('password', 'confpassword')});
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

        var link = 'http://184.168.146.185:1001/user-signup';
        var data = {username: event.username,fname: event.fname,lname: event.lname,email: event.email,height: event.height,heightinch: event.heightinch,weight: event.weight,weightunit: event.weightunit,dob: event.dob,gender: event.gender, plan: event.plan,bodyfat: event.bodyfat,bodyfatunit: event.bodyfatunit,password: event.password, deviceinfo: deviceinfo};

        this._http.post(link, data)
            .subscribe(data => {
              var data1 = data.json();
              if(data1.status == 'success'){
                this.local = new Storage(LocalStorage);
                this.local.set('insertid', data1.id);

                this.navCtrl.push(SignUp2Page);
              }else{
                alert('Error occured! try again.')
              }
            }, error => {
              console.log("Oooops!");
            });
      });


    }

  }


  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  deviceinfo(){
    this.local = new Storage(LocalStorage);
    this.local.get('deviceinfo').then((value) => {
      alert(value);
    })
  }



}

