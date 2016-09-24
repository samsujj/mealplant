import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2'



@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUpPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  public signup2 = SignUp2Page;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      username: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      email: ["", Validators.required],
      height: ["", Validators.required],
      heightunit: ["in"],
      weight: ["", Validators.required],
      weightunit: ["lb"],
      plan: ["0"],
      bodyfat: ["", Validators.required],
      password: ["", Validators.required],
      confpassword: ["", Validators.required]
    });
  }

  doSubmit(event){

    console.log(event);

    /*
    if(!validateEmail(event.email) && event.email !=''){
      this.verifyemail=false;
      return;
    }

    if(this.loginForm.valid){
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      var link = 'http://184.168.146.185:1001/user-signup';
      var data = {fullname: event.fullname,email: event.email,password: event.password, deviceid: ''};

      this._http.post(link, data)
          .subscribe(data => {
            console.log(data);
          }, error => {
            console.log("Oooops!");
          });

    }*/

  }


}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('vali email called');
  return re.test(email);
}
