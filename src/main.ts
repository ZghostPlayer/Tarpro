import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { ViewTasksComponent } from './app/view-tasks/view-tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {path: 'view-tasks', component: ViewTasksComponent}
  // outras rotas...
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Habilita o uso de fetch para o HttpClient
    provideRouter(routes) // para rotas
  ]
}).catch(err => console.error(err));
