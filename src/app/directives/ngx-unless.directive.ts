import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})

export class NgxUnlessDirective {

  // we create a flag to indicate if the template is or not
  // visible. by default, it is not visible
  visible = false;

  // templateRef allows us to instantiate the template in this class
  // the viewContainer is a built in service that allows us to instantiate
  // the template

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input()
  // we receive the condition
  set ngxUnless(condition:boolean){
    // 
    if (!condition && !this.visible) {
      // this will instantiate the template - show it
      this.viewContainer.createEmbeddedView(this.templateRef);
      // we set the visible flag to true because the template
      // is now visible
      this.visible = true;
    }
    else if (condition && this.visible) {
      // this will remove the template
      this.viewContainer.clear();
      this.visible = false;
    }
  }
}
