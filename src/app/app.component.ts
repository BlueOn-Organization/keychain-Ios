import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage,
  ) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#990066');

      splashScreen.hide();

      /*platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        let activeView: any = nav.getActive();

        if (activeView != null) {
          if (nav.canGoBack()) {
            nav.pop();
          } else if (backgroundMode.isEnabled()) {
            backgroundMode.moveToBackground();
          }
        }
      });*/
    });

    storage.get('introShown').then(result => {
      console.log('introShown' + result);
      if (result) {
        this.rootPage = HomePage;
      } else {
        //this.rootPage = LoginPage;
       this.rootPage = 'LoginPage';
      }
    });
  }
}
