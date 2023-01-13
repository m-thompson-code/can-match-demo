import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ExampleComponent,
      canMatch: [() => {console.log('\tChild CanMatchGuard'); return true }],
      canActivate: [() => {console.log('\tChild CanActivateGuard'); return true }],
      canLoad: [() => {console.log('\tChild CanLoadGuard'); return true }],
      resolve: [() => {console.log('\tChild Resolver'); return true }],
    }]),
  ]
})
export class ExampleModule {
  constructor() {
    console.log('ExampleModule');
  }
}
