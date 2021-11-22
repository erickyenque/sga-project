import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { GCoursesComponent } from '../g-courses/g-courses.component';
import { GUsersComponent } from '../g-users/g-users.component';
import { GYearClassComponent } from '../g-year-class/g-year-class.component';
import { AuthGuard } from '../guards/auth.guard';
import { RDashboardComponent } from '../r-dashboard/r-dashboard.component';
import { UsersComponent } from '../users/users.component';
import { YearClassComponent } from '../year-class/year-class.component';
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
        path: 'edit', component: GCoursesComponent
      }
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
      }
    ], 
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
