import {Component} from '@angular/core';
import {Page, Platform} from 'ionic-angular';
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";


@Component({
  templateUrl: 'build/pages/fat-calculate/fat-calculate.html',
  //providers:[FbProvider],
})
export class FatCalculatePage {
  private  platform;
  private local:LocalStorage;
    public fatpercentage;

  constructor(platform:Platform,private _http: Http) {
    this.platform = platform;


    this.local = new Storage(LocalStorage);
    this.local.get('insertid').then((value) => {
      var insertid = value;

      var headers = new Headers();
//      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

      var link = 'http://184.168.146.185:1001/getuserdetails';
      var data = {_id: insertid};

      this._http.post(link, data)
          .subscribe(data => {
              alert(data);
              var data1 = data.json();
              if(data1.status == 'success'){
                  var data2 = data1.item;

                  /*******************fat calculation*************************/
                  var weight = parseInt(data2.weight);
                  var waist = parseInt(data2.waist);
                  var leanwight = ((weight*1.082) + 94.42)-(waist*4.15);
                  var fatpercentage1 = ((weight-leanwight)*100)/weight;
                  this.fatpercentage = fatpercentage1.toFixed(2);

              }else{
                  alert('Error occured! try again.')
              }
          }, error => {
            console.log("Oooops!");
          });
    });


  }



}


