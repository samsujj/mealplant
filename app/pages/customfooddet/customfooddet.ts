import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ViewController,NavParams,ActionSheetController,LoadingController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions} from 'ionic-native';
import { Transfer } from 'ionic-native';
import { MediaCapture } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/customfooddet/customfooddet.html',
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
    }
  `],
})
export class CustomFoodDetPage {

  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;

  public foodid;
  public foodtitle;
  public fooddetails;

  public pieChartType:string = 'pie';
  public pieChartOption:any = {
    animation: false,
    responsive: true,
    title: {
      display: false,
    },
    legend : {
      position : 'bottom',
      labels : {
        fontFamily : '"robotobold"',
        fontColor : '#FFFFFF',
        boxWidth : 40
      }
    },
    backgroundColor:['#ff0000','#00ff00','#0000ff']
  };

  public piechartdata;

  public imagepath;
  public filename;


  constructor(fb: FormBuilder,platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public viewCtrl: ViewController,public navparam: NavParams,public actionSheetCtrl: ActionSheetController,public loadingCtrl: LoadingController) {

    this.userdetails = '';

    this.imagepath = 'images/home_back.jpg';

    this.foodid = this.navparam.get('itemid');

    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;

        this.getFoodDetails();
      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });




  }

  getFoodDetails(){
    var link = 'http://184.168.146.185:1001/food-details';
    var data = {_id : this.foodid};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();

          var foodres = result.item;

          console.log(foodres);

          this.foodtitle = foodres.foodname;
          this.fooddetails = foodres;

          if(foodres.image != ''){
            this.imagepath = "http://184.168.146.185/~mealplant/node_server/uploads/"+foodres.image;
          }

          this.piechartdata = [foodres.carbs,foodres.fat,foodres.protein];


        }, error => {
          console.log("Oooops!");
        });
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

            var link99 = 'http://184.168.146.185:1001/edit-foodimage';
            var data99 = {image: this.filename,id:this.foodid};


            this._http.post(link99, data99)
                .subscribe(data => {

                }, error => {
                  console.log("Oooops!");
                });

          }

          loading.dismiss();

        }, (err) => {
          // error

          loading.dismiss();
          alert(JSON.stringify(err));

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

            var link99 = 'http://184.168.146.185:1001/edit-foodimage';
            var data99 = {image: this.filename,id:this.foodid};


            this._http.post(link99, data99)
                .subscribe(data => {

                }, error => {
                  console.log("Oooops!");
                });
          }

          loading.dismiss();

        }, (err) => {
          // error

          loading.dismiss();
          alert(JSON.stringify(err));

        })
  }



}


