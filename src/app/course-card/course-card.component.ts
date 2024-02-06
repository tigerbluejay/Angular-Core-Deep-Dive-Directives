import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output, QueryList, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {COURSES} from '../../db-data';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    // here we pass the specific stylesheets
    styleUrls: ['./course-card.component.css'],
    // here we add the default view encapsulation mechanism
    encapsulation: ViewEncapsulation.Emulated
    // we could have chosen:
    // ViewEncapsulation.None - That will use plain CSS
    // without the Angular host and ngdeep and so on don't work
    // ViewEncapsulation.Native - Do not use, it has been deprecated
    // ViewEncapsulation.ShadowDom - To be applied in the future.
    // Uses browser provided functionality instead of host, ngdeep and 
    // so on
})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseSelected')
    courseEmitter = new EventEmitter<Course>();

    @ContentChildren(CourseImageComponent, {read: ElementRef})
    images: QueryList<ElementRef>;

    constructor() {

    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

    ngOnInit() {

    }

    isImageVisible() {
        return this.course && this.course.iconUrl;
    }

    onCourseViewed() {

        this.courseEmitter.emit(this.course);

    }

    cardClasses() {
        if (this.course.category == 'BEGINNER') {
            return 'beginner';
        }
    }

    cardStyles() {
        return {
            'background-image': 'url(' + this.course.iconUrl + ')'

        };
    }



}
