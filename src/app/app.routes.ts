import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {path: 'view-tasks', component: ViewTasksComponent}
];

