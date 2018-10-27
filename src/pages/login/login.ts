import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import {HomePage} from "../home/home";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {url} from "../../app/uuid.config";

export interface User {
  email: string;
  password: string;
}
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl : AlertController,
    private fb: Facebook,
    private platform: Platform,
    private gplus: GooglePlus,
    private iab: InAppBrowser
    ) {

  }

  ionViewDidLoad() {

  }
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        //this.navCtrl.setRoot('IntroPage');
        this.navCtrl.setRoot('IntroPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    } catch (err) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }

  facebook(){
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential)
          .then(result =>{
            this.storage.set('introShown', true);
            this.navCtrl.setRoot(HomePage, {}, {
              animate: true,
              direction: 'forward'
            });
           })
          .catch(result=>{
            console.log('Google Error' + result);
            this.showAlert();
          })
      });
    }else{
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider).then(x=>{
          if (x){
            this.storage.set('introShown', true);
            this.navCtrl.setRoot('IntroPage', {}, {
              animate: true,
              direction: 'forward'
            });
          }
        }
      );
    }
  }


  async twiter() {

    if (this.platform.is('cordova')) {
      try {
        console.log("1");
        const gplusUser = await this.gplus.login({
          'webClientId': '271111022906-samhssoaovo3bdukkv5b47p7j1mhrb37.apps.googleusercontent.com',
          'offline': false,
          'scopes': 'profile email'
        });
        return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
          .then(result =>{
            this.storage.set('introShown', true);
            this.navCtrl.setRoot(HomePage, {}, {
              animate: true,
              direction: 'forward'
            });
          })
          .catch(result =>{
            console.log('Google Error' + result);
            this.showAlert();
          });

      } catch (err) {
        console.log(err);
        this.showAlert();
      }
    } 
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Intentelo nuevamente',
      buttons: ['OK']
    });
    alert.present();
  }

  link(){
    const browser = this.iab.create(url);
    browser.show();
  }

}
