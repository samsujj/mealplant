import {Component} from '@angular/core';
import {Platform,NavController,MenuController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {BodyCompositionFormPage} from '../bodycompositionform/bodycompositionform';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';

@Component({
  templateUrl: 'build/pages/bodycomposition/bodycomposition.html',
  //providers:[FbProvider],
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
    }
  `],
})
export class BodyCompositionPage {
  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;

  public compositionlist;
  public compositionlength;

  public curcomposition;

  public gender;
  public weigth;
  public compositiondetails;

  public leanmass;
  public bodyfat;
  public leanmasspercentage;
  public optimalfatpercdentage;
  public excessfatpercdentage;
  public bodyfatpercentage;

  public chartload;

  public pieChartType:string = 'pie';
  public pieChartOption:any = {
    animation: false,
    responsive: true,

    title: {
      display: true,
      text: 'Body Fat Calculation',
      fontFamily : '"robotobold"',
      fontSize : 18,
      fontColor : '#FFFFFF'
    },
    legend : {
      position : 'bottom',
      labels : {
        fontFamily : '"robotobold"',
        fontColor : '#FFFFFF',
        boxWidth : 40
      }
    }
  };



  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http) {

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
        this.weigth = this.userdetails.weigth;
        this.gender = this.userdetails.gender;

        this.getBodyComposition();

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

  menutog(){
    this.menuCtrl.open();
  }

  addbcomposition(){
    this.navCtrl.push(BodyCompositionFormPage);
  }

  editbcomposition(){
    this.navCtrl.push(BodyCompositionFormPage,{composition:this.compositionlist[this.curcomposition]});
  }

  delbcomposition(){

    var link = 'http://184.168.146.185:1001/delbodycomposition';
    var data = {id: this.compositionlist[this.curcomposition]._id};

    this._http.post(link, data)
        .subscribe(data => {

          this.getBodyComposition();


        }, error => {
          console.log("Oooops!");
        });
  }

  getBodyComposition(){
    var link = 'http://184.168.146.185:1001/getbodycomposition';
    var data = {userid:this.userid};

    this._http.post(link, data)
        .subscribe(data => {

          this.compositionlist = data.json();
          this.compositionlength = this.compositionlist.length;

          if(this.compositionlist.length){
            this.curcomposition = 0;


            this.chartload = 0;
            this.mapCalculate();
          }


        }, error => {
          console.log("Oooops!");
        });
  }

  changesel(ev){
    console.log(ev.target.value);
    this.curcomposition = ev.target.value;
    this.chartload = 0;
    this.mapCalculate();
  }

  getDateStr(item){
    var d = new Date(item.added_time);

    var datestr = d.toDateString()+'  '+d.toLocaleTimeString();

    return datestr;
  }

  /*mapCalculate(){
   this.compositiondetails = this.compositionlist[this.curcomposition];
   console.log(this.compositiondetails);

   // let result1 = ((this.compositiondetails.weigth * 1.082) + 94.42);
   let result1 = ((this.compositiondetails.weight * 1.082) + 94.42);
   let leanbodyweight = (result1 - (this.compositiondetails.waist * 4.15));
   let bodyfat = (this.compositiondetails.weight - leanbodyweight);
   let fatpercentage = ((bodyfat * 100)/this.compositiondetails.weight);

   this.leanmasspercentage = 83;
   this.optimalfatpercdentage = 17;
   this.excessfatpercdentage = 0;
   this.bodyfatpercentage = fatpercentage.toFixed(2);

   if(fatpercentage > 17){
   var leanpercentage = ((leanbodyweight*100)/this.compositiondetails.weight);
   this.leanmasspercentage = leanpercentage;
   this.excessfatpercdentage = fatpercentage-17;
   }

   this.leanmass = leanbodyweight;
   this.bodyfat = bodyfat;

   if(bodyfat < 0){
   this.bodyfat = 0;
   this.bodyfatpercentage = 0;
   }

   this.chartload = 1;
   }*/

  mapCalculate(){
    this.compositiondetails = this.compositionlist[this.curcomposition];
    console.log(this.compositiondetails);


    if(this.gender == 'female'){
      let result1 = (this.compositiondetails.weight *  0.732);
      let result2 = (result1 + 8.987);
      let result3 = (this.compositiondetails.wrist  / 3.14);
      let result4 = (this.compositiondetails.waist  * 0.157);
      let result5 = (this.compositiondetails.hips  * 0.249);
      let result6 = (this.compositiondetails.forearmsl  *  0.434);
      let result7 = (result2 + result3);
      let result8 = (result7 - result4);
      let result9 = (result8 - result5);

      let leanbodyweight = (result6 + result9);

      let bodyfat = (this.compositiondetails.weight - leanbodyweight);
      let fatpercentage = ((bodyfat * 100)/this.compositiondetails.weight);

      this.leanmasspercentage = 83;
      this.optimalfatpercdentage = 17;
      this.excessfatpercdentage = 0;
      this.bodyfatpercentage = fatpercentage.toFixed(2);

      if(fatpercentage > 17){
        var leanpercentage = ((leanbodyweight*100)/this.compositiondetails.weight);
        this.leanmasspercentage = leanpercentage;
        this.excessfatpercdentage = fatpercentage-17;
      }

      this.leanmass = leanbodyweight;
      this.bodyfat = bodyfat;

      if(bodyfat < 0){
        this.bodyfat = 0;
        this.bodyfatpercentage = 0;
      }

    }else{
      let result1 = ((this.compositiondetails.weight * 1.082) + 94.42);
      let leanbodyweight = (result1 - (this.compositiondetails.waist * 4.15));

      let bodyfat = (this.compositiondetails.weight - leanbodyweight);
      let fatpercentage = ((bodyfat * 100)/this.compositiondetails.weight);

      this.leanmasspercentage = 83;
      this.optimalfatpercdentage = 17;
      this.excessfatpercdentage = 0;
      this.bodyfatpercentage = fatpercentage.toFixed(2);

      if(fatpercentage > 17){
        var leanpercentage = ((leanbodyweight*100)/this.compositiondetails.weight);
        this.leanmasspercentage = leanpercentage;
        this.excessfatpercdentage = fatpercentage-17;
      }

      this.leanmass = leanbodyweight;
      this.bodyfat = bodyfat;

      if(bodyfat < 0){
        this.bodyfat = 0;
        this.bodyfatpercentage = 0;
      }
    }



    this.chartload = 1;
  }

  getpieChartLabels(){
    var arr1 = ['Lean Mass ('+this.leanmasspercentage+'%)', 'Optimal Fat ('+this.optimalfatpercdentage+'%)', 'Excess Fat ('+this.excessfatpercdentage+'%)'];
    return arr1;
  }

  getpieChartData(){
    var arr1 = [this.leanmasspercentage, this.optimalfatpercdentage, this.excessfatpercdentage];
    return arr1;
  }


}


