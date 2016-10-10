import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import { Control, ControlGroup } from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';
import { ActionSheetController,LoadingController } from 'ionic-angular';
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions} from 'ionic-native';
import { Transfer } from 'ionic-native';
import { MediaCapture } from 'ionic-native';
import {File} from 'ionic-native';


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
  private imagecapturepath;
  private imagepath;
  private filename;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController) {
    this.imagepath=false;
    this.imagecapturepath=false;
    this.filename='';

    this.loginForm = fb.group({
      username: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
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
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
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
        var data = {username: event.username,fname: event.fname,lname: event.lname,email: event.email,height: event.height,heightinch: event.heightinch,weight: event.weight,weightunit: event.weightunit,dob: event.dob,gender: event.gender, plan: event.plan,bodyfat: event.bodyfat,bodyfatunit: event.bodyfatunit,password: event.password, deviceinfo: deviceinfo,profilepicture : this.filename};

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

  addPhoto(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Profile Picture',
      cssClass : 'photoSheet',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.opencamera();
          }
        },{
          text: 'Gallery',
          icon: 'photos',
          handler: () => {
            this.openphotobowse();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openphotobowse(){

    let options = {
      // max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 80,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 1024,
      height: 0,

      // quality of resized image, defaults to 100
      quality: 90
    };
    //noinspection TypeScriptUnresolvedFunction
    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagepath=results[i];

        this.uploadpic();
      }
    }, (err) => {

      alert(err);

    });
  }

  uploadpic(){

    let loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    loading.present();


    const fileTransfer = new Transfer();
    var options: any;

    options = {
      fileKey: 'file',
      //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
      fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.mealp705764/cache/',''),
      headers: {}

    }
    //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
    fileTransfer.upload(this.imagepath, "http://184.168.146.185:1001/uploads", options)
        .then((data) => {
          // success

          var data1:any = JSON.parse(data.response);

          if(data1.error_code == 0){
            this.filename = data1.filename;
          }

          loading.dismiss();

        }, (err) => {
          // error

          loading.dismiss();
          alert(err);

        })
  }

  uploadpic2(){

    let loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    loading.present();


    const fileTransfer = new Transfer();
    var options: any;

    options = {
      fileKey: 'file',
      //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
      fileName: this.imagepath.toString().replace('file:/storage/emulated/0/Pictures/',''),
      headers: {}

    }
    //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
    fileTransfer.upload(this.imagepath, "http://184.168.146.185:1001/uploads", options)
        .then((data) => {
          // success

          alert(data.response);

          var data1:any = JSON.parse(data.response);



          if(data1.error_code == 0){
            this.filename = data1.filename;
          }

          loading.dismiss();

        }, (err) => {
          // error

          loading.dismiss();
          alert(err);

        })
  }


  opencamera(){
    let options: CaptureImageOptions = { limit: 1 };
    MediaCapture.captureImage(options)
        .then(
            (data: MediaFile[]) => {
              this.imagepath=data[0]['fullPath'];
              this.uploadpic2();

            },
            (err: CaptureError) => { }
        );
  }



}

