import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: false,
  exportAs: 'hl'
})
export class HighlightedDirective {

  // this input is for the example where we define an input
  // in the course-card element for the directive. The input
  // belongs to the directive so it is defined here.
  // here default value false is being overriden by the the
  // true boolean in the directive at the host element
  @Input('highlighted')
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

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

  // now we can tie our directive to events
  // for example, the element that has the highlighted directive
  // could trigger an even on mouseover and on mouseleave
  // to do so we define @HostListener
  // @HostListener('mouseover')
  // mouseOver() {
  //   this.isHighlighted = true;
  // }
  // @HostListener('mouseleave')
  // mouseLeave() {
  //   this.isHighlighted = false;
  // }

  // we can pass arguments that we want to inject into
  // our event handler. $event contains the native event
  // @HostListener('mouseover', ['$event'])
  // mouseOver($event) {
  //   console.log($event);
  //   this.isHighlighted = true;
  // }
  // @HostListener('mouseleave')
  // mouseLeave() {
  //   this.isHighlighted = false;
  // }

  // besides using the attribute directive to respond to events on
  // the host element, we can also use the directive to emit custom events
  // 1st - We create the toggleHighlight event and define it as Ouput
  // 2nd - We emit an event on mouseover and on mouseleave and we also
  // emit as parameter the value of the highlight flag
  // 3rd - Add a new event listener and an event handler on the component
  // 4th - We implement the onToggle event handler at the application component
  // class level (on the model)
  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }
  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // Directive Export As Functionality
  // The directive works by modifying properties in the host element
  // like the cssClass, directives also detect events in the host element  
  // But there are situations where we would like to access the directive
  // directly either at the level of the template, or at the level of the
  // application component, in order to interact with the directive programmatically
  // for example access a method defined in the directive.
  // Let's imagine the directive provides a method called toggle
  // which changes the value of isHighlighted and emits an event

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }

}
