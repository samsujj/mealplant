import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage,AlertController,LoadingController} from 'ionic-angular';
import {SignUp2Page} from '../signup2/signup2';
import {SignUpPage} from '../signup/signup';
import {DashboardPage} from '../dashboard/dashboard';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {NutritionPage} from '../nutrition/nutrition';

@Component({
  templateUrl: 'build/pages/nutritionedit/nutritionedit.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class NutritionEditPage {

  private local:LocalStorage;
  private unittype;

  private target:string = 'range';

  private isShow:number = 0;
  private issodiumshow:boolean = false;
  private ischolesterolshow:boolean = false;

  private nutriForm:FormGroup;

  public userdetails;


  private userid;

  constructor(fb: FormBuilder, public navCtrl: NavController, private _http: Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

    this.nutriForm = fb.group({
      nutrititle: ["My Nutrition Targets"],
      nutricalories: [1036],
      carbsmin: [6],
      carbsmax: [130],
      carbspercententage: [40],
      fatmin: [17],
      fatmax: [58],
      fatpercententage: [30],
      proteinmin: [15],
      proteinmax: [130],
      proteinpercententage: [30],
      sodium: [2400],
      cholestrol: [300],
      fiber: [25],
    });

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.userid = this.userdetails._id;

        this.nutriForm = fb.group({
          nutrititle: [this.userdetails.nutrititle],
          nutricalories: [this.userdetails.nutricalories],
          carbsmin: [this.userdetails.carbsmin],
          carbsmax: [this.userdetails.carbsmax],
          carbspercententage: [this.userdetails.carbspercententage],
          fatmin: [this.userdetails.fatmin],
          fatmax: [this.userdetails.fatmax],
          fatpercententage: [this.userdetails.fatpercententage],
          proteinmin: [this.userdetails.proteinmin],
          proteinmax: [this.userdetails.proteinmax],
          proteinpercententage: [this.userdetails.proteinpercententage],
          sodium: [this.userdetails.sodium],
          cholestrol: [this.userdetails.cholestrol],
          fiber: [this.userdetails.fiber],
        });

        console.log(this.userdetails);

      }
      else{
        this.navCtrl.setRoot(HelloIonicPage);
      }
    }).catch(function(){
      this.navCtrl.setRoot(HelloIonicPage);
    });


  }

  selsegment(val){
    this.target = val;
  }

  changesodiumtoggle(ev){
    this.issodiumshow = ev.checked;
  }
  changecholesteroltoggle(ev){
    this.ischolesterolshow = ev.checked;
  }

  adasda(ev){
    console.log(ev);
  }


  showdivdrgdf(){
    this.isShow = 1;
  }

  updatenutrival(formval){
    //this.navCtrl.push(SignUp3Page);

   var link = 'http://184.168.146.185:1001/signup8';
    var data = {userid: this.userid,nutrititle:formval.nutrititle,nutricalories:formval.nutricalories,carbsmin:formval.carbsmin,carbsmax:formval.carbsmax,carbspercententage:formval.carbspercententage,fatmin:formval.fatmin,fatmax:formval.fatmax,fatpercententage:formval.fatpercententage,proteinmin:formval.proteinmin,proteinmax:formval.proteinmax,proteinpercententage:formval.proteinpercententage,sodium:formval.sodium,cholestrol:formval.cholestrol,fiber:formval.fiber};

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this._http.post(link, data)
        .subscribe(data => {

          loading.dismiss();

          var link2 = 'http://184.168.146.185:1001/getuserdetails';
          var data2 = {_id: this.userid};

          this._http.post(link2, data2)
              .subscribe(data => {
                var data1 = data.json();

                if(data1.status == 'success'){
                  var data2 = data1.item;

                  this.local.set('userdetails', JSON.stringify(data2));

                  this.navCtrl.push(NutritionPage);

                }else{
                  alert('Error occured! try again.')
                }
              }, error => {
                alert('Error occured! try again.')
                console.log("Oooops!");
              });




        }, error => {
          console.log("Oooops!");
        });



  }



}