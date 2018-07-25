import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTrechosPage } from './lista-trechos';

@NgModule({
  declarations: [
    ListaTrechosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTrechosPage),
  ],
})
export class ListaTrechosModule {}
