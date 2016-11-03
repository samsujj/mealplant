import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import {SignUp2Page} from '../signup2/signup2';
import { Control, ControlGroup } from "@angular/common";
import { Storage, LocalStorage } from 'ionic-angular';
import { ActionSheetController,LoadingController,AlertController,ToastController } from 'ionic-angular';
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
  private bodyfat;

  constructor(fb: FormBuilder,public navCtrl: NavController,private _http: Http,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public toastCtrl: ToastController) {
    this.imagepath=false;
    this.imagecapturepath=false;
    this.filename='';
    this.bodyfat='';

    this.loginForm = fb.group({
      username: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      email: ["", Validators.required],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  doSubmit(event){
    this.navCtrl.push(SignUp2Page);


    /*let x:any;

    if(this.loginForm.valid){

      this.local = new Storage(LocalStorage);
      this.local.get('deviceinfo').then((value) => {
        var deviceinfo = value;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var link = 'http://184.168.146.185:1001/user-signup';
        var data = {username: event.username,email: event.email,password: event.password, deviceinfo: deviceinfo};

        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();

        this._http.post(link, data)
            .subscribe(data => {

              loading.dismiss();

              var data1 = data.json();
              if(data1.status == 'success'){
                this.local = new Storage(LocalStorage);
                this.local.set('insertid', data1.id);

                this.navCtrl.push(SignUp2Page);
              }else{
                let toast = this.toastCtrl.create({
                  message: data1.msg,
                  duration: 5000
                });
                toast.present();
              }
            }, error => {
              console.log("Oooops!");
            });
      });


    }else{
      var errortext='';

      if(this.loginForm.controls['username'].hasError('required')){
        errortext += 'Username is required\n';
      }else if(this.loginForm.controls['username'].hasError('minlength')){
        errortext += 'Minimum username length is 3!\n';
      }else if(this.loginForm.controls['username'].hasError('maxlength')){
        errortext += 'Maximum username length is 25!\n';
      }else if(this.loginForm.controls['email'].hasError('required')){
        errortext += 'Email is required\n';
      }else if(this.loginForm.controls['password'].hasError('required')){
        errortext += 'password is required\n';
      }else if(this.loginForm.controls['password'].hasError('minlength')){
        errortext += 'Minimum password length is 8!\n';
      }

      let toast = this.toastCtrl.create({
        message: errortext,
        duration: 5000
      });
      toast.present();

    }*/

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

