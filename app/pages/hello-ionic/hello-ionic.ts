import {Component} from '@angular/core';
import {Page, Platform,NavController} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {DashboardPage} from '../dashboard/dashboard';
import {Http, Headers} from "@angular/http";
import {FbSignUpPage} from '../fbsignup/fbsignup';
import {Splashscreen} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  //providers:[FbProvider],
})
export class HelloIonicPage {
  signupPage=SignUpPage;
  private  platform;
  private local:LocalStorage;
  private isloggedin;




  constructor(platform:Platform,public navCtrl: NavController,private _http: Http) {
    platform.ready().then((readySource) => {
      console.log(readySource);
    });
    this.platform = platform;
    this.local = new Storage(LocalStorage);
    this.local.set('deviceinfo', JSON.stringify(Device.device));


    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.isloggedin=true;
      }
      else{
        this.isloggedin=false;
      }
    });

  }


  ionViewDidEnter() {


    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }


    if(this.isloggedin)this.navCtrl.setRoot(DashboardPage);

  }

  fbsignup() {
    this.platform.ready().then(() => {

      Facebook.login(["email","public_profile"]).then((result) => {

        Facebook.api('/' + result.authResponse.userID + '?fields=id,name,gender,email,first_name,last_name,birthday',[]).then((result1) => {
          var deviceinfo = JSON.stringify(Device.device);

          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          var link = 'http://184.168.146.185:1001/fb-user-signup';
          var data = {username: result1['id'],fname: result1['first_name'],lname: result1['last_name'],email: result1['email'],gender: result1['gender'], deviceinfo: deviceinfo};

          this._http.post(link, data)
              .subscribe(data => {
                var data1 = data.json();
                if(data1.status == 'success'){
                  this.local = new Storage(LocalStorage);
                  this.local.set('insertid', data1.id);

                  this.navCtrl.push(FbSignUpPage);

                }else{
                  alert('Error occured! try again.')
                }
              }, error => {
                alert('Error occured! try again 1.')
              });


        });



      });





    });
  }


}


