import {afterRenderEffect, Component, computed, effect, ElementRef, input, viewChild} from '@angular/core';

@Component({
  selector: 'my-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  myWindow = viewChild.required<ElementRef>('myWindow');
  content = this.#buildContent(100);

  constructor() {
    //effect(() => this.onCenter());
    //effect(() => setTimeout(() => this.onCenter(), 100));
    //afterRenderEffect(() => this.onCenter());
    afterRenderEffect(() => setTimeout(() => this.onCenter(), 100));
  }

  onCenter() {
    const nativeElement = this.myWindow().nativeElement;
    const scrollHeight: number = nativeElement.scrollHeight;
    const offsetHeight: number = nativeElement.offsetHeight;

    const scrollTo = 4 + (scrollHeight - offsetHeight) / 2;

    //console.log('jsn: scroll-to:', scrollTo, '(', scrollHeight, ', ', offsetHeight, ')', nativeElement);

    this.myWindow().nativeElement.scrollTo(0, scrollTo);
  }

  #buildContent(size: number) {
    const contentArray = [];
    for (let i = 0; i < size; i++) {
      contentArray.push({id: i});
    }
    return contentArray;
  }

}
