import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ViewController,ModalController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {AddFoodForRecipePage} from '../addfoodforrecipe/addfoodforrecipe';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormArray} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';

@Component({
  templateUrl: 'build/pages/addcustomrecipe/addcustomrecipe.html',
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
    }
  `],
})
export class AddCustomRecipePage {

  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;
  public recipecat;
  public dishtype;

  private nutriForm:FormGroup;


  public chartload;

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

  public totalcalories;
  public totalcarbs;
  public totalfat;
  public totalprotein;

  public foodlist;
  public foodidlist;

  public filesrc;

  private formb;

  constructor(fb: FormBuilder,platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public viewCtrl: ViewController,public modalCtrl: ModalController) {

    this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

    this.userdetails = '';
    this.dishtype = '0';
    this.foodlist = [];
    this.foodidlist = [];

    this.totalcalories = 0;
    this.totalcarbs = 0;
    this.totalfat = 0;
    this.totalprotein = 0;

    this.formb = fb;

    this.piechartdata = [this.totalcarbs,this.totalfat,this.totalprotein];

    this.nutriForm = this.formb.group({
      receipename: ["", Validators.required],
      descripttion: [""],
      preptime: ["", Validators.required],
      cooktime: ["", Validators.required],
      yields: ["", Validators.required],
      servingsize: ["1", Validators.required],
      servingtype: ["serving", Validators.required],
      category: ["", Validators.required],
      isbreakfast: [0],
      isoneserving: [0],
      leftovers: [0]
    });

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;
      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });

    this.getFoodcatdetails();


  }

  initDirection() {
    return this.formb.group({
      dir: ['']
    });
  }

  addDirection() {
    // add address to the list
    const control = <FormArray>this.nutriForm.controls['direction'];
    control.push(this.initDirection());
  }

  getFoodcatdetails(){
    var link = 'http://184.168.146.185:1001/foodcat-list';
    var data = {};


    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          this.recipecat = result.res;
        }, error => {
          console.log("Oooops!");
        });
  }

  cngdishtype(val1){
    this.dishtype = val1;
  }

    adddir(){
        console.log(1);
    }

  cngtxarea(ev){
    console.log(ev);
  }



  dosubmit111(formval){

    let isbreakfast = 0;
    let isoneserving = 0;
    let leftovers = 0;

     if(formval.isbreakfast){
     isbreakfast = 1;
     }
     if(formval.isoneserving){
     isoneserving = 1;
     }
     if(formval.leftovers){
     leftovers = 1;
     }

    if(this.nutriForm.valid){
      var link = 'http://184.168.146.185:1001/add-recipe';
      var data = {receipename: formval.receipename,descripttion: formval.descripttion,preptime: formval.preptime,cooktime: formval.cooktime,yields: formval.yields,servingsize: formval.servingsize,servingtype: formval.servingtype,category:formval.category,dishtype: this.dishtype,isbreakfast: isbreakfast,isoneserving:isoneserving,leftovers: leftovers,ingrediens: this.foodidlist,direction:[],userid:this.userid,is_custom:1,calories:this.totalcalories,image:''};


      this._http.post(link, data)
          .subscribe(data => {
            let data22 = { 'type': 'recipe' };
            this.viewCtrl.dismiss(data22);
          }, error => {
            console.log("Oooops!");
          });
    }
  }

  addingr(){
    let modal = this.modalCtrl.create(AddFoodForRecipePage);

    modal.onDidDismiss(data => {
      var itemdet = data.item;

      this.totalcalories = parseFloat(this.totalcalories) + itemdet.calories;
      this.totalcarbs = parseFloat(this.totalcarbs) + itemdet.carbs;
      this.totalfat = parseFloat(this.totalfat) + itemdet.fat;
      this.totalprotein = parseFloat(this.totalprotein) + itemdet.protein;

      this.piechartdata = [this.totalcarbs,this.totalfat,this.totalprotein];

      this.foodlist.push(itemdet);
      this.foodidlist.push(itemdet._id);
    });

    modal.present();
  }

  delfood(item){
    var idx1 = this.foodlist.indexOf(item);
    var itemdet = this.foodlist[idx1];

    this.totalcalories = parseFloat(this.totalcalories) - itemdet.calories;
    this.totalcarbs = parseFloat(this.totalcarbs) - itemdet.carbs;
    this.totalfat = parseFloat(this.totalfat) - itemdet.fat;
    this.totalprotein = parseFloat(this.totalprotein) - itemdet.protein;

    this.piechartdata = [this.totalcarbs,this.totalfat,this.totalprotein];

    this.foodlist.splice(idx1,1);
    this.foodidlist.splice(idx1,1);
  }



}


