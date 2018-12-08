import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceOptionsPage } from './device-options';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    DeviceOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceOptionsPage),
    TranslateModule
  ],
})
export class DeviceOptionsPageModule {}
