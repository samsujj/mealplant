import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ViewController,ModalController,ActionSheetController} from 'ionic-angular';
import { Device } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';
import {Http, Headers} from "@angular/http";
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {AddCustomFoodPage} from '../addcustomfood/addcustomfood';
import {AddCustomRecipePage} from '../addcustomrecipe/addcustomrecipe';

@Component({
  templateUrl: 'build/pages/addfoodforrecipe/addfoodforrecipe.html',
})
export class AddFoodForRecipePage {

  private  platform;
  private userdetails;
  private username;
  private userid;
  private local:LocalStorage;
  private isLoad;

  private cursegment;



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
    this.cursegment = 'genfoods';
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

  addfood(item){
    let data = { 'item': item };
    this.viewCtrl.dismiss(data);
  }









}


