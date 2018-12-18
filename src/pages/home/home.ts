import { User } from './../../utils/user.model';
import { Component } from '@angular/core';
import { NavController, AlertController, Platform} from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { AngularFireAuth } from "angularfire2/auth";
import { Storage} from "@ionic/storage";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { url } from "../../app/uuid.config";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { BeaconsStorage } from "../../providers/beacons-storage/beacons-storage";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { TranslateService } from "@ngx-translate/core";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private usersCollection: AngularFirestoreCollection<any>;
  private user = {} as User;

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
    private translate:TranslateService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
  ) {
    this.usersCollection = this.afs.collection('Users');
  }


  ionViewWillLoad() {
    this.checkBluetoothEnabled();
    this.beaconsStorage.load();
  }

  ionViewDidLoad(){
    this.pushSetup();
    this.getPosition();
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
  //this.translate.instant('login.error')
  private alertAndroid(){
    this.alert.create({
      enableBackdropDismiss: false,
      subTitle: this.translate.instant('home.alert'),
      buttons: [{
          text: this.translate.instant('home.activate'),
          role: 'cancel',
          handler: () => this.openSettings()
      }]
    }).present();
  }

  private alertIos(){
    this.alert.create({
      enableBackdropDismiss: false,
      subTitle: this.translate.instant('home.alert'),
      buttons: [{
          text: this.translate.instant('home.validate'),
          role: 'cancel',
          handler: () => this.checkBluetoothEnabled()
      }]
    }).present();
  }

  private openSettings(){
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
      try{
        this.backgroundMode.disable();
        this.stalker.unWatch();
      }catch(err){
        console.log(err)
      }
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

  private pushSetup(){
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
     this.user.tokenId = registration.registrationId;
     this.saveUserBD();
     pushObject.subscribe('blueon-localizador').then(()=>console.log('topic: blueon-localizador'))
    });
    
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  private saveUserBD() {
    this.storage.get("emailUser").then(email=>{
      if(email != null) {
        this.usersCollection.doc(email).update(this.user);
      }
    });
  }

  private getPosition(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.getGeocode(resp);
     })
     .catch((error) => {
       console.log('Error getting location', error);
     });
  }

  private getGeocode(resp){
    this.user.lat=resp.coords.latitude;
    this.user.lng=resp.coords.longitude;
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
    .then((result: NativeGeocoderReverseResult[]) => {
      console.log(result[0])
      this.user.country = result[0].countryName;
      this.user.countryCode = result[0].countryCode;
      this.saveUserBD();
    })
    .catch((error: any) => console.log(error));
  }

  openPageNot(){
    this.navCtrl.push('NotificationPage');
  }

}