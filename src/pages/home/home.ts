import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {IBeacon} from "@ionic-native/ibeacon";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private ibeacon: IBeacon,
    private alert: AlertController,
    ) {

  }
  ionViewDidLoad() {
    //this.checkBluetoothEnabled();
  }


  signOut() {
    this.afAuth.auth.signOut().then(result =>{
      this.storage.set('introShown', false);
      this.navCtrl.setRoot(LoginPage);
    });
  }

  checkBluetoothEnabled() {
    this.ibeacon.isBluetoothEnabled().then(enabled => {
      if (!enabled) {
        this.alert.create({
          enableBackdropDismiss: false,
          subTitle: 'El Bluetooth está desactivado, debes activarlo para poder continuar.',
          buttons: [{
            text: 'Verificar',
            role: 'cancel',
            handler: () => this.checkBluetoothEnabled()
          }]
        }).present();

      }
    });
  }


  devicelist(){
    //this.navCtrl.push('DeviceListPage');
  }

}
