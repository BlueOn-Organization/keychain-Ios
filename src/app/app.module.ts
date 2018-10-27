import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { IBeacon } from '@ionic-native/ibeacon';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { BLE } from '@ionic-native/ble'
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BeaconsStorage } from '../providers/beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../providers/beacon-monitor/beacon-monitor';
import { BeaconStalkerProvider } from '../providers/beacon-stalker/beacon-stalker';
import { ComponentsModule } from '../components/components.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

const firebaseConfig = {
  apiKey: "AIzaSyAq6P4eZJLp6cj1_zseF4N8Ouxj5kFZSWQ",
  authDomain: "blueon-dbf11.firebaseapp.com",
  databaseURL: "https://blueon-dbf11.firebaseio.com",
  projectId: "blueon-dbf11",
  storageBucket: "blueon-dbf11.appspot.com",
  messagingSenderId: "271111022906"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    BeaconsStorage,
    IBeacon,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    InAppBrowser,
    //BLE,
    BackgroundMode,
    BeaconMonitorProvider,
    BeaconStalkerProvider,
  ]
})
export class AppModule {}