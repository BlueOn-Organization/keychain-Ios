import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';
import {Platform} from "ionic-angular";

@Component({
  selector: 'notification-toggle',
  templateUrl: 'notification-toggle.html'
})
export class NotificationToggleComponent {
  enabled: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private storage: Storage,
    private stalker: BeaconStalkerProvider,
    platform: Platform,
  ) {
    this.storage.get('beacon-watching').then(enabled => enabled && this.on());

    if(platform.is("android")){
      backgroundMode.setDefaults({
          title: 'Monitor de dispositivos activo',
          text: 'Se te notificara cuando alguno de tus dispositivos este fuera de rango.'
      });
    }

  }
  on() {
    this.storage.set('beacon-watching', true).then(()=>{
      this.enabled = true;
      this.backgroundMode.enable();
      this.stalker.watch();
    });
  }

  off() {
    this.storage.set('beacon-watching', false).then(()=>{
      this.enabled = false;
      this.backgroundMode.disable();
      this.stalker.unWatch();
    });
  }

}
