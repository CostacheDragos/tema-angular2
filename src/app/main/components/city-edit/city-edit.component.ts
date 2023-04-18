import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { CustomValidators } from '../../helpers/custom-validators';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  cityEditForm!: FormGroup;

  constructor(private citiesService: CitiesService) { 
    citiesService.editedCitySubject.subscribe(() => {
      this.initializeForm();
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.cityEditForm = new FormGroup({
      name: new FormControl(this.citiesService.editedCity.name, [Validators.required]),
      country: new FormControl(this.citiesService.editedCity.country, [Validators.required]),
      population: new FormControl(this.citiesService.editedCity.population, [Validators.required, CustomValidators.populationValidator]),
    });
  }

  onOk(): void {
    // Update the values of the edited city in the service
    this.citiesService.editedCity.name = this.cityEditForm.value.name;
    this.citiesService.editedCity.country = this.cityEditForm.value.country;
    this.citiesService.editedCity.population = this.cityEditForm.value.population;

    // Check if the ID of the city that is being edited already exists in the
    // cities collection, if yes update it, if not add it
    this.citiesService.updateOrCreate(this.citiesService.editedCity);

    // Close the modal
    this.closeModal.emit(true);
  }

  onCancel(): void {
    this.closeModal.emit(true);
  }



  get name(): FormControl {
    return this.cityEditForm.get('name') as FormControl;
  }
  get country(): FormControl {
    return this.cityEditForm.get('country') as FormControl;
  }
  get population(): FormControl {
    return this.cityEditForm.get('population') as FormControl;
  }
}
