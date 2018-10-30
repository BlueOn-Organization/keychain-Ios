import { Component } from '@angular/core';
import {NavController, AlertController, Platform} from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { PopoverController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Storage} from "@ionic/storage";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {url} from "../../app/uuid.config";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';
import {OpenNativeSettings} from "@ionic-native/open-native-settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    public navCtrl: NavController,
    private ibeacon: IBeacon,
    public storage: Storage,
    private alert: AlertController,
    public popoverCtrl: PopoverController,
    private afAuth: AngularFireAuth,
    private iab: InAppBrowser,
    private backgroundMode: BackgroundMode,
    private stalker: BeaconStalkerProvider,
    public platform: Platform,
    private openNativeSettings: OpenNativeSettings,
  ) {}

  ionViewWillLoad() {
      this.checkBluetoothEnabled();
  }

    checkBluetoothEnabled() {
        this.ibeacon.isBluetoothEnabled().then(enabled => {
            if (!enabled) {
                if(this.platform.is('android')){
                    this.alertAndroid();
                }else{
                    this.alertIos();
                }
            }
        });
    }
    alertAndroid(){
        this.alert.create({
            enableBackdropDismiss: false,
            subTitle: 'El Bluetooth está desactivado, debes activarlo para poder continuar.',
            buttons: [{
                text: 'Activar',
                role: 'cancel',
                handler: () => this.openSettings()
            }]
        }).present();
    }

    alertIos(){
        this.alert.create({
            enableBackdropDismiss: false,
            subTitle: 'El Bluetooth está desactivado, debes activarlo para poder continuar.',
            buttons: [{
                text: 'Validar',
                role: 'cancel',
                handler: () => this.checkBluetoothEnabled()
            }]
        }).present();
    }

    openSettings(){
        this.openNativeSettings.open("bluetooth");
    }



  search() {
    this.navCtrl.push('NewDeviceListPage');
  }

  device(){
    this.navCtrl.push('DeviceListPage');
  }

  tutorial(){
    this.navCtrl.setRoot('IntroPage');
  }

  logout(){
    this.storage.set('beacon-watching', false).then(()=>{
        this.backgroundMode.disable();
        this.stalker.unWatch();
    });
    this.afAuth.auth.signOut().then(x=>{
      this.storage.set('introShown', false);
      this.navCtrl.setRoot('LoginPage');
    });
  }

  link(){
    const browser = this.iab.create(url);
    browser.show();
  }
}