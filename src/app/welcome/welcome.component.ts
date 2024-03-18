import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [TaskService]
})
export class WelcomeComponent implements OnInit {
  task = {
    title: '',
    description: '',
    status: 'Pending',
  };
  userName = '';

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  async ngOnInit(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['']);
      return;
    }
    // Use await para esperar pela resolução da promessa
    this.userName = (await this.authService.getUserNameFromToken()) || '';
  }

  onSubmit(form: NgForm): void {
    console.log('Form data:', form.value);
    this.taskService.createTask(this.task).subscribe({
      next: (createdTask) => {
        console.log('Tarefa criada com sucesso:', createdTask);
        form.reset();
        this.task = { title: '', description: '', status: 'Pending' };
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
      },
    });
  }
}
