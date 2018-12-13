import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminosPage } from './terminos';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TerminosPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminosPage),
      TranslateModule
  ],
})
export class TerminosPageModule {}
