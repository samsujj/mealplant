import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';


@Component({
  templateUrl: 'build/pages/signup2/signup2.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SignUp2Page {
  public verifyemail=true;
  private loginForm:FormGroup;
  private nav:NavController;
  private local:LocalStorage;

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

  signup2(event){
    let x:any;

    for(x in this.loginForm.controls){
      this.loginForm.controls[x].markAsTouched();

    }

    if(this.loginForm.valid){

      this.local = new Storage(LocalStorage);
      this.local.get('insertid').then((value) => {
        var insertid = value;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var link = 'http://184.168.146.185:1001/user-signup2';
        var data = {_id: insertid,neck: event.neck,neckunit: event.neckunit,shoulders: event.shoulders,shouldersunit: event.shouldersunit,bust: event.bust,bustunit: event.bustunit,armsl: event.armsl,armsr: event.armsr, armsunit: event.armsunit,forearmsl: event.forearmsl,forearmsr: event.forearmsr,forearmsunit: event.forearmsunit,waist: event.waist,waistunit: event.waistunit,navel: event.navel,navelunit: event.navelunit,hips: event.hips,hipsunit: event.hipsunit,thighl: event.thighl, thighr: event.thighr,thighunit: event.thighunit,calvesl: event.calvesl,calvesr: event.calvesr,calvesunit: event.calvesunit};

        this._http.post(link, data)
            .subscribe(data10 => {


              var link2 = 'http://184.168.146.185:1001/getuserdetails';
              var data2 = {_id: insertid};

              this._http.post(link2, data2)
                  .subscribe(data => {
                    var data1 = data.json();
                    if(data1.status == 'success'){
                      var data2 = data1.item;

                      this.navCtrl.push(FatCalculatePage,data2);

                    }else{
                      alert('Error occured! try again.')
                    }
                  }, error => {
                    alert('Error occured! try again.')
                    console.log("Oooops!");
                  });


            }, error => {
              console.log("Oooops!");
            });
      });


    }

  }


}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('vali email called');
  return re.test(email);
}
