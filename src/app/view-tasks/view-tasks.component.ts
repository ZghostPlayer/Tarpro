import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.model';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [TaskService]
})
export class ViewTasksComponent {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService, 
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
      return;
    }
    this.fetchUserTasks();
  }

  fetchUserTasks(): void {
    this.taskService.getTasksByUser().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Erro ao buscar tarefas do usuário:', error);
      },
    });
  }
}
