import { Injectable } from '@angular/core';
import { env } from '../env/env.test';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = `${env.baseUrl}/employee`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

  register(data:any) {
    return this.http.post(`${this.baseUrl}/register`, data, {
      responseType: 'text',
    });
  }

  searchById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/search-by-id/${id}`);
  }

  searchByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/search-by-name/${name}`);
  }

  searchByEmail(email: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseUrl}/search-by-email/${email}`
    );
  }

  searchByDepartment(department: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseUrl}/search-by-department/${department}`
    );
  }

  update(employeeData: any) {
    return this.http.put(`${this.baseUrl}/update`, employeeData, {
      responseType: 'text',
    });
  }
}
