import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CourseRequested, CourseActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from "./course.actions";
import { mergeMap, map, withLatestFrom, filter } from "rxjs/operators";
import { CoursesService } from "./services/courses.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectAllCoursesLoaded } from "./course.selectors";

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.courseService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({ course }))
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
        withLatestFrom(this.store.pipe(select(selectAllCoursesLoaded))),
        filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
        mergeMap(() => this.courseService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses }))
    );

    constructor(private actions$: Actions,
        private courseService: CoursesService,
        private store: Store<AppState>) {

    }
}
