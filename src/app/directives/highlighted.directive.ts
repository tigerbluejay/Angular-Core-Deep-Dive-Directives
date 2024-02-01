import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: false
})
export class HighlightedDirective {

  // this input is for the example where we define an input
  // in the course-card element for the directive. The input
  // belongs to the directive so it is defined here.
  // here default value false is being overriden by the the
  // true boolean in the directive at the host element
  @Input('highlighted')
  isHighlighted = false;

  constructor() { 
    console.log("Directive created...");
  }

  // ADDING A CSS CLASS TO A DIRECTIVE'S HOST ELEMENT
  // We can use Host Binding decorator to bind to the host element,
  // more specifically to the class name a css class, in this
  // case the css class named highlighted
  // @HostBinding('className')
  // get cssClasses(){
  //   return "highlighted";
  // }
  // alternative notation:
  // @HostBinding('class.highlighted')
  // get cssClasses(){
  //   return true;
  // }
  // Again the host element is the element to which the directive
  // is being applied.

  // ADDING A CSS STYLE TO A DIRECTIVE'S HOST ELEMENT
  // @HostBinding('style.border')
  // get cssClasses() {
  //   return "1px solid red";
  // }

  // ADDING A CONDITIONAL CLASS TO THE DIRECTIVE'S HOST ELEMENT
  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  // WE CAN WRITE TO AN ATTRIBUTE WITH HOST BINDING
  // In this case the attribute is called disabled
  @HostBinding('attr.disabled')
  get disabled() {
    return "true";
  }
}
