import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBase } from '../core/interfaces/base';
import { IRecipe } from '../core/interfaces/recipe';

export interface CreateRecipeDto { 
  title: string,
  timeToCook: string,
  ingredients: string,
  howToCook: string,
  imageUrl: string,
  // creator: string
}



@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) {}

    getRecipe$(): Observable<IRecipe[]>{
      return this.httpClient.get<IRecipe[]>(environment.apiUrl)
    }

    createRecipe$(recipeData: CreateRecipeDto): Observable<IRecipe> {
      console.log(recipeData);
      return this.httpClient.post<IRecipe>(`${environment.apiUrl}/recipe/create-recipe`, recipeData, { withCredentials: true })
    }
}
