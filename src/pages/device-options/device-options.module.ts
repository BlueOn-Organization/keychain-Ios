import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceOptionsPage } from './device-options';

@NgModule({
  declarations: [
    DeviceOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceOptionsPage),
  ],
})
export class DeviceOptionsPageModule {}
