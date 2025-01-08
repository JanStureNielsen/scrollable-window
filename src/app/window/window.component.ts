import {afterRenderEffect, Component, computed, effect, ElementRef, viewChild} from '@angular/core';

@Component({
  selector: 'my-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  #contentSize = 100;
  #contentGap = 6;

  myWindow = viewChild.required<ElementRef>('myWindow');
  redContent = computed(() => {
    const myContent = [];
    for (let i = this.#contentSize; i >= this.#contentSize/2 + this.#contentGap/2; i--) {
      myContent.push({id: i});
    }
    //console.log('jsn: red: ', myContent);
    return myContent;
  });

  // assumes content is ordered...
  gapContent = computed(() => {
    const reds = this.redContent();
    const blues = this.blueContent();
    const gap = reds[reds.length-1].id - blues[0].id;
    //console.log('jsn: gap: ', gap);
    return gap;
  });

  blueContent = computed(() => {
    const myContent = [];
    for (let i = this.#contentSize/2 - this.#contentGap/2; i >= 0; i--) {
      myContent.push({id: i});
    }
    //console.log('jsn: blue: ', myContent);
    return myContent;
  });

  #scrollTo = computed(() => {
    const nativeElement = this.myWindow().nativeElement;
    const scrollHeight: number = nativeElement.scrollHeight;
    const offsetHeight: number = nativeElement.offsetHeight;

    const scrollTo = 4 + (scrollHeight - offsetHeight) / 2;

    console.log('jsn: scroll-to:', scrollTo, '(', scrollHeight, ', ', offsetHeight, ')', nativeElement);

    return scrollTo;
  });

  constructor() {
    //effect(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()));
    //effect(() => setTimeout(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()), 100));
    //afterRenderEffect(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()));
    afterRenderEffect(() => setTimeout(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()), 100));
  }

}
