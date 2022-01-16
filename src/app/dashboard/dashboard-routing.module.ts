import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
import { EditTeacherCourseComponent } from '../edit-teacher-course/edit-teacher-course.component';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { EditYearClassComponent } from '../edit-year-class/edit-year-class.component';
import { EditYearCourseComponent } from '../edit-year-course/edit-year-course.component';
import { GCoursesComponent } from '../g-courses/g-courses.component';
import { GStudentsComponent } from '../g-students/g-students.component';
import { GUsersComponent } from '../g-users/g-users.component';
import { GYearClassComponent } from '../g-year-class/g-year-class.component';
import { GYearCourseComponent } from '../g-year-course/g-year-course.component';
import { GYearTeacherComponent } from '../g-year-teacher/g-year-teacher.component';
import { AuthGuard } from '../guards/auth.guard';
import { MyCoursesComponent } from '../my-courses/my-courses.component';
import { PagosApagaComponent } from '../pagos-apaga/pagos-apaga.component';
import { RDashboardComponent } from '../r-dashboard/r-dashboard.component';
import { ReporteDeudasComponent } from '../reporte-deudas/reporte-deudas.component';
import { ReportsComponent } from '../reports/reports.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { StudentComponent } from '../student/student.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { UsersComponent } from '../users/users.component';
import { YearClassComponent } from '../year-class/year-class.component';
import { YearCourseComponent } from '../year-course/year-course.component';
import { MyCoursesFilesComponent } from '../my-courses-files/my-courses-files.component';
import { DashboardComponent } from './dashboard.component';
import { NotasCursoComponent } from '../notas-curso/notas-curso.component';
import { NotasEstudianteComponent } from '../notas-estudiante/notas-estudiante.component';

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
      {
        path: 'edit-year/:cod_materia/:id_anio/:id_frecuencia', component: EditYearCourseComponent
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
        path: 'edit/:id', component: EditTeacherCourseComponent
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
  },
  {
    path: 'perfil', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'my-courses', component: MyCoursesComponent
      },
      {
        path: 'my-courses-files/:cod_materia', component: MyCoursesFilesComponent
      },
      {
        path: 'notas-curso', component: NotasCursoComponent
      },
      {
        path: 'notas-estudiante/:cod_materia', component: NotasEstudianteComponent
      },
      {
        path: 'schedule', component: ScheduleComponent
      },
      {
        path: 'reports', component: ReportsComponent
      }
    ]
  },
  {
    path: 'apafa', component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'pagos', component: PagosApagaComponent
      },
      {
        path: 'reports', component: ReporteDeudasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
