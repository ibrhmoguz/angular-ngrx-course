import { Course } from './model/course';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CourseActions, CourseActionTypes } from './course.actions';

// tslint:disable-next-line:no-empty-interface
export interface CoursesState extends EntityState<Course> {

}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCourseState: CoursesState = adapter.getInitialState();

export function coursesReducer(state: CoursesState = initialCourseState, action: CourseActions) {
    switch (action.type) {
        case CourseActionTypes.CourseLoaded:
            return adapter.addOne(action.payload.course, state);
        default: {
            return state;
        }
    }
}
