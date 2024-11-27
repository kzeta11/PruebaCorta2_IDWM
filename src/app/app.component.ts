import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RickAndMortyService } from './RickAndMorty/services/rickandmorty.service';
import { Character } from './RickAndMorty/interfaces/character.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule], // Agrega CommonModule aquí
  providers: [RickAndMortyService],
})
export class AppComponent implements OnInit {
  characters: Character[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  async fetchCharacters(): Promise<void> {
    this.isLoading = true;
    try {
      const data = await this.rickAndMortyService.getCharacters(this.currentPage, this.searchQuery);
      this.characters = data.results;
      this.totalPages = data.info.pages;
    } catch (error) {
      console.error('Error al cargar los personajes:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async nextPage(): Promise<void> {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.fetchCharacters();
    }
  }

  async previousPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.fetchCharacters();
    }
  }

  async onSearch(): Promise<void> {
    this.currentPage = 1;
    await this.fetchCharacters();
  }
}
