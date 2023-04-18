import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { City } from '../../interfaces/city.interface';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() openEditModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  citiesList!: City[];

  constructor(private citiesService: CitiesService) {
    this.citiesService.citiesListSubject.subscribe((res) => {
      this.citiesList = [...res];
    });
   }

  ngOnInit(): void {
    this.citiesList = this.citiesService.cities;
  }

  onAddClicked() {
    this.citiesService.editedCity = this.citiesService.emptyCity();
    this.openEditModal.emit();
  }

  onEditClicked(editedCity: City) {
    this.citiesService.editedCity = editedCity;
    this.openEditModal.emit();
  }

}
