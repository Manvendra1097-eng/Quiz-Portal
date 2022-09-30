import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizQuestionsComponent } from './pages/admin/add-quiz-questions/add-quiz-questions.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizQuestionComponent } from './pages/admin/update-quiz-question/update-quiz-question.component';
import { UpdateQuizzComponent } from './pages/admin/update-quizz/update-quizz.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InstructionsComponent } from './pages/normal/instructions/instructions.component';
import { LoadQuizzesComponent } from './pages/normal/load-quizzes/load-quizzes.component';
import { NormalDashboardComponent } from './pages/normal/normal-dashboard/normal-dashboard.component';
import { NormalWelcomeComponent } from './pages/normal/normal-welcome/normal-welcome.component';
import { StartComponent } from './pages/normal/start/start.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'w',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'category',
        component: ViewCategoryComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizz',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quizz',
        component: AddQuizzesComponent,
      },
      {
        path: 'quizz/:id',
        component: UpdateQuizzComponent,
      },

      {
        path: 'questions/:id/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-questions/:id',
        component: AddQuizQuestionsComponent,
      },
      {
        path: 'update-questions/:id',
        component: UpdateQuizQuestionComponent,
      },
    ],
  },
  {
    path: 'user',
    component: NormalDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: 'w',
        component: NormalWelcomeComponent,
      },
      {
        path: ':catId',
        component: LoadQuizzesComponent,
      },
      {
        path: 'instructions/:quizId',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:quizId',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
