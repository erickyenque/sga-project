import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './template/footer/footer.component';
import { GeneralComponent } from './template/general/general.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { CoursesComponent } from './courses/courses.component';
import { GCoursesComponent } from './g-courses/g-courses.component';
import { UsersComponent } from './users/users.component';
import { GUsersComponent } from './g-users/g-users.component';
import { RDashboardComponent } from './r-dashboard/r-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearClassComponent } from './year-class/year-class.component';
import { GYearClassComponent } from './g-year-class/g-year-class.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    GeneralComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    ErrorComponent,
    CoursesComponent,
    GCoursesComponent,
    UsersComponent,
    GUsersComponent,
    RDashboardComponent,
    YearClassComponent,
    GYearClassComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
