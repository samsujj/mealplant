import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ModalController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {NutritionEditPage} from '../nutritionedit/nutritionedit';
import {AddFoodRecipePage} from '../addfoodrecipe/addfoodrecipe';
import '../../../node_modules/chart.js/src/chart.js';
import { BaseChartComponent } from 'ng2-charts/ng2-charts';

@Component({
  templateUrl: 'build/pages/nutrition/nutrition.html',
  //providers:[FbProvider],
  directives:[BaseChartComponent],
  styles: [`
    .chart {
      display: block;
    }
  `],
})
export class NutritionPage {

  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;

  public cursegment;
  public noofmeal;
  public noofmealtxt;
  public nutrititle;
  public nutricalories;
  public carbsrange;
  public proteinrange;
  public fatrange;
  public carbsgm;
  public proteingm;
  public fatgm;
  public isprofileshow;
  public isdietstat;
  public dietlist;
  public meallist;
  public foodlist;
  public foodidlist;
  public recipelist;
  public recipeidlist;


  public chartload;

  public pieChartType:string = 'pie';
  public pieChartOption:any = {
    animation: false,
    responsive: true,

    title: {
      display: false,
      text: '% calories from each macro',
      fontFamily : '"robotobold"',
      fontSize : 18,
      fontColor : '#FFFFFF'
    },
    legend : {
      display:false,
      position : 'bottom',
      labels : {
        fontFamily : '"robotobold"',
        fontColor : '#FFFFFF',
        boxWidth : 40
      }
    }
  };

  public pieChartData:any = [40,30,30];
  public pieChartLabels:any = ['Carbs','Protein','Fat'];

  private addedfood;
  private addedfoodtype;
  private addedfoodname;

  public filesrc;

  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public modalCtrl: ModalController) {

    this.userdetails = '';

    this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

    this.foodlist = [];
    this.foodidlist = [];
    this.recipelist = [];
    this.recipeidlist = [];

    this.addedfood = '';
    this.addedfoodtype = '';
    this.addedfoodname = '';

    this.isprofileshow = false;
    this.isdietstat = false;

    this.cursegment = 'planner';
    //this.noofmeal = 3;


    var link1 = 'http://184.168.146.185:1001/food-list';

    this._http.post(link1, {})
        .subscribe(data1 => {

          this.foodlist = data1.json().res;
          var n;

          for(n in this.foodlist){
            var rrr = this.foodlist[n];
            this.foodidlist.push(rrr._id);
          }


        }, error => {
          console.log("Oooops!");
        });

    var link2 = 'http://184.168.146.185:1001/recipe-list';

    this._http.post(link2, {})
        .subscribe(data1 => {

          this.recipelist = data1.json().res;
          var n;

          for(n in this.recipelist){
            var rrr = this.recipelist[n];
            this.recipeidlist.push(rrr._id);
          }

        }, error => {
          console.log("Oooops!");
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
        this.nutrititle = this.userdetails.nutrititle;
        this.nutricalories = this.userdetails.nutricalories;
        this.carbsrange = this.userdetails.carbsmin+'g - '+this.userdetails.carbsmax+'g';
        this.proteinrange = this.userdetails.fatmin+'g - '+this.userdetails.fatmax+'g';
        this.fatrange = this.userdetails.proteinmin+'g - '+this.userdetails.proteinmax+'g';

        this.carbsgm = ((this.userdetails.nutricalories*this.userdetails.carbspercententage)/100);
        this.carbsgm = this.carbsgm/4;
        this.carbsgm = this.carbsgm.toFixed(1);

        this.proteingm = ((this.userdetails.nutricalories*this.userdetails.proteinpercententage)/100);
        this.proteingm = this.proteingm/4;
        this.proteingm = this.proteingm.toFixed(1);

        this.fatgm = ((this.userdetails.nutricalories*this.userdetails.fatpercententage)/100);
        this.fatgm = this.fatgm/9;
        this.fatgm = this.fatgm.toFixed(1);

        this.pieChartData = [this.userdetails.carbspercententage,this.userdetails.proteinpercententage,this.userdetails.fatpercententage];

        this.chartload = 1;

        this.getuserdiet();


      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });



  }

  getuserdiet(){
    var link = 'http://184.168.146.185:1001/updateusermeal';
    var data = {userid: this.userid};

    this._http.post(link, data)
        .subscribe(data1 => {

          var data2 = data1.json();
          this.noofmeal = data2.meal;
          this.noofmealtxt = this.noofmeal + ' Meals';
          if (this.noofmeal == 1){
            this.noofmealtxt = this.noofmeal + ' Meal';
          }

          this.meallist = data2.meallist;

          this.getDietList();

        }, error => {
          console.log("Oooops!");
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

  changemeal(val){
    this.noofmeal = val;

    var link = 'http://184.168.146.185:1001/updateusermeal2';
    var data = {userid: this.userid,noofmeal:this.noofmeal};

    this._http.post(link, data)
        .subscribe(data1 => {

          var data2 = data1.json();
          this.noofmeal = data2.meal;
          this.noofmealtxt = this.noofmeal + ' Meals';
          if (this.noofmeal == 1){
            this.noofmealtxt = this.noofmeal + ' Meal';
          }

          this.meallist = data2.meallist;

          this.getDietList();


        }, error => {
          console.log("Oooops!");
        });

  }

  toggleprofile(){
    this.isprofileshow = !this.isprofileshow;

  }

  togglediet(){
    this.isdietstat = !this.isdietstat;

  }

  goeditpage(){
    this.navCtrl.push(NutritionEditPage);
  }


  cbcvbcvdgddf(){
    let modal = this.modalCtrl.create(AddFoodRecipePage, {  });
    modal.onDidDismiss(data => {
      this.addedfood = data.id;
      this.addedfoodtype = data.type;
      this.addedfoodname = data.name;
    });
    modal.present();
  }

  cancelFood(){
    this.addedfood = '';
    this.addedfoodtype = '';
    this.addedfoodname = '';
  }

  addfoodtomeal(id){

    if(this.addedfood){
      var link = 'http://184.168.146.185:1001/addfoodtomeal';
      var data = {mealid: id,foodid:this.addedfood,type:this.addedfoodtype};

      this._http.post(link, data)
          .subscribe(data1 => {

            this.cancelFood();
            var data2 = data1.json();

            if(data2.error == 0){
              this.getDietList();
            }


          }, error => {
            console.log("Oooops!");
          });

    }

  }

  getDietList(){
    var link22 = 'http://184.168.146.185:1001/getmeallist';
    var data22 = {meallist: this.meallist};

    this._http.post(link22, data22)
        .subscribe(data12 => {
          var dietlist = data12.json();
          var n;

          var newdietList = [];

          for(n in dietlist){
            var diet = dietlist[n];
            var foodsdet = [];
            var recipedet = [];
            var calories = 0

            if(diet.recipes.length){
              var m;
              for(m in diet.recipes){
                var recp = diet.recipes[m];
                var recpIndex = this.recipeidlist.indexOf(recp);

                if(recpIndex > -1){
                  recipedet.push(this.recipelist[recpIndex]);
                  calories += parseFloat(this.recipelist[recpIndex].calories);
                }

              }
            }

            if(diet.foods.length){
              var m;
              for(m in diet.foods){
                var recp = diet.foods[m];
                var recpIndex = this.foodidlist.indexOf(recp);

                if(recpIndex > -1){
                  foodsdet.push(this.foodlist[recpIndex]);
                  calories += parseFloat(this.foodlist[recpIndex].calories);
                }

              }
            }

            newdietList.push({
              _id:diet._id,
              name:diet.name,
              foods:diet.foods,
              calories:calories,
              recipes:diet.recipes,
              recipelist:recipedet,
              foodlist:foodsdet,
            });

          }

          this.dietlist = newdietList;

        }, error => {
          console.log("Oooops!");
        });
  }



}


