import {Component} from '@angular/core';
import {Page, Platform,NavController} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  //providers:[FbProvider],
})
export class LogoutPage {
  signupPage=SignUpPage;
  private  platform;
  private local:LocalStorage;




  constructor(platform:Platform,public navCtrl: NavController) {
    platform.ready().then((readySource) => {
      console.log(readySource);
    });
    this.platform = platform;
    this.local = new Storage(LocalStorage);
    this.local.set('deviceinfo', JSON.stringify(Device.device));

  }

  ngOnInit(){
    this.local = new Storage(LocalStorage);
    this.local.remove('userdetails');
    this.navCtrl.push(HelloIonicPage);
  }


}


