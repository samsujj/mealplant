import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";


@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUpPage {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confpassword: ["", Validators.required]
    });
  }

  doSubmit(event){
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

    }

  }


}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('vali email called');
  return re.test(email);
}
