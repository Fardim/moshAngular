import { MockBackend } from '@angular/http/testing';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostService } from './services/post.service';
import { GithubFollowersService } from './services/github-followers.service';
import { CoursesService } from './courses.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';


import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { SummaryPipe } from './summary.pipe.';
import { FavoriteComponent } from './favorite/favorite.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PanelComponent } from './panel/panel.component';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponent } from './posts/posts.component';
import { AppErrorHandler } from './common/app-error-handler';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    InputFormatDirective,
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    PostsComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    GithubFollowersComponent,
    NotFoundComponent,

    LoginComponent,
    SignupComponent,
    AdminComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component : HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
      { path: 'followers/:id/:username', component : GithubProfileComponent },
      { path: 'followers', component : GithubFollowersComponent },
      { path: 'profile/:username', component : GithubProfileComponent },
      { path: 'posts', component : PostsComponent },
      { path: '**', component : NotFoundComponent },
    ])
  ],
  providers: [
    CoursesService,
    PostService,
    GithubFollowersService,
    OrderService,
    AuthService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    // For creating a mock back-end. You don't need these in a real app. 
    fakeBackendProvider,
    MockBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
