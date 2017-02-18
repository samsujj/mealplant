import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ViewController,ModalController,ActionSheetController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {AddCustomFoodPage} from '../addcustomfood/addcustomfood';
import {AddCustomRecipePage} from '../addcustomrecipe/addcustomrecipe';
import {CustomFoodDetPage} from '../customfooddet/customfooddet';
import {CustomRecipeDetPage} from '../customrecipedet/customrecipedet';

@Component({
  templateUrl: 'build/pages/addfoodrecipe/addfoodrecipe.html',
})
export class AddFoodRecipePage {

  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;

  private cursegment;



  private recipelist;
  private recipeno;
  private customrecipelist;
  private customrecipeno;
  private customfoodlist;
  private customfoodno;
  private genericfoodlist;
  private genericfoodno;
    private restaurantfoodlist;
    private restaurantfoodno;
  private brandedfoodlist;
  private brandedfoodno;

  public filesrc;


  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public viewCtrl: ViewController,public modalCtrl:ModalController,public actionSheetCtrl: ActionSheetController) {

    this.filesrc = "http://184.168.146.185/~mealplant/node_server/uploads/";

    this.userdetails = '';
    this.cursegment = 'recipes';

    this.recipelist = [];
    this.recipeno = 0;
    this.customrecipelist = [];
    this.customrecipeno = 0;
    this.customfoodlist = [];
    this.customfoodno = 0;
    this.genericfoodlist=[];
    this.genericfoodno = 0;
    this.restaurantfoodlist=[];
    this.restaurantfoodno = 0;
    this.brandedfoodlist=[];
    this.brandedfoodno = 0;


    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;

        this.getrecipelist();
        this.getfoodlist();
      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });




  }

  segmentChange(ev){
    this.cursegment = ev.value;
  }

  getrecipelist(){
    var link = 'http://184.168.146.185:1001/get-recipe';
    var data = {};

    this._http.post(link, data)
        .subscribe(data1 => {

          var data2 = data1.json();
          var n;

          for(n in data2){
            var data3 = data2[n];

            if(data3.is_custom == 0){
              this.recipelist.push(data3);
            }
            if(data3.is_custom == 1){
              this.customrecipelist.push(data3);
            }

          }

          this.recipeno = this.recipelist.length;
          this.customrecipeno = this.customrecipelist.length;

        }, error => {
          console.log("Oooops!");
        });
  }

  getfoodlist(){
    var link = 'http://184.168.146.185:1001/get-food';
    var data = {};

    this._http.post(link, data)
        .subscribe(data1 => {

          var data2 = data1.json();
          var n;

          for(n in data2){
            var data3 = data2[n];

            if(data3.is_custom == 0 && data3.type == "1"){
              this.genericfoodlist.push(data3);
            }
            if(data3.is_custom == 0 && data3.type == "2"){
              this.restaurantfoodlist.push(data3);
            }
            if(data3.is_custom == 0 && data3.type == "3"){
              this.brandedfoodlist.push(data3);
            }
            if(data3.is_custom == 1){
              this.customfoodlist.push(data3);
            }

          }

          this.genericfoodno = this.genericfoodlist.length;
          this.restaurantfoodno = this.restaurantfoodlist.length;
          this.brandedfoodno = this.brandedfoodlist.length;
          this.customfoodno = this.customfoodlist.length;

        }, error => {
          console.log("Oooops!");
        });
  }

  addrecipe(item){
    var id = item._id;
    let data = { 'id': id,'name':item.receipename, 'type': 'recipe' };
    this.viewCtrl.dismiss(data);
  }

  addfood(item){
    var id = item._id;
    let data = { 'id': id,'name':item.foodname, 'type': 'food' };
    this.viewCtrl.dismiss(data);
  }

  addnew1(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What kind of food do you want to create?',
      buttons: [
        {
          text: 'Coustom Food',
          handler: () => {
            this.addnewfood();
          }
        },{
          text: 'Coustom Recipe',
          handler: () => {
            this.addnewrecipe();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  addnewfood(){
    let modal = this.modalCtrl.create(AddCustomFoodPage);
    modal.onDidDismiss(data => {
      if(data.type == 'food'){
        this.getfoodlist();
      }
    });
    modal.present();
  }

  addnewrecipe(){
    let modal = this.modalCtrl.create(AddCustomRecipePage);
    modal.onDidDismiss(data => {
      if(data.type == 'recipe'){
        this.getrecipelist();
      }
    });
    modal.present();
  }

  showrecipe(item){
    this.navCtrl.push(CustomRecipeDetPage,{itemid:item._id});
  }

  showfood(item){
    this.navCtrl.push(CustomFoodDetPage,{itemid:item._id});
  }


}


