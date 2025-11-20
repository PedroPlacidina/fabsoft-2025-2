import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../model/pet';

@Injectable({ providedIn: 'root' })
export class PetService {
  apiUrl = 'http://localhost:8080/api/v1/pets';
  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<Pet[]>(this.apiUrl); }
  save(pet: Pet) {
    if(pet.id) return this.http.put(`${this.apiUrl}/${pet.id}`, pet);
    return this.http.post(this.apiUrl, pet);
  }
  delete(id: number) { return this.http.delete(`${this.apiUrl}/${id}`); }
}