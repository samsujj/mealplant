import {Component} from '@angular/core';
import {Platform,NavController,MenuController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {Http, Headers} from "@angular/http";
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';

@Component({
  templateUrl: 'build/pages/progresstracker/progresstracker.html',
  //providers:[FbProvider],
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
    }
  `],
})
export class ProgressTrackerPage {
  private  platform;
  private userdetails;
  private username;
  private local:LocalStorage;
  private isLoad;

  public userid;
  public cursegment;

  public compositionlist;
  public compositionlength;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55], label: 'Series A'},
  ];

  public barChartColors:Array<any> = [
    { // grey
      backgroundColor: ['#13C20D','#13C20D','#13C20D','#13C20D','#13C20D','#13C20D']
    }
  ];

  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http) {

    this.userdetails = '';

    this.cursegment = 'graph';

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;
        this.getBodyComposition();
        this.getbodycomposition2();

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

  segmentChange(ev){
    this.cursegment = ev.value;
  }

  getBodyComposition(){
    var link = 'http://184.168.146.185:1001/getbodycomposition';
    var data = {userid:this.userid};

    this._http.post(link, data)
        .subscribe(data => {



          this.compositionlist = data.json();
          this.compositionlength = this.compositionlist.length;


        }, error => {
          console.log("Oooops!");
        });
  }

  getbodycomposition2(){
    var link = 'http://184.168.146.185:1001/getbodycomposition2';
    var data = {userid:this.userid};

    this._http.post(link, data)
        .subscribe(data2 => {

          var data1 = data2.json();

          this.isLoad = 1;

          this.barChartLabels = data1.label;
          this.barChartData =  [{data: data1.data, label: 'Weight'}];

        }, error => {
          console.log("Oooops!");
        });
  }

  getDateStr(item){
    var d = new Date(item.added_time);

    var datestr = d.toDateString();

    return datestr;
  }

  getbarChartLabels(){
    var arr1 = [];

    /*for(let n in this.compositionlist){
      var compo = this.compositionlist[n];

/*
      var d = new Date(compo.added_time);

      var datestr1 = d.getMonth();
      datestr1 = datestr1+1;
      var datestr2 = d.getDate();


      var datestr:string = datestr1+'/'+datestr2;
*//*
      arr1.push(compo.added_time);

      if(n == '5')
        break;

    }*/

    arr1 = ['12','22','43','22','54','32'];

    return arr1;
  }

  getpieChartData(){
    var arr1 = [100, 79, 87,88,25];
    return arr1;
  }

}


