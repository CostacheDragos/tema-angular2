import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { City } from '../interfaces/city.interface';
import citiesData from './cities.json';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private edited: City = this.emptyCity();
  editedCitySubject = new Subject<City>();

  private citiesList: City[] = citiesData;
  citiesListSubject = new Subject<City[]>();

  constructor() { }

  get editedCity(): City {
    return this.edited;
  }
  set editedCity(newEdited: City) {
    this.edited = newEdited;
    this.editedCitySubject.next(newEdited);
  }

  get cities(): City[] {
    return this.citiesList;
  }
  set cities(newCities: any) {
    this.citiesList = newCities;
    this.citiesListSubject.next(newCities);
  }

  addNewCity(newCity: City) {
    this.citiesList.push(newCity);
    this.citiesListSubject.next(this.citiesList);
  }

  updateOrCreate(city: City) {
    const existingCity = this.citiesList.find((currentCity) => currentCity.id === city.id);
    if(existingCity !== undefined) {
      existingCity.name = city.name;
      existingCity.country = city.country;
      existingCity.population = city.population;
      return;
    }

    this.addNewCity(city);
  }

  emptyCity(): City {
    return {
      id: uuidv4(),
      name: '',
      country: '',
      population: 0,
    };
  }
}
