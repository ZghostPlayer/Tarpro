import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Category {
    name: string;
    description?: string;
}

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient, private router: Router) {}

    createCategory(category: Category): Observable<Category> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<Category>(`${this.baseUrl}/categories`, category, { headers }).pipe(
            catchError(error => {
                if (error.status === 401) {
                    localStorage.removeItem('auth_token');
                    this.router.navigate(['/register']);
                }
                throw error;
            })
        );
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/categories`).pipe(
            catchError(error => {
                console.error('Erro ao buscar categorias:', error);
                throw error;
            })
        );
    }
}