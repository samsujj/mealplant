import {Component} from '@angular/core';
import {Platform,NavController,MenuController,ActionSheetController} from 'ionic-angular';
import { Device } from 'ionic-native';
import {Http, Headers} from "@angular/http";
import { Storage, LocalStorage } from 'ionic-angular';
import {FatCalculatePage} from '../fat-calculate/fat-calculate';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

@Component({
  templateUrl: 'build/pages/goalexperience/goalexperience.html',
  //providers:[FbProvider],
})
export class GoalExperiencePage {
  private  platform;
  private userdetails;
  private username;
  private local:LocalStorage;
  private isLoad;
  private userid;

  public resistant_training;
  public cardio_training;

  public priority1;
  public priority2;
  public priority3;


  constructor(platform:Platform,public navCtrl: NavController,public menuCtrl: MenuController,private _http: Http,public actionSheetCtrl: ActionSheetController) {

    this.userdetails = '';

    this.priority1 = 'None';
    this.priority2 = 'None';
    this.priority3 = 'None';

    this.resistant_training = 'No Experience';
    this.cardio_training = 'No Experience';

    this.isLoad = 0;
    this.platform = platform;
    this.local = new Storage(LocalStorage);

    this.local = new Storage(LocalStorage);
    this.local.get('userdetails').then((value) => {
      if(value!=null) {
        this.userdetails=JSON.parse(value);
        this.username = this.userdetails.username;
        this.userid = this.userdetails._id;

        this.getgoal();
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

  getgoal(){
    var link = 'http://184.168.146.185:1001/getgoal';
    var data = {userid:this.userid};

    this._http.post(link, data)
        .subscribe(data2 => {

          var data3 = data2.json();

          if(data3.length > 0){
            var data4 = data3[0];

            if(data4.resistant_training != '')
              this.resistant_training = data4.resistant_training;

            if(data4.cardio_training != '')
              this.cardio_training = data4.cardio_training;

            if(data4.priority1 != '')
              this.priority1 = data4.priority1;

            if(data4.priority2 != '')
              this.priority2 = data4.priority2;

            if(data4.priority3 != '')
              this.priority3 = data4.priority3;

          }

        }, error => {
          console.log("Oooops!");
        });
  }

  addrestraining(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Resistant Training',
      buttons: [
        {
          text: 'No Experience',
          handler: () => {
            this.addGoals('resistant_training','No Experience');
          }
        },{
          text: 'Beginner',
          handler: () => {
            this.addGoals('resistant_training','Beginner');
          }
        },{
          text: 'Intermediate',
          handler: () => {
            this.addGoals('resistant_training','Intermediate');
          }
        },{
          text: 'Advanced',
          handler: () => {
            this.addGoals('resistant_training','Advanced');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addcardtraining(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cardio Training',
      buttons: [
        {
          text: 'No Experience',
          handler: () => {
            this.addGoals('cardio_training','No Experience');
          }
        },{
          text: 'Beginner',
          handler: () => {
            this.addGoals('cardio_training','Beginner');
          }
        },{
          text: 'Intermediate',
          handler: () => {
            this.addGoals('cardio_training','Intermediate');
          }
        },{
          text: 'Advanced',
          handler: () => {
            this.addGoals('cardio_training','Advanced');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addpriority1(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cardio Training',
      buttons: [
        {
          text: 'Fat Loss',
          handler: () => {
            this.addGoals('priority1','Fat Loss');
          }
        },{
          text: 'Flexibility',
          handler: () => {
            this.addGoals('priority1','Flexibility');
          }
        },{
          text: 'Overall Wellness',
          handler: () => {
            this.addGoals('priority1','Overall Wellness');
          }
        },{
          text: 'Cardiovascular Improvement',
          handler: () => {
            this.addGoals('priority1','Cardiovascular Improvement');
          }
        },{
          text: 'Increased Energy Level',
          handler: () => {
            this.addGoals('priority1','Increased Energy Level');
          }
        },{
          text: 'Metabolism Increase',
          handler: () => {
            this.addGoals('priority1','Metabolism Increase');
          }
        },{
          text: 'Muscle Definition / Tone',
          handler: () => {
            this.addGoals('priority1','Muscle Definition / Tone');
          }
        },{
          text: 'Mascular Strength',
          handler: () => {
            this.addGoals('priority1','Mascular Strength');
          }
        },{
          text: 'Agility',
          handler: () => {
            this.addGoals('priority1','Agility');
          }
        },{
          text: 'Baseball Specific',
          handler: () => {
            this.addGoals('priority1','Baseball Specific');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addpriority2(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cardio Training',
      buttons: [
        {
          text: 'Fat Loss',
          handler: () => {
            this.addGoals('priority2','Fat Loss');
          }
        },{
          text: 'Flexibility',
          handler: () => {
            this.addGoals('priority2','Flexibility');
          }
        },{
          text: 'Overall Wellness',
          handler: () => {
            this.addGoals('priority2','Overall Wellness');
          }
        },{
          text: 'Cardiovascular Improvement',
          handler: () => {
            this.addGoals('priority2','Cardiovascular Improvement');
          }
        },{
          text: 'Increased Energy Level',
          handler: () => {
            this.addGoals('priority2','Increased Energy Level');
          }
        },{
          text: 'Metabolism Increase',
          handler: () => {
            this.addGoals('priority2','Metabolism Increase');
          }
        },{
          text: 'Muscle Definition / Tone',
          handler: () => {
            this.addGoals('priority2','Muscle Definition / Tone');
          }
        },{
          text: 'Mascular Strength',
          handler: () => {
            this.addGoals('priority2','Mascular Strength');
          }
        },{
          text: 'Agility',
          handler: () => {
            this.addGoals('priority2','Agility');
          }
        },{
          text: 'Baseball Specific',
          handler: () => {
            this.addGoals('priority2','Baseball Specific');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addpriority3(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Cardio Training',
      buttons: [
        {
          text: 'Fat Loss',
          handler: () => {
            this.addGoals('priority3','Fat Loss');
          }
        },{
          text: 'Flexibility',
          handler: () => {
            this.addGoals('priority3','Flexibility');
          }
        },{
          text: 'Overall Wellness',
          handler: () => {
            this.addGoals('priority3','Overall Wellness');
          }
        },{
          text: 'Cardiovascular Improvement',
          handler: () => {
            this.addGoals('priority3','Cardiovascular Improvement');
          }
        },{
          text: 'Increased Energy Level',
          handler: () => {
            this.addGoals('priority3','Increased Energy Level');
          }
        },{
          text: 'Metabolism Increase',
          handler: () => {
            this.addGoals('priority3','Metabolism Increase');
          }
        },{
          text: 'Muscle Definition / Tone',
          handler: () => {
            this.addGoals('priority3','Muscle Definition / Tone');
          }
        },{
          text: 'Mascular Strength',
          handler: () => {
            this.addGoals('priority3','Mascular Strength');
          }
        },{
          text: 'Agility',
          handler: () => {
            this.addGoals('priority3','Agility');
          }
        },{
          text: 'Baseball Specific',
          handler: () => {
            this.addGoals('priority3','Baseball Specific');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addGoals(type,valu){
    var link = 'http://184.168.146.185:1001/addgoal';
    var data = {userid:this.userid,type:type,valu:valu};

    this._http.post(link, data)
        .subscribe(data2 => {

          if(type == 'resistant_training')
            this.resistant_training = valu;

          if(type == 'cardio_training')
            this.cardio_training = valu;

          if(type == 'priority1')
            this.priority1 = valu;

          if(type == 'priority2')
            this.priority2 = valu;

          if(type == 'priority3')
            this.priority3 = valu;

        }, error => {
          console.log("Oooops!");
        });
  }




}


