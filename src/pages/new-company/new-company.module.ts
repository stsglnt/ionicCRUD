import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCompany } from './new-company';

@NgModule({
  declarations: [
    NewCompany,
  ],
  imports: [
    IonicPageModule.forChild(NewCompany),
  ],
  exports: [
    NewCompany
  ]
})
export class NewCompanyModule {}
