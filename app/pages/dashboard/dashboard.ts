import {Component} from '@angular/core';
import {Page, Platform,NavController,MenuController} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {LogoutPage} from '../logout/logout';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  //providers:[FbProvider],
})
export class DashboardPage {
  signupPage=SignUpPage;
  private  platform;
  private userdetails;
  private username;
  private local:LocalStorage;
  private logoutpage=LogoutPage;
  private isLoad;




  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController) {
    platform.ready().then((readySource) => {
      console.log(readySource);
    });

    this.menuCtrl.open();

    this.userdetails = '';

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);
    this.local.set('deviceinfo', JSON.stringify(Device.device));

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        console.log(this.userdetails);
      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
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

  menutog(){
    this.menuCtrl.open();
  }



}


