import {afterRenderEffect, Component, computed, effect, ElementRef, input, viewChild} from '@angular/core';

@Component({
  selector: 'my-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  myWindow = viewChild.required<ElementRef>('myWindow');
  doCenter = input.required<boolean>();

  content = this.#buildContent(100);

  constructor() {
    //effect(() => this.onCenter());
    //effect(() => setTimeout(() => this.onCenter(), 100));
    afterRenderEffect(() => this.onCenter());
    //afterRenderEffect(() => setTimeout(() => this.onCenter(), 100));
  }

  onCenter() {
    return this.#doScrollTo(this.#scrollTo());
  }

  #doOnCenter(onCenter: boolean) {
    console.log('jsn: do-on-center', onCenter);
    //ignore argument
    this.onCenter();
  }

  #scrollTo() {
    const nativeElement = this.myWindow().nativeElement;
    const scrollHeight: number = nativeElement.scrollHeight;
    const offsetHeight: number = nativeElement.offsetHeight;

    const scrollTo = 4 + (scrollHeight - offsetHeight) / 2;

    console.log('jsn: scroll-to:', scrollTo, '(', scrollHeight, ', ', offsetHeight, ')', nativeElement);

    return scrollTo;
  }

  #doScrollTo(scrollTo: number) {
    this.myWindow().nativeElement.scrollTo(0, scrollTo);

    return scrollTo;
  }

  #buildContent(size: number) {
    const contentArray = [];
    for (let i = 0; i < size; i++) {
      contentArray.push({id: i});
    }
    return contentArray;
  }

}
