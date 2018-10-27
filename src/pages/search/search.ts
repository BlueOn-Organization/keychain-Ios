import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeaconMonitorProvider } from '../../providers/beacon-monitor/beacon-monitor';
import { Beacon } from '../../app/beacon.model';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = -1;
  beacon_name: string;
  gif: string = '';
  label: string = 'Buscando...';
  label2: string = '';
  fuera: boolean;
  negativecontroller: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public monitor: BeaconMonitorProvider,
    private ngzone: NgZone
  ) {
    this.gif = 'assets/imgs/gifb.gif';
  }

  ionViewDidLoad() {
    const beacon = <Beacon>this.navParams.get('beacon');
    this.beacon_name = beacon.nombre;
    this.find(beacon);
  }

  find(beacon: Beacon) {
    this.monitor.trace(beacon).subscribe(distance => {
      console.log(distance);

      this.ngzone.run(() => {
        if (distance < 0) {
          if (this.negativecontroller < -10) {
            this.gif = 'assets/imgs/giff.gif';
            this.label = 'Fuera de rango';
            this.label2 = '';
            this.fuera = true;
          }
          this.negativecontroller--;
        } else {
          if (this.fuera) {
            // this.dialogs.beep(1);
            this.fuera = false;
          }
          this.negativecontroller = 0;

          if (this.distance < 1) {
            this.gif = 'assets/imgs/gif1.gif';
            this.label = 'Muy cerca';
            this.label2 = `Estas a menos de 1 mt`;
          }else if (this.distance < 2) {
            this.gif = 'assets/imgs/gif1.gif';
            this.label = 'Muy cerca';
            this.label2 = `Estas a menos de 2 mts`;
          }
          else if (this.distance <= 4) {
            this.gif = 'assets/imgs/gif2.gif';
            this.label = 'Cerca';
            this.label2 = `Estas a menos de ${Math.round(distance) + 1} mts`;
          }
          else {
            this.gif = 'assets/imgs/gif3.gif';
            this.label = 'Lejos';
            this.label2 = `Estas a mas de ${Math.round(distance) + 1} mts`;
          }
          this.distance = distance;
        }
      });
    });
  }

  ionViewWillLeave() {
    this.monitor.stop();
  }

}
