import {Component, computed, effect, ElementRef, viewChild} from '@angular/core';

@Component({
  selector: 'my-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  myWindow = viewChild.required<ElementRef>('myWindow');

  #scrollTo = computed(() => {
    const nativeElement = this.myWindow().nativeElement;
    const scrollHeight: number = nativeElement.scrollHeight;
    const offsetHeight: number = nativeElement.offsetHeight;

    const scrollTo = 4 + (scrollHeight - offsetHeight) / 2;

    console.log('jsn: scroll-to:', scrollTo, '(', scrollHeight, ', ', offsetHeight, ')', nativeElement);

    return scrollTo;
  });

  constructor() {
    effect(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()));
  }

}
