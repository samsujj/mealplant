import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ToastController,LoadingController,NavParams} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,FormControl} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {BodyCompositionPage} from '../bodycomposition/bodycomposition';

@Component({
  templateUrl: 'build/pages/bodycompositionform/bodycompositionform.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
  //providers:[FbProvider],
})
export class BodyCompositionFormPage {
  private  platform;
  private userdetails;
  private username;
  private local:LocalStorage;
  private formgr:FormGroup;
  private isLoad;

  public userid;
  public unittype;
  public height;
  public heightinch;
  public weight;


  public composition;



  constructor(fb: FormBuilder,platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,public toastCtrl: ToastController,public loadingCtrl: LoadingController,private _http: Http,private navParams: NavParams) {

    this.composition = this.navParams.get('composition');


    this.heightinch = 0;

    if(typeof (this.composition) != 'undefined'){
      this.formgr = fb.group({
        weight: [this.composition.weight, Validators.required],
        neck: [this.composition.neck, Validators.required],
        wrist: [this.composition.wrist, Validators.required],
        shoulders: [this.composition.shoulders],
        chest: [this.composition._id],
        bust: [this.composition.bust],
        armsl: [this.composition.armsl],
        armsr: [this.composition.armsr],
        forearmsl: [this.composition.forearmsl, Validators.required],
        forearmsr: [this.composition.forearmsr, Validators.required],
        waist: [this.composition.waist, Validators.required],
        navel: [this.composition.navel],
        hips: [this.composition.hips, Validators.required],
        thighl: [this.composition.thighl],
        thighr: [this.composition.thighr],
        calvesl: [this.composition.calvesl],
        calvesr: [this.composition.calvesr],
        unittype: [this.composition.unittype],
        userid: [this.composition.userid],
        gender: [""],
        id: [this.composition._id],
      });
    }else{
      this.formgr = fb.group({
        weight: ["", Validators.required],
        neck: ["", Validators.required],
        wrist: ["", Validators.required],
        shoulders: [""],
        chest: [""],
        bust: [""],
        armsl: [""],
        armsr: [""],
        forearmsl: ["", Validators.required],
        forearmsr: ["", Validators.required],
        waist: ["", Validators.required],
        navel: [""],
        hips: ["", Validators.required],
        thighl: [""],
        thighr: [""],
        calvesl: [""],
        calvesr: [""],
        unittype: [""],
        userid: [""],
        gender: [""],
      });
    }





    this.userdetails = '';

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;

        this.userid = this.userdetails._id;
        this.unittype = this.userdetails.unittype;
        this.height = this.userdetails.height;
        this.weight = this.userdetails.weight;

        if(this.unittype == 'imperial'){
          this.heightinch = this.userdetails.heightinch;
        }

        (<FormControl>this.formgr.controls['unittype']).updateValue(this.unittype);
        (<FormControl>this.formgr.controls['userid']).updateValue(this.userid);
        (<FormControl>this.formgr.controls['gender']).updateValue(this.userdetails.gender);

        this.isLoad = 1;

      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });

  }

  addhideclass(hparam){
    if(typeof (hparam) == 'undefined'){
      return 'hide';
    }else{
      if(!hparam){
        return 'hide';
      }
    }

    return '';
  }

  unittypeclass(){
    if(this.unittype == 'imperial'){
      return 'unitspan2';
    }

    return '';
  }

  menutog(){
    this.menuCtrl.open();
  }

  signup2(formval){
    if(this.formgr.valid){

      var link;

      if(typeof (this.composition) != 'undefined'){
        link = 'http://184.168.146.185:1001/editbodycomposition';
      }else{
        link = 'http://184.168.146.185:1001/addbodycomposition';
      }

      this._http.post(link, formval)
          .subscribe(data => {

            var data1 = data.json();

            let toast = this.toastCtrl.create({
              message: data1.msg,
              duration: 3000
            });
            toast.present();

            if(data1.status == 'success'){
              this.navCtrl.push(BodyCompositionPage);
            }



          }, error => {
           let toast = this.toastCtrl.create({
              message: 'Error ocurred! Try again.',
              duration: 3000
            });
            toast.present();
            console.log("Oooops!");
          });
    }else{
      var errortext='';

      if(this.formgr.controls['weight'].hasError('required')){
        errortext = 'Please enter weight value';
      }else if(this.formgr.controls['waist'].hasError('required')){
        errortext = 'Please enter wiast value';
      }else if(this.formgr.controls['neck'].hasError('required')){
        errortext = 'Please enter neck value';
      }else if(this.formgr.controls['hips'].hasError('required')){
        errortext = 'Please enter hips value';
      }else if(this.formgr.controls['wrist'].hasError('required')){
        errortext = 'Please enter wrist value';
      }else if(this.formgr.controls['forearmsl'].hasError('required')){
        errortext = 'Please enter foreamrs value';
      }else if(this.formgr.controls['forearmsr'].hasError('required')){
        errortext = 'Please enter foreamrs value';
      }

      let toast = this.toastCtrl.create({
        message: errortext,
        duration: 3000
      });
      toast.present();
    }
  }

}


