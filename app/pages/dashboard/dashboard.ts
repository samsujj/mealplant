import {Component} from '@angular/core';
import {Page, Platform,NavController} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {LogoutPage} from '../logout/logout';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  //providers:[FbProvider],
})
export class DashboardPage {
  signupPage=SignUpPage;
  private  platform;
  private local:LocalStorage;
  private logoutpage=LogoutPage;




  constructor(platform:Platform,public navCtrl: NavController) {
    platform.ready().then((readySource) => {
      console.log(readySource);
    });
    this.platform = platform;
    this.local = new Storage(LocalStorage);
    this.local.set('deviceinfo', JSON.stringify(Device.device));

  }

  login() {
    alert(90);

    this.platform.ready().then(() => {

      Facebook.login(["email","public_profile"]).then((result) => {
        console.log(result);
        alert(result);

        Facebook.api('/' + result.authResponse.userID + '?fields=id,name,gender,email,first_name,last_name,birthday',[]).then((result1) => {
          var x;
          for (x in result1){
            alert(x+'---'+result1[x]);
          }


        });



      });





    });
  }


}


