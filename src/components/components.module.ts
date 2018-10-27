import { NgModule } from '@angular/core';
import { BeaconComponent } from './beacon/beacon';
import { IonicModule } from 'ionic-angular';
import { NotificationToggleComponent } from './notification-toggle/notification-toggle';


@NgModule({
	declarations: [BeaconComponent,
    NotificationToggleComponent],
	imports: [IonicModule],
	exports: [BeaconComponent,
    NotificationToggleComponent]
})
export class ComponentsModule {}
