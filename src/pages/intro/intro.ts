import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";



export interface Slide {
  title: string;
  description: string;
  image: string;
}
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  slides: Slide[];
  showSkip = false;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.slides = [];
  }

  startApp() {
    this.storage.set('introShown', true);
    this.navCtrl.setRoot(HomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
}
