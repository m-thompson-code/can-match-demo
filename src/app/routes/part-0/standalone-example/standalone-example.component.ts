import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-standalone-example',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './standalone-example.component.html',
  styleUrls: ['./standalone-example.component.scss']
})
export class StandaloneExampleComponent {
  constructor() {
    console.log('Component (Standalone)');
  }
}
