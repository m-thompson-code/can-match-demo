import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanMatchComponent } from './can-match.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CanMatchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CanMatchComponent }]),
  ]
})
export class CanMatchModule { }
