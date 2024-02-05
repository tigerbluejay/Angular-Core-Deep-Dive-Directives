import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    courses = COURSES;

    // this is a way for this model to access
    // the highlighted directive programmatically
    // which we use in the ngAfterViewInit hook
    // @ViewChild(HighlightedDirective)
    // highlighted: HighlightedDirective;
    
    // alternatively:
    // if we have multiple custom attribute directives
    // we can query them separately like this:
    @ViewChild(CourseCardComponent, {read: HighlightedDirective})
    highlighted: HighlightedDirective;


    @ViewChildren(CourseCardComponent, {read: ElementRef})
    cards : QueryList<ElementRef>;

    onToggle(isHighlighted:boolean){
      console.log(isHighlighted);
    }

    constructor() {

    }

    ngAfterViewInit() {
        console.log(this.highlighted);
    }

    onCourseSelected(course:Course) {

    }

}
