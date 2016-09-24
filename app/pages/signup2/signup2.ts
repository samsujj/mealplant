import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";


@Component({
  templateUrl: 'build/pages/signup2/signup2.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp2Page {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http) {
    this.loginForm = fb.group({
      neck: ["", Validators.required],
      neckunit: ["in", Validators.required],
      shoulders: ["", Validators.required],
      shouldersunit: ["in", Validators.required],
      bust: ["", Validators.required],
      bustunit: ["in", Validators.required],
      armsl: ["", Validators.required],
      armsr: ["", Validators.required],
      armsunit: ["in", Validators.required],
      forearmsl: ["", Validators.required],
      forearmsr: ["", Validators.required],
      forearmsunit: ["in", Validators.required],
      waist: ["", Validators.required],
      waistunit: ["in", Validators.required],
      navel: ["", Validators.required],
      navelunit: ["in", Validators.required],
      hips: ["", Validators.required],
      hipsunit: ["in", Validators.required],
      thighl: ["", Validators.required],
      thighr: ["", Validators.required],
      thighunit: ["in", Validators.required],
      calvesl: ["", Validators.required],
      calvesr: ["", Validators.required],
      calvesunit: ["in", Validators.required]
    });
  }

  doSubmit(event){
    console.log(event);

    /*if(!validateEmail(event.email) && event.email !=''){
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
