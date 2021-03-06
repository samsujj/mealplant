import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {DashboardPage} from './pages/dashboard/dashboard';
import {LogoutPage} from './pages/logout/logout';
import {BodyCompositionPage} from './pages/bodycomposition/bodycomposition';
import {GoalExperiencePage} from './pages/goalexperience/goalexperience';
import {ProgressTrackerPage} from './pages/progresstracker/progresstracker';
import {NutritionPage} from './pages/nutrition/nutrition';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Body Composition', component: BodyCompositionPage },
      { title: 'Progress Tracker', component: ProgressTrackerPage },
      { title: 'Experience & Goals', component: GoalExperiencePage },
      { title: 'Nutrition', component: NutritionPage },
      { title: 'Logout', component: LogoutPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
