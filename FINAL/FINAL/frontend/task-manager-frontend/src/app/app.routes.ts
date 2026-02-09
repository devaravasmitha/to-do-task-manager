import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];

