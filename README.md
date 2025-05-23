# Angular Structural and Attribute Directives: Project Walkthrough
This repository contains a collection of annotated Angular components and directives, built as part of a learning project. While originally designed with pedagogy in mind rather than reusability, this project showcases core Angular concepts such as structural directives, attribute directives, view and content projection, and host element bindings. This README serves as a detailed walkthrough of the concepts, enriched with both abstract explanations and concrete insights into how each concept is implemented in the provided code.

## 📦 Project Overview
This project is centered on the use and customization of Angular directives—both structural and attribute—as well as on how Angular components interact with these directives and each other. It includes:

- A custom structural directive (ngxUnless)
- A custom attribute directive (HighlightedDirective)
- A reusable component (CourseCardComponent) that demonstrates view and content projection
- Unit testing for one of the custom directives

Each major concept is explained below.

### 📌 Structural Directives in Angular
#### Conceptually:
Structural directives in Angular are responsible for modifying the structure of the DOM. They add or remove elements based on a condition. The most common examples are *ngIf and *ngFor. These directives use Angular’s built-in TemplateRef and ViewContainerRef classes to control DOM rendering.

#### In this project:
A custom structural directive, ngxUnless, is implemented to demonstrate how such a directive works behind the scenes. Instead of showing content when a condition is true (like *ngIf), ngxUnless shows content when the condition is false. The directive checks the input boolean and uses ViewContainerRef to either instantiate (createEmbeddedView) or remove (clear) the content referenced by TemplateRef.

### 🛠 Implementing a Custom Structural Directive: ngxUnless
#### Conceptually:
Creating a custom structural directive allows developers to extend Angular’s template syntax with their own logic. This involves listening for a condition and either inserting or removing a block of HTML at runtime.

#### In this project:
The NgxUnlessDirective demonstrates how to invert the behavior of *ngIf. The directive maintains a visible flag to avoid unnecessary DOM manipulation. If the input condition is false, the template is rendered. If the condition becomes true, the view is cleared. The directive is declared using @Directive({ selector: '[ngxUnless]' }) and accepts an input using the setter pattern on @Input().

### 🎨 Attribute Directives: Customizing Element Appearance and Behavior
#### Conceptually:
Attribute directives change the appearance or behavior of an element, component, or another directive. Unlike structural directives, they don’t modify the layout of the DOM but interact with an existing element by manipulating its styles, classes, or attributes.

#### In this project:
The HighlightedDirective is an attribute directive used to conditionally apply CSS classes and styles to its host element. It uses @HostBinding to dynamically set CSS classes, styles, and attributes on the element it is attached to. It also uses @HostListener to react to user events like mouse hover.

### 🎯 Host Element Bindings with @HostBinding and @HostListener
#### Conceptually:
@HostBinding and @HostListener are decorators that allow a directive to interact with its host element.
@HostBinding binds a directive’s property to an attribute, class, or style of the host element.
@HostListener listens to events on the host element and triggers methods within the directive.

#### In this project:

@HostBinding('class.highlighted') isHighlighted conditionally adds the .highlighted class.
@HostBinding('style.backgroundColor') backgroundColor applies a style.
@HostBinding('attr.disabled') isDisabled demonstrates attribute binding.
Mouse events like mouseenter and mouseleave are handled with @HostListener, toggling highlight state.
An @Output() toggleHighlight emitter is also included to demonstrate event communication from the directive to the parent component.

### 🧩 Using ViewChild to Access Directive Instances in Components
#### Conceptually:
@ViewChild allows a component to directly reference a directive or child component instance declared in its template. This is useful when you need programmatic access to methods or properties on the directive/component.

#### In this project:
An instance of HighlightedDirective is accessed inside the test host component using @ViewChild(HighlightedDirective), allowing the test to manually invoke directive methods or check properties like isHighlighted. This is especially relevant in testing scenarios or advanced dynamic behaviors.

### 🧪 Testing an Attribute Directive
#### Conceptually:
Testing directives ensures that they behave correctly in response to changes in input properties or user interactions. Unit tests for directives often check:

If styles or classes are applied/removed correctly
If output events are emitted as expected

#### In this project:
The HighlightedDirective is tested using a HostComponent that embeds the directive. Tests verify:
- Class application via isHighlighted
- DOM interactions triggered by mouseenter and mouseleave
- Emission of the toggleHighlight event

This shows how even a directive not directly linked to a component can be unit tested through integration in a test host component.

### 📦 Component Design and Content Projection
#### Conceptually:
Components encapsulate logic, template, and styling in Angular. Content projection (ng-content) allows you to pass dynamic content into a component’s template from its parent. Combined with decorators like @ContentChild or @ContentChildren, this allows components to inspect or interact with their projected content.

#### In this project:
The CourseCardComponent receives Course data via @Input() and emits user interactions via @Output(). It uses @ContentChildren to access instances of the CourseImageComponent projected into it. This is useful for flexible component APIs, where the child can inspect or even manipulate projected DOM or component instances.

The component also demonstrates dynamic class and style binding through methods like cardClasses() and cardStyles()—returning CSS class names or inline styles based on course metadata.

### 🎨 Styling Techniques: Conditional Classes and Styles
#### Conceptually:
Angular lets developers dynamically bind CSS classes and styles directly in the template or within the directive using @HostBinding. This allows for responsive, data-driven styling.

#### In this project:
Classes are added conditionally (.highlighted, .beginner) depending on inputs or directive state.
Background styles are dynamically generated from course data (e.g., image URLs).
This is demonstrated both at the directive level (HighlightedDirective) and the component level (CourseCardComponent).

## 📚 Summary
This project provides a solid introduction to key Angular directive concepts through concise, annotated examples. It emphasizes how Angular lets you manipulate DOM structure, enhance UI behavior, and compose flexible, interactive components. While the code may not reflect reusable production standards, it offers an excellent learning foundation, especially for understanding the underlying mechanisms of Angular’s directive and component system.

# Diagrams

### High Level Architecture Diagram 

```plaintext
AppComponent
   |
   ├── CourseCardComponent (uses: ng-content, @Input/@Output)
   │      |
   │      ├── <ng-content> ←───── Projected: CourseImageComponent
   │
   ├── [ngxUnless] Structural Directive
   │      └── Controls template rendering via TemplateRef and ViewContainerRef
   │
   └── [HighlightedDirective] Attribute Directive
          ├── Applies style/class
          └── Emits highlight toggle event
```

### Structural Directive Flow

```plaintext
[Template]
   *ngxUnless="false" ──────┐
                            ▼
       ViewContainerRef.createEmbeddedView()
                |
         [Template Content Rendered]

If condition is true:
    ViewContainerRef.clear()
       └─> DOM element removed
```

### Attribute Directive Binding and Interaction

```plaintext
HTML Element <div appHighlighted>
       |
       ├── @HostBinding('class.highlighted') → Conditional class binding
       ├── @HostBinding('style.backgroundColor') → Style binding
       ├── @HostListener('mouseenter') → Triggers highlight logic
       └── @Output() toggleHighlight → Event emitter to parent component
```

### Testing Diagram for Directive

```plaintext
TestHostComponent
    |
    └── Template using <div appHighlighted> 
            |
            ├── ViewChild(HighlightedDirective)
            └── TestBed.get(Directive)TestHostComponent
```
