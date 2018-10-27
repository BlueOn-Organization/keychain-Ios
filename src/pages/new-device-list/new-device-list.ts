import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BeaconMonitorProvider } from '../../providers/beacon-monitor/beacon-monitor';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';
import { Beacon } from '../../app/beacon.model';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {url} from "../../app/uuid.config";

@IonicPage()
@Component({
  selector: 'page-new-device-list',
  templateUrl: 'new-device-list.html',
})
export class NewDeviceListPage {
  new_beacons: Beacon[] = [];

  constructor(
    private monitor: BeaconMonitorProvider,
    private storage: BeaconsStorage,
    private ngzone: NgZone,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) { }

  ionViewDidLoad() {
    let cont = 0;
    this.monitor.search().subscribe(nearby_beacons => {
      this.ngzone.run(() => {
        cont++;
        if (cont == 15) {
          this.new_beacons = [];
          cont = 0;
        }

        nearby_beacons.forEach(beacon => {
          if (this.storage.findIndex(beacon.cid) == -1 && this.new_beacons.findIndex(b => b.cid === beacon.cid) == -1) {
            this.new_beacons.push(beacon);
          }
        })
      });
    });
  }

  ionViewWillLeave() {
    this.monitor.stop();
  }

  private saveDevice(beacon: Beacon) {
    let prompt = this.alertCtrl.create({
      title: 'Agregar',
      subTitle: 'dispositivo detectado:',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            this.alertCtrl.create({ title: 'Dispositivo descartado' }).present();
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if (data.name == '') {
              return false;
            } else {
              beacon.nombre = data.name;
              beacon.cid = `${beacon.major}${beacon.minor}`;
              beacon.tick = -1;
              this.storage.save(beacon);
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  link(){
    const browser = this.iab.create(url);
    browser.show();
  }

}
