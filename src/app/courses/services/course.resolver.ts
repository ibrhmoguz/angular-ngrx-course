import { selectCourseById } from './../course.selectors';



import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { CourseRequested } from '../course.actions';



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService: CoursesService,
        private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        const courseId = route.params['id'];

        return this.store.pipe(
            select(selectCourseById(courseId)),
            tap(course => {
                console.log(course);
                if (course === undefined) {
                    this.store.dispatch(new CourseRequested({ courseId }));
                }
            }),
            filter(course => !!course),
            first()
        );
    }

}

