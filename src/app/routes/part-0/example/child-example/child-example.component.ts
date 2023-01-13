import { Component } from '@angular/core';

@Component({
  selector: 'app-child-example',
  templateUrl: './child-example.component.html',
  styleUrls: ['./child-example.component.scss']
})
export class ChildExampleComponent {
  constructor() {
    console.log('Child Component');
  }
}
