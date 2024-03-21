// task.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from '../interface/task.model'; // Importe a interface Task do arquivo task.model.ts

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient, private router: Router) {}

    createTask(task: Task): Observable<Task> {
        const token = localStorage.getItem('auth_token');
        console.log('Token being sent:', token);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<Task>(`${this.baseUrl}/tasks`, task, { headers }).pipe(
            catchError(error => {
                if (error.status === 401) {
                    localStorage.removeItem('auth_token');
                    this.router.navigate(['/register']);
                }
                throw error;
            })
        );
    }

    getTasksByUser(): Observable<Task[]> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
        return this.http.get<Task[]>(`${this.baseUrl}/tasks/user`, { headers }).pipe(
          catchError(error => {
            if (error.status === 401) {
              localStorage.removeItem('auth_token');
              this.router.navigate(['/register']);
            }
            throw error;
          })
        );
      }
}
