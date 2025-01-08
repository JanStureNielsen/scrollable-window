import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WindowComponent} from './window/window.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'scrollable-window';
}
