import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanLoadComponent } from './can-load.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CanLoadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CanLoadComponent }]),
  ]
})
export class CanLoadModule { }
