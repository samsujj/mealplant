import {Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Page, Platform} from 'ionic-angular';
import {Facebook} from 'ionic-native'
import {isArray} from "rxjs/util/isArray";
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';
import {SignUp2Page} from '../signup2/signup2';
import {DashboardPage} from '../dashboard/dashboard';


@Component({
  templateUrl: 'build/pages/fat-calculate/fat-calculate.html',
    directives:[BaseChartComponent],
    styles: [`
    .chart {
      display: block;
    }
  `],
})
export class FatCalculatePage {
  private  platform;
  private local:LocalStorage;
    public fatpercentage;
    private fatmass;
    private leanmass;
    private excessfat;
    private chart;

    public items;

    public pieChartType:string = 'pie';



    constructor(platform:Platform,private _http: Http,public navCtrl: NavController,private navParams: NavParams) {
    this.platform = platform;

        this.leanmass = this.navParams.get('leanmass');
        this.fatpercentage = this.navParams.get('fatpercentage');
        this.excessfat = this.navParams.get('excessfat');
        this.fatmass = this.navParams.get('fatmass');

        console.log(this.leanmass);
        console.log(this.fatpercentage);
        console.log(this.excessfat);
        console.log(this.fatmass);



  }

    getpieChartLabels(){
        var arr1 = ['Lean Mass', 'Optimal Fat', 'Excess Fat'];
        return arr1;
    }

    getpieChartData(){
        var arr1 = [this.leanmass, this.fatmass, this.excessfat];
        return arr1;
    }


    gotoback(){
        this.navCtrl.push(SignUp2Page);
    }

    gotodashboard(){
        this.local = new Storage(LocalStorage);
        this.local.get('insertid').then((value) => {


            var link2 = 'http://184.168.146.185:1001/getuserdetails';
            var data2 = {_id: value};

            this._http.post(link2, data2)
                .subscribe(data => {
                    var data1 = data.json();
                    if(data1.status == 'success'){
                        var data2 = data1.item;

                        this.local.set('userdetails', data2);

                        this.navCtrl.push(DashboardPage);

                    }else{
                        alert('Error occured! try again.')
                    }
                }, error => {
                    alert('Error occured! try again.')
                    console.log("Oooops!");
                });


        })
    }



}


