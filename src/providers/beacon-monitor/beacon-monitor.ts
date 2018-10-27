import { Injectable } from '@angular/core';
import { BeaconRegion, IBeacon, IBeaconPluginResult } from '@ionic-native/ibeacon';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Beacon } from '../../app/beacon.model';
import { BeaconStalkerProvider } from '../beacon-stalker/beacon-stalker';
import {uuid} from "../../app/uuid.config";

@Injectable()
export class BeaconMonitorProvider {
  private beaconRegion: BeaconRegion;

  constructor(
    private ibeacon: IBeacon,
    private stalker: BeaconStalkerProvider
  ) {
  }

  public trace(beacon: Beacon): Observable<number> {
    let distance = new Subject<number>();

    this.start().subscribe(
      data => {
        const found = data.beacons.find(b => b.major == beacon.major && b.minor == beacon.minor)
        distance.next(found ? found.accuracy : -1)
      },
      error => console.error()
    );

    return distance.asObservable();
  }

  public search(): Observable<Beacon[]> {
    let beacons = new Subject<Beacon[]>();

    this.start().subscribe(
      data => beacons.next(data.beacons.map(b => <Beacon>{
        uuid: b.uuid,
        major: b.major,
        minor: b.minor,
        cid: `${b.major}${b.minor}`
      })),
      error => console.error(error)
    );

    return beacons.asObservable();
  }

  private start(): Observable<IBeaconPluginResult> {
    this.beaconRegion = this.ibeacon.BeaconRegion('blue-on', uuid);

    if (this.stalker.isWatching) this.stalker.unWatch();

    this.ibeacon.requestAlwaysAuthorization();

    const delegate = this.ibeacon.Delegate();

    this.ibeacon.startMonitoringForRegion(this.beaconRegion);

    this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
      .then(() => console.log('startRangingBeaconsInRegion: ' + this.beaconRegion.identifier))
      .catch(console.error);

    return delegate.didRangeBeaconsInRegion();
  }

  public stop() {
    this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    this.ibeacon.stopMonitoringForRegion(this.beaconRegion);
    this.stalker.watch();
  }

}
