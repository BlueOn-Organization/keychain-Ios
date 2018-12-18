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
import { Globalization } from '@ionic-native/globalization';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BeaconsStorage } from '../providers/beacons-storage/beacons-storage';
import { BeaconMonitorProvider } from '../providers/beacon-monitor/beacon-monitor';
import { BeaconStalkerProvider } from '../providers/beacon-stalker/beacon-stalker';
import { ComponentsModule } from '../components/components.module';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { Push } from '@ionic-native/push';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClient,HttpClientModule} from "@angular/common/http";
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    IonicStorageModule.forRoot({
      name: '__blocalizador'
    }),
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
    BackgroundMode,
    OpenNativeSettings,
    BeaconMonitorProvider,
    BeaconStalkerProvider,
    Push,
    Globalization,
    Geolocation,
    HttpClientModule,
    NativeGeocoder
  ]
})
export class AppModule {}