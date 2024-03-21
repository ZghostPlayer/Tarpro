import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [TaskService, CategoryService]
})
export class WelcomeComponent implements OnInit {
  task: {
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    categoryId: number;
  } = {
    title: '',
    description: '',
    status: 'Pending',
    categoryId: 0, 
  };
  category = {
    name: '',
    description: '',
  };
  categories: any[] = [];
  userName = '';

  constructor(
    private taskService: TaskService, 
    private authService: AuthService, 
    private router: Router,
    private categoryService: CategoryService
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
    this.userName = (await this.authService.getUserNameFromToken()) || '';
    this.fetchCategories();
  }

  onViewTasks(): void {
    this.router.navigate(['/view-tasks']);
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
      },
    });
  }

  onSubmit(form: NgForm): void {
    console.log('Form data:', form.value);
    this.taskService.createTask(this.task).subscribe({
      next: (createdTask) => {
        console.log('Tarefa criada com sucesso:', createdTask);
        form.reset();
        this.task = { title: '', description: '', status: 'Pending', categoryId: 0 };
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
      },
    });
  }

  onCreateCategory(): void {
    this.categoryService.createCategory(this.category).subscribe({
      next: (createdCategory) => {
        console.log('Categoria criada com sucesso:', createdCategory);
        this.category = { name: '', description: '' };
        this.fetchCategories(); // Atualize a lista de categorias após criar uma nova
      },
      error: (error) => {
        console.error('Erro ao criar categoria:', error);
      },
    });
  }
}
