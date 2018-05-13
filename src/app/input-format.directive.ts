import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor(private el:ElementRef) { }

  //@Input('format') format;
  @Input('appInputFormat') format;
  @HostListener('blur') onBlur(){
    let value : string = this.el.nativeElement.value;
    if(this.format == "upperCase")
      this.el.nativeElement.value = value.toUpperCase();
    else
      this.el.nativeElement.value = value.toLowerCase();
  }

  // @HostListener('focus') onFocus(){
  //   console.log('on Focus');
  // }
}
