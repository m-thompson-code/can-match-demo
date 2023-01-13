import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateComponent } from './can-activate.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CanActivateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CanActivateComponent }]),
  ]
})
export class CanActivateModule { }
