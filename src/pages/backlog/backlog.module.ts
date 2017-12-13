import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BacklogPage } from './backlog';

@NgModule({
  declarations: [
    BacklogPage,
  ],
  imports: [
    IonicPageModule.forChild(BacklogPage),
  ],
})
export class BacklogPageModule {}
