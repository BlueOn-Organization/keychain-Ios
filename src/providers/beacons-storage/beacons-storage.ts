import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Beacon } from '../../app/beacon.model';

@Injectable()
export class BeaconsStorage {
  private beacons: Beacon[];
  private loaded: boolean;

  constructor(public storage: Storage) {
    this.beacons = [];
    this.loaded = false;
  }

  load(): Promise<any> {
    return this.storage.get('beacons').then(beacons => {
      console.info('The storage has been loaded');
      this.loaded = true;
      this.beacons = beacons ? beacons : [];

      return this.beacons;
    }).catch(console.log);
  }

  get list(): Beacon[] {
    this.loaded || console.warn('The storage has not been loaded');
    console.info(`Returned the beacons list of lenth ${this.beacons.length}`);
    return this.beacons;
  }

  save(b: Beacon) {
    const index = this.findIndex(b.cid);
    if (index != -1) {
      this.beacons[index] = b;
    } else {
      this.beacons.push(b);
    }
    this.overrieStorage();
  }

  delete(b: Beacon) {
    const index = this.findIndex(b.cid);
    if (index != -1) {
      this.beacons.splice(index, 1);
      this.overrieStorage();
    } else {
      console.error("The device is not stored");
    }
  }

  findIndex(cid: string) {
    return this.beacons.findIndex(beacon => beacon.cid === cid);
  }

  private overrieStorage() {
    this.storage.set('beacons', this.beacons);
  }

}
