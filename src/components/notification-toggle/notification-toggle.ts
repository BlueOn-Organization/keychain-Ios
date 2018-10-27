import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';

@Component({
  selector: 'notification-toggle',
  templateUrl: 'notification-toggle.html'
})
export class NotificationToggleComponent {
  enabled: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private storage: Storage,
    private stalker: BeaconStalkerProvider
  ) {
    this.storage.get('beacon-watching').then(enabled => enabled && this.on());
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
