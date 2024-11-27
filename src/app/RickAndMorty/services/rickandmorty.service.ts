import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getCharacters(page: number = 1, name: string = ''): Promise<{ results: Character[]; info: { pages: number } }> {
    try {
      const queryParams = new HttpParams()
        .set('page', page)
        .set('name', name)
        .toString();

      const response = await firstValueFrom(
        this.http.get<{ results: Character[]; info: { pages: number } }>(`${this.apiUrl}?${queryParams}`)
      );
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error en getCharacters:', error);
      const e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
