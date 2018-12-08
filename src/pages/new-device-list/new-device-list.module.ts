import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDeviceListPage } from './new-device-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewDeviceListPage,
  ],
  imports: [
      IonicPageModule.forChild(NewDeviceListPage),
      TranslateModule
  ],
})
export class NewDeviceListPageModule {}
