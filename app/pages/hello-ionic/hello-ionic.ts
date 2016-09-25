import {Component} from '@angular/core';
import {Page, Platform} from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  //providers:[FbProvider],
})
export class HelloIonicPage {
  signupPage=SignUpPage;
  private  platform;
  private local:LocalStorage;

  constructor(platform:Platform) {
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

        Facebook.api('/' + result.authResponse.userID + '?fields=id,name,gender,email,first_name,last_name',[]).then((result1) => {
          console.log(result1);
          alert(result1);
          var x;
          for (x in result1){
            alert(x+'---'+result1[x]);
            if(isArray(result1[x])){
              let y;
              for(y in result1[x]){
                alert(y+''+result1[x][y]);
              }
            }
          }


        });



      });





    });
  }



}


