import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeaconMonitorProvider } from '../../providers/beacon-monitor/beacon-monitor';
import { Beacon } from '../../app/beacon.model';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  distance: number = -1;
  beacon_name: string;
  gif: string = '';
  label: string = this.translate.instant('search.searching');
  label2: string = '';
  fuera: boolean;
  negativecontroller: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public monitor: BeaconMonitorProvider,
    private ngzone: NgZone,
    private translate:TranslateService
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
            this.label = this.translate.instant('search.out');
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
            this.label = this.translate.instant('search.verynear');
            this.label2 = `${this.translate.instant('search.less')} 1 mt`;
          }else if (this.distance < 2) {
            this.gif = 'assets/imgs/gif1.gif';
            this.label = this.translate.instant('search.verynear');
            this.label2 = `${this.translate.instant('search.less')} ${Math.round(distance)} mts`;
          }
          else if (this.distance <= 4) {
            this.gif = 'assets/imgs/gif2.gif';
            this.label = this.translate.instant('search.near');
            this.label2 = `${this.translate.instant('search.less')} ${Math.round(distance)} mts`;
          }
          else {
            this.gif = 'assets/imgs/gif3.gif';
            this.label = this.translate.instant('search.far');
            this.label2 = `${this.translate.instant('search.more')} ${Math.round(distance)} mts`;
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
