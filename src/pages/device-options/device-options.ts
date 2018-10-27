import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Beacon } from '../../app/beacon.model';
import { BeaconsStorage } from '../../providers/beacons-storage/beacons-storage';

/**
 * Generated class for the DeviceOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-options',
  templateUrl: 'device-options.html',
})
export class DeviceOptionsPage {
  beacon: Beacon;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: BeaconsStorage
  ) {
    this.beacon = <Beacon>this.navParams.get('beacon');
  }

  ionViewDidLoad() {    
  }

  guardar() {
    this.storage.save(this.beacon);
    this.navCtrl.pop();
  }

  eliminar() {
    this.alertCtrl.create({
      subTitle: 'Estas seguro de eliminar el dispositivo?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: data => {
            this.storage.delete(this.beacon);
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

}
