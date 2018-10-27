import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceListPage } from './device-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DeviceListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DeviceListPage),
  ],
})
export class DeviceListPageModule {}
