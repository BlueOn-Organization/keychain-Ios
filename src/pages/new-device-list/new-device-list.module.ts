import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDeviceListPage } from './new-device-list';

@NgModule({
  declarations: [
    NewDeviceListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDeviceListPage),
  ],
})
export class NewDeviceListPageModule {}
