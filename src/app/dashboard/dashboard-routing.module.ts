import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { EditYearClassComponent } from '../edit-year-class/edit-year-class.component';
import { GCoursesComponent } from '../g-courses/g-courses.component';
import { GStudentsComponent } from '../g-students/g-students.component';
import { GUsersComponent } from '../g-users/g-users.component';
import { GYearClassComponent } from '../g-year-class/g-year-class.component';
import { GYearCourseComponent } from '../g-year-course/g-year-course.component';
import { GYearTeacherComponent } from '../g-year-teacher/g-year-teacher.component';
import { AuthGuard } from '../guards/auth.guard';
import { RDashboardComponent } from '../r-dashboard/r-dashboard.component';
import { StudentComponent } from '../student/student.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { UsersComponent } from '../users/users.component';
import { YearClassComponent } from '../year-class/year-class.component';
import { YearCourseComponent } from '../year-course/year-course.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard', component: RDashboardComponent
      },
      {
        path: '', component: RDashboardComponent
      }
    ]
  },
  {
    path: 'courses', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add', component: CoursesComponent
      },
      {
        path: 'management', component: GCoursesComponent
      },
      {
        path: 'edit/:codigo', component: EditCoursesComponent
      },
      {
        path: 'add-year', component: YearCourseComponent
      },
      {
        path: 'management-year', component: GYearCourseComponent
      },
    ],
  },
  {
    path: 'users', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add', component: UsersComponent
      },
      {
        path: 'management', component: GUsersComponent
      },
      {
        path: 'edit/:id', component: EditUsersComponent
      }
    ],
  },
  {
    path: 'teachers', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add', component: TeacherComponent
      },
      {
        path: 'management', component: GYearTeacherComponent
      },
      {
        path: 'edit/:id', component: EditUsersComponent
      }
    ],
  },
  {
    path: 'students', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add', component: StudentComponent
      },
      {
        path: 'management', component: GStudentsComponent
      },
      {
        path: 'edit/:id', component: EditStudentsComponent
      }
    ]
  },
  {
    path: 'years', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add', component: YearClassComponent
      },
      {
        path: 'management', component: GYearClassComponent
      },
      {
        path: 'edit/:id', component: EditYearClassComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
