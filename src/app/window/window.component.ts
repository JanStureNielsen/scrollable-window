import {afterRenderEffect, Component, computed, effect, ElementRef, input, viewChild} from '@angular/core';

@Component({
  selector: 'my-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  #contentSize = 40;
  #contentGap = 6;

  myCenter = input.required<boolean>();
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
    const onCenter = this.myCenter();

    return this.onCenter();
  });

  onCenter() {
    const nativeElement = this.myWindow().nativeElement;
    const scrollHeight: number = nativeElement.scrollHeight;
    const offsetHeight: number = nativeElement.offsetHeight;

    const scrollTo = 4 + (scrollHeight - offsetHeight) / 2;

    console.log('jsn: on-center:', scrollTo, '(', scrollHeight, ', ', offsetHeight, ')', nativeElement);

    this.myWindow().nativeElement.scrollTo(0, scrollTo);

    return scrollTo;
  }

  constructor() {
    //effect(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()));
    //effect(() => setTimeout(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()), 100));
    //afterRenderEffect(() => this.myWindow().nativeElement.scrollTo(0, this.#scrollTo()));
    afterRenderEffect(() => setTimeout(() => this.onCenter(), 100));

    effect(() => {
      console.log("jsn: on-center effect:", this.#scrollTo());
      this.onCenter();//this.myWindow().nativeElement.scrollTo(0, this.#scrollTo());
    });
  }

}
