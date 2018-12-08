import { Component } from '@angular/core';
import {NavController, AlertController, Platform} from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import {AngularFireAuth} from "angularfire2/auth";
import {Storage} from "@ionic/storage";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {url} from "../../app/uuid.config";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {BeaconsStorage} from "../../providers/beacons-storage/beacons-storage";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Globalization } from '@ionic-native/globalization';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    private beaconCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    public navCtrl: NavController,
    private ibeacon: IBeacon,
    public storage: Storage,
    private alert: AlertController,
    private afAuth: AngularFireAuth,
    private iab: InAppBrowser,
    private backgroundMode: BackgroundMode,
    private stalker: BeaconStalkerProvider,
    public platform: Platform,
    private openNativeSettings: OpenNativeSettings,
    private beaconsStorage: BeaconsStorage,
    private push: Push,
    private globalization: Globalization,
  ) {
      this.beaconCollection = this.afs.collection('Beacons');
  }


  ionViewWillLoad() {
    this.checkBluetoothEnabled();
    this.beaconsStorage.load();

  }

  ionViewDidLoad(){
    this.pushSetup();
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

  pushSetup(){
    // to check if we have permissio
    const options: PushOptions = {
      android: {
        senderID:'271111022906'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
   };

   const pushObject: PushObject = this.push.init(options);
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => {
     console.log('Device registered', registration);
     pushObject.subscribe('blueon-localizador').then(()=>console.log('topic: blueon-localizador'))
    });
    
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

}