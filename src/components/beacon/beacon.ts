import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Beacon } from '../../app/beacon.model';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';

@Component({
  selector: 'beacon',
  templateUrl: 'beacon.html'
})
export class BeaconComponent {

  @Input() device: Beacon;

  constructor(
    public navCtrl: NavController,
    public stalker: BeaconStalkerProvider
  ) {}

  buscar() {
    this.navCtrl.push('SearchPage', {beacon: this.device});
  }

  editar() {
    this.navCtrl.push('DeviceOptionsPage', {beacon: this.device});
  }

}
