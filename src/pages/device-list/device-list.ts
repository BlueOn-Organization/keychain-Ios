import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {BeaconsStorage} from "../../providers/beacons-storage/beacons-storage";
import {Beacon} from "../../app/beacon.model";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {url} from "../../app/uuid.config";

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage {
  saved_devices: Beacon[] = [<Beacon>{
    nombre: 'asd'
  }];

  constructor(
    public navCtrl: NavController,
    private beaconsStorage: BeaconsStorage,
    private iab: InAppBrowser
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceListPage');
    this.saved_devices = this.beaconsStorage.list
  }

  link(){
    const browser = this.iab.create(url);
    browser.show();
  }
}