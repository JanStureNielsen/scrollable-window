import {Component, signal} from '@angular/core';
import {WindowComponent} from './window/window.component';

@Component({
  selector: 'app-root',
  imports: [WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
