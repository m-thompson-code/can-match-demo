import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpComponent } from './http.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HttpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HttpComponent }]),
  ]
})
export class HttpModule { }
